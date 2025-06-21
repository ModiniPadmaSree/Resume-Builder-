import React, { useState, useRef } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { generatePDF } from './utils/pdfGenerator.js';
import styles from './App.module.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    summary: '',
    education: [],
    experience: [],
    certificates: [], // Initialize certificates as an empty array
    skills: '',
  });

  const previewRef = useRef();

  return (
    <div className={styles.container}>
      <ResumeForm formData={formData} setFormData={setFormData} />
      
      <div ref={previewRef} className={styles.resumePaper}>
        <ResumePreview formData={formData} />
      </div>
      
      <button className={styles.downloadBtn} onClick={() => generatePDF(previewRef.current)}>
        Download as PDF
      </button>
    </div>
  );
}

export default App;