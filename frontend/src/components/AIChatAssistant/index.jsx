import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant } from '../../services/aiService';
import styles from './AIChatAssistant.module.css';

// formData / setFormData: passed straight through from App so the assistant
// can read current progress and auto-fill simple fields as it learns them.
const AIChatAssistant = ({ formData, setFormData }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I can help you build your resume. Tell me about the role you're targeting, or ask me to help write any section.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const { reply, fields } = await chatWithAssistant(
        newMessages.map(({ role, content }) => ({ role, content })),
        formData
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      if (fields && typeof fields === 'object') {
        setFormData((prev) => ({ ...prev, ...fields }));
      }
    } catch (err) {
      setError(err.message || 'The assistant is unavailable right now.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button className={styles.launcher} onClick={() => setOpen(true)} type="button">
        💬 AI Assistant
      </button>
    );
  }

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <span>AI Resume Assistant</span>
        <button className={styles.closeBtn} onClick={() => setOpen(false)} type="button">
          ✕
        </button>
      </div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? styles.userMsg : styles.assistantMsg}>
            {m.content}
          </div>
        ))}
        {loading && <div className={styles.assistantMsg}>Thinking…</div>}
        <div ref={bottomRef} />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.inputRow} onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
        />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatAssistant;
