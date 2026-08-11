// Converts the flat form-state shape used by ResumeForm into the shape
// expected by the backend Resume model / AI endpoints.
export const formatResumeData = (data) => {
  const formattedEducation = (data.education || []).map((edu) => ({
    degree: edu.course,
    institution: edu.collegeName,
    years: `${edu.startYear || ''}-${edu.endYear || ''}`.trim().replace(/^-|-$/g, ''),
    score: edu.score,
    description: edu.description,
  }));

  const formattedExperience = (data.experience || []).map((exp) => ({
    title: exp.role,
    company: exp.companyName,
    years: `${exp.startDate || ''}-${exp.endDate || ''}`.trim().replace(/^-|-$/g, ''),
    description: exp.description,
  }));

  const formattedCertificates = (data.certificates || []).map((cert) => ({
    name: cert.name,
    issuingOrganization: cert.issuingOrganization,
    date: cert.date,
  }));

  const parsedSkills = data.skills
    ? data.skills.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
    : [];

  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    title: data.title,
    summary: data.summary,
    education: formattedEducation,
    experience: formattedExperience,
    certificates: formattedCertificates,
    skills: parsedSkills,
  };
};
