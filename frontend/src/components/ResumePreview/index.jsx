import React, { forwardRef } from 'react';
import styles from './ResumePreview.module.css';
const renderBulletPoints = (text) => {
  if (!text?.trim()) return null;

  const lines = text
    .split(/\n|•/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*]\s*/, ''));

  return (
    <ul className={styles.bulletList}>
      {lines.map((line, index) => (
        <li key={index}>
          {line}
        </li>
      ))}
    </ul>
  );
};

const ResumePreview = forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} className={styles.preview}>

      {/* ================= HEADER ================= */}

      <header className={styles.header}>
        <h1 className={styles.name}>
          {formData.name || 'Your Name'}
        </h1>

  <div className={styles.contact}>

  {formData.phone && (
    <span>{formData.phone}</span>
  )}

  {formData.phone && formData.email && (
    <span className={styles.separator}>|</span>
  )}

  {formData.email && (
    <span>{formData.email}</span>
  )}

  {formData.links?.map((link, index) => {
    if (!link.name?.trim() || !link.url?.trim()) {
      return null;
    }

    const url = link.url.startsWith('http')
      ? link.url
      : `https://${link.url}`;

    return (
      <React.Fragment key={index}>
        <span className={styles.separator}>|</span>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          {link.name}
        </a>
      </React.Fragment>
    );
  })}

</div>
      </header>


      {/* ================= SUMMARY ================= */}

      {formData.summary?.trim() && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary</h2>

          <p className={styles.bodyText}>
            {formData.summary}
          </p>
        </section>
      )}


      {/* ================= EDUCATION ================= */}

      {formData.education?.some(
        (edu) =>
          edu.course ||
          edu.collegeName ||
          edu.startYear ||
          edu.endYear ||
          edu.score ||
          edu.description
      ) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>

          {formData.education.map((edu, index) => {
            const dates = [edu.startYear, edu.endYear]
              .filter(Boolean)
              .join(' – ');

            return (
              <div className={styles.entry} key={index}>

                {/* College left — dates right */}
                {(edu.collegeName || dates) && (
                  <div className={styles.row}>
                    <div className={styles.left}>
                      {edu.collegeName && (
                        <div className={styles.institution}>
                          {edu.collegeName}
                        </div>
                      )}
                    </div>

                    <div className={styles.right}>
                      {dates && (
                        <span className={styles.date}>
                          {dates}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Degree left — score right */}
                {(edu.course || edu.score) && (
                  <div className={styles.row}>
                    <div className={styles.left}>
                      {edu.course && (
                        <div className={styles.entryTitle}>
                          {edu.course}
                        </div>
                      )}
                    </div>

                    <div className={styles.right}>
                      {edu.score && (
                        <span className={styles.score}>
                          {edu.score}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                {edu.description?.trim() && (
                  <p className={styles.description}>
                    {edu.description}
                  </p>
                )}

              </div>
            );
          })}
        </section>
      )}


      {/* ================= EXPERIENCE ================= */}

      {formData.experience?.some(
        (exp) =>
          exp.companyName ||
          exp.role ||
          exp.startDate ||
          exp.endDate ||
          exp.description
      ) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>

          {formData.experience.map((exp, index) => {
            const dates = [exp.startDate, exp.endDate]
              .filter(Boolean)
              .join(' – ');

            return (
              <div className={styles.entry} key={index}>

                {/* Company left — dates right */}
                {(exp.companyName || dates) && (
                  <div className={styles.row}>
                    <div className={styles.left}>
                      {exp.companyName && (
                        <div className={styles.institution}>
                          {exp.companyName}
                        </div>
                      )}
                    </div>

                    <div className={styles.right}>
                      {dates && (
                        <span className={styles.date}>
                          {dates}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Role */}
                {exp.role && (
                  <div className={styles.entryTitle}>
                    {exp.role}
                  </div>
                )}

                {/* Description */}
              {exp.description?.trim() && (
  renderBulletPoints(exp.description)
)}

              </div>
            );
          })}
        </section>
      )}
 {/* ================= PROJECTS ================= */}

{formData.projects?.some(
  (project) =>
    project.name ||
    project.technologies ||
    project.link ||
    project.description
) && (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>
      Projects
    </h2>

    {formData.projects.map((project, index) => (
      <div
        className={styles.entry}
        key={index}
      >

        {/* Project name + technologies */}
        <div className={styles.row}>
          <div className={styles.left}>
            {project.name && (
              <div className={styles.institution}>
                {project.link?.trim() ? (
                  <a
                    href={
                      project.link.startsWith('http://') ||
                      project.link.startsWith('https://')
                        ? project.link
                        : `https://${project.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </div>
            )}
          </div>

          <div className={styles.right}>
            {project.technologies && (
              <span className={styles.organization}>
                {project.technologies}
              </span>
            )}
          </div>
        </div>

        {/* Project description */}
        {project.description?.trim() && (
          renderBulletPoints(project.description)
        )}

      </div>
    ))}
  </section>
)}


      {/* ================= CERTIFICATES ================= */}

      {formData.certificates?.some(
        (cert) =>
          cert.name ||
          cert.issuingOrganization ||
          cert.date
      ) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Certificates</h2>

          {formData.certificates.map((cert, index) => (
            <div className={styles.entry} key={index}>

              {/* Certificate left — organization right */}
              <div className={styles.row}>
                <div className={styles.left}>
                  {cert.name && (
                    <div className={styles.entryTitle}>
                      {cert.name}
                    </div>
                  )}
                </div>

                <div className={styles.right}>
                  {cert.issuingOrganization && (
                    <span className={styles.organization}>
                      {cert.issuingOrganization}
                    </span>
                  )}
                </div>
              </div>

              {/* Certificate date */}
              {cert.date && (
                <div className={styles.certificateDate}>
                  {cert.date}
                </div>
              )}

            </div>
          ))}
        </section>
      )}


      {/* ================= SKILLS ================= */}

      {formData.skills?.trim() && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>

          <div className={styles.skills}>
            {formData.skills
              .split(',')
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className={styles.skillSeparator}>
                      •
                    </span>
                  )}

                  <span className={styles.skill}>
                    {skill}
                  </span>
                </React.Fragment>
              ))}
          </div>
        </section>
      )}

    </div>
  );
});

export default ResumePreview;