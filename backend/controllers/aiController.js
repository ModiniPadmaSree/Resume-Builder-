const ai = require('../utils/geminiClient');
const MODEL = 'gemini-3.5-flash'; 
// @desc    Generate resume content (summary / experience bullets / education blurb)
// @route   POST /api/ai/generate
// @access  Public
// @body    { field: 'summary' | 'experience' | 'education', context: string }
exports.generateContent = async (req, res) => {
  try {
    const { field, context } = req.body;

    if (!field || !context || !context.trim()) {
      return res.status(400).json({ message: 'field and context are required' });
    }

    const prompts = {
      summary: `Write a concise, professional 2-3 sentence resume summary for a candidate with this background:\n${context}\n\nRules: no first-person pronouns, no generic filler, focus on concrete strengths and career direction. Return ONLY the summary text, nothing else.`,
      experience: `Rewrite the following work experience into 3-5 punchy, achievement-focused resume bullet points. Each bullet should start with a strong action verb and quantify impact where it's plausible to do so:\n${context}\n\nReturn ONLY the bullet points, one per line, each starting with "- ". No preamble or closing remarks.`,
      education: `Write a short 1-2 sentence description highlighting relevant coursework, honors, or achievements for this education entry:\n${context}\n\nReturn ONLY the description text, nothing else.`,
    };

    const prompt = prompts[field];
    if (!prompt) {
      return res.status(400).json({ message: `Unsupported field: ${field}` });
    }

    const response = await ai.models.generateContent({
  model: MODEL,
  contents: prompt,
});
res.status(200).json({ text: response.text.trim() });
 } catch (error) {
    console.error('AI generateContent error:', error);
    res.status(500).json({ message: 'AI generation failed', error: error.message });
  }
};

// @desc    Review a full resume and return a score + feedback
// @route   POST /api/ai/review
// @access  Public
// @body    { resumeData: object, jobDescription?: string }
exports.reviewResume = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData) {
      return res.status(400).json({ message: 'resumeData is required' });
    }

    const jdBlock = jobDescription && jobDescription.trim()
      ? `\n\nAlso compare the resume against this target job description and call out keyword gaps:\n${jobDescription}`
      : '';

    const prompt = `You are an expert resume reviewer and ATS specialist. Review this resume data (JSON) and reply with ONLY a JSON object (no markdown fences, no preamble, no trailing text) matching exactly this shape:
{
  "score": <integer 0-100>,
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "missingKeywords": ["...", "..."]
}

"missingKeywords" should be an empty array if no job description was provided.

Resume data:
${JSON.stringify(resumeData, null, 2)}${jdBlock}`;

    const response = await ai.models.generateContent({
  model: MODEL,
  contents: prompt,
});
const raw = response.text.trim();
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch (parseErr) {
      console.error('Failed to parse AI review JSON. Raw response:', raw);
      return res.status(502).json({ message: 'AI returned an unexpected format. Please try again.' });
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error('AI reviewResume error:', error);
    res.status(500).json({ message: 'AI review failed', error: error.message });
  }
};

// @desc    Conversational assistant that helps fill out the resume
// @route   POST /api/ai/chat
// @access  Public
// @body    { messages: [{role, content}], currentFormData: object }
exports.chat = async (req, res) => {
  try {
    const { messages, currentFormData } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'messages array is required' });
    }

    const systemPrompt = `You are a friendly resume-building assistant embedded in a resume builder app. Help the user fill out their resume by asking short, focused questions one at a time about their background (target role, summary, skills, education, experience, certificates).

Keep replies conversational and brief (2-4 sentences max).

Whenever you have enough information to fill in or update simple top-level resume fields, include a JSON block at the very end of your reply, wrapped exactly like this:
<<<FIELDS>>>
{"summary": "...", "skills": "JavaScript, React"}
<<<END>>>

Only include fields you're confident about. Omit the JSON block entirely if there's nothing to update yet. Valid keys: name, email, phone, title, summary, skills (a single comma-separated string). Do NOT attempt to update education/experience/certificates this way — those are lists, so just tell the user to add them via the form and offer to help write the description once they do.

Current form data so far:
${JSON.stringify(currentFormData || {}, null, 2)}`;

    const response = await ai.models.generateContent({
  model: MODEL,
  contents: messages.map(({ role, content }) => ({
    role: role === 'assistant' ? 'model' : 'user',
    parts: [{ text: content }],
  })),
  config: { systemInstruction: systemPrompt },
});
const raw = response.text.trim();
    let reply = raw;
    let fields = null;

    const match = raw.match(/<<<FIELDS>>>([\s\S]*?)<<<END>>>/);
    if (match) {
      reply = raw.replace(match[0], '').trim();
      try {
        fields = JSON.parse(match[1].trim());
      } catch (e) {
        console.warn('Could not parse FIELDS block from AI chat reply:', match[1]);
      }
    }

    res.status(200).json({ reply, fields });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ message: 'AI chat failed', error: error.message });
  }
};
