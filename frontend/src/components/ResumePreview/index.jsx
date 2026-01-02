import React from 'react';
import styles from './ResumePreview.module.css';

const ResumePreview = ({ formData }) => {
  return (
    <div className={styles.preview}>
      {/* Name and Contact Info */}
      <h1 className={styles.name}>{formData.name || 'Your Name'}</h1>
      <p className={styles.contact}>
        {formData.email || 'you@example.com'} | {formData.phone || '+91-0000000000'}
        {formData.title && ` | ${formData.title}`}
      </p>

      {/* Summary Section */}
      {formData.summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary</h2>
          <p>{formData.summary}</p>
        </section>
      )}

      {/* Education Section - iterates over the array */}
      {formData.education && formData.education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className={styles.entry}>
              <h3 className={styles.entryTitle}>{edu.course || 'Course/Degree'}</h3>
              <p className={styles.entrySubtitle}>
                {edu.collegeName || 'Institution'} | {edu.startYear} - {edu.endYear}
                {edu.score && ` | Score: ${edu.score}`} {/* Display score if available */}
              </p>
              {edu.description && <p className={styles.entryDescription}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experience Section - iterates over the array */}
      {formData.experience && formData.experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className={styles.entry}>
              <h3 className={styles.entryTitle}>{exp.role || 'Job Title'}</h3>
              <p className={styles.entrySubtitle}>
                {exp.companyName || 'Company Name'} | {exp.startDate} - {exp.endDate}
              </p>
              {exp.description && <p className={styles.entryDescription}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* New Certificates Section - iterates over the array */}
      {formData.certificates && formData.certificates.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Certificates</h2>
          {formData.certificates.map((cert, index) => (
            <div key={index} className={styles.entry}>
              <h3 className={styles.entryTitle}>{cert.name || 'Certificate Name'}</h3>
              <p className={styles.entrySubtitle}>
                {cert.issuingOrganization || 'Issuing Organization'}
                {cert.date && ` | ${cert.date}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {formData.skills && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p>{formData.skills}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;