import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ResumeReview from './components/ResumeReview';
import AIChatAssistant from './components/AIChatAssistant';
import { formatResumeData } from './utils/formatResumeData';
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
    certificates: [],
    skills: '',
  });

  const previewRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: previewRef, 
    documentTitle: 'resume',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        margin: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `,
  });

  return (
    <div className={styles.container}>
      <ResumeForm formData={formData} setFormData={setFormData} />

      <div className={styles.resumePaper}>
        <ResumePreview ref={previewRef} formData={formData} />
      </div>

      <button className={styles.downloadBtn} onClick={handlePrint}>
        Download as PDF
      </button>

      <ResumeReview formData={formatResumeData(formData)} />

      <AIChatAssistant formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default App;
