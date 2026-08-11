import React, { useState } from 'react';
import { reviewResume } from '../../services/aiService';
import styles from './ResumeReview.module.css';

// formData: already-formatted resume data (see utils/formatResumeData.js)
const ResumeReview = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleReview = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await reviewResume(formData, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Review failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.panel}>
      <h3>AI Resume Review</h3>
      <textarea
        className={styles.jdInput}
        placeholder="Optional: paste a job description to check keyword match"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows="3"
      />
      <button type="button" className={styles.reviewBtn} onClick={handleReview} disabled={loading}>
        {loading ? 'Reviewing…' : 'Review My Resume'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <div className={styles.results}>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>Score</span>
            <span className={styles.scoreValue}>{result.score}/100</span>
          </div>

          {result.strengths?.length > 0 && (
            <>
              <h4>Strengths</h4>
              <ul>
                {result.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {result.improvements?.length > 0 && (
            <>
              <h4>Suggested Improvements</h4>
              <ul>
                {result.improvements.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {result.missingKeywords?.length > 0 && (
            <>
              <h4>Missing Keywords</h4>
              <ul>
                {result.missingKeywords.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeReview;
