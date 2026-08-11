const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed with status ${res.status}`);
  }
  return res.json();
};

// field: 'summary' | 'experience' | 'education'
// context: whatever text the user has already typed, used as raw material for the AI
export async function generateContent(field, context) {
  const res = await fetch(`${API_URL}/api/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field, context }),
  });
  return handleResponse(res); // { text }
}

// resumeData: output of formatResumeData(formData)
// jobDescription: optional string to check keyword match against
export async function reviewResume(resumeData, jobDescription) {
  const res = await fetch(`${API_URL}/api/ai/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeData, jobDescription }),
  });
  return handleResponse(res); // { score, strengths, improvements, missingKeywords }
}

// messages: [{ role: 'user' | 'assistant', content: string }]
// currentFormData: the raw formData state, so the assistant has context
export async function chatWithAssistant(messages, currentFormData) {
  const res = await fetch(`${API_URL}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, currentFormData }),
  });
  return handleResponse(res); // { reply, fields }
}
