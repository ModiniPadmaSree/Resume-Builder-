import React, { useState } from 'react';
import { generateContent } from '../../services/aiService';
import styles from './AIWriter.module.css';

// field: 'summary' | 'experience' | 'education'
// context: raw text the AI should base its writing on
// onGenerated: (text) => void, called with the generated text so the parent can insert it
const AIWriter = ({ field, context, onGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    if (!context || !context.trim()) {
      setError('Add a few details first so AI has something to work with.');
      return;
    }
    setLoading(true);
    try {
      const { text } = await generateContent(field, context);
      onGenerated(text);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.aiBtn}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Writing…' : '✨ Write with AI'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AIWriter;
