import React, { useMemo, useRef, useState } from 'react';
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
    projects: [],
    certificates: [],
    skills: '',
    links: [],
  });

  const [zoom, setZoom] = useState(0.72);

  const previewRef = useRef(null);
  const previewPanelRef = useRef(null);
  const reviewSectionRef = useRef(null);

  /* =========================================
     PDF DOWNLOAD
     ========================================= */

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: 'resume',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      @media print {
        body {
          background: white;
        }
      }
    `,
  });

  /* =========================================
     COMPLETION %
     ========================================= */

  const completion = useMemo(() => {
    const checks = [
  Boolean(formData.name.trim()),
  Boolean(formData.email.trim()),
  Boolean(formData.phone.trim()),
  Boolean(formData.title.trim()),
  Boolean(formData.summary.trim()),
  formData.education.length > 0,
  formData.experience.length > 0,
  formData.projects.length > 0,
  formData.certificates.length > 0,
  Boolean(formData.skills.trim()),
  formData.links.length > 0,
];

    const completed = checks.filter(Boolean).length;

    return Math.round((completed / checks.length) * 100);
  }, [formData]);

  /* =========================================
     ZOOM
     ========================================= */

  const decreaseZoom = () => {
    setZoom((current) =>
      Math.max(0.5, Number((current - 0.05).toFixed(2)))
    );
  };

  const increaseZoom = () => {
    setZoom((current) =>
      Math.min(1, Number((current + 0.05).toFixed(2)))
    );
  };

  const resetZoom = () => {
    setZoom(0.72);
  };

  /* =========================================
     NAVIGATION
     ========================================= */

  const scrollToPreview = () => {
    previewPanelRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollToReview = () => {
    reviewSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /* =========================================
     APP
     ========================================= */

  return (
    <div className={styles.app}>

      {/* =====================================
          NAVBAR
          ===================================== */}

      <header className={styles.navbar}>
        <div className={styles.navbarInner}>

          {/* BRAND */}

          <button
            type="button"
            className={styles.brand}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            <span className={styles.brandMark}>R</span>
            <span className={styles.brandText}>ResumeAI</span>
          </button>


          {/* NAVIGATION */}

          <nav className={styles.navLinks}>

            <button
              type="button"
              className={`${styles.navLink} ${styles.active}`}
            >
              Builder
            </button>

            <button
              type="button"
              className={styles.navLink}
              onClick={scrollToReview}
            >
              Review
            </button>

            <button
              type="button"
              className={styles.navLink}
              onClick={scrollToPreview}
            >
              Preview
            </button>

          </nav>


          {/* RIGHT ACTIONS */}

          <div className={styles.navActions}>

            <button
              type="button"
              className={styles.downloadBtn}
              onClick={handlePrint}
            >
              ↓ Download PDF
            </button>

            <div className={styles.profileButton}>
              {formData.name
                ? formData.name.charAt(0).toUpperCase()
                : 'U'}
            </div>

          </div>

        </div>
      </header>


      {/* =====================================
          HERO
          ===================================== */}

      <section className={styles.hero}>

        <div className={styles.eyebrow}>
          ✦ AI-powered resume builder
        </div>

        <h1>
          Build your professional resume
        </h1>

        <p>
          Create a polished, ATS-friendly resume with AI assistance.
          Write better content, review your resume, and see every
          change instantly in the live preview.
        </p>

      </section>


      {/* =====================================
          MAIN WORKSPACE
          ===================================== */}

      <main className={styles.workspace}>

        {/* LEFT — EDITOR */}

        <section className={styles.editorPanel}>

          <div className={styles.editorHeader}>

            <div>
              <h2>Your Information</h2>

              <p>
                Add your details and build your resume
              </p>
            </div>

            <div className={styles.completion}>

              <span>
                {completion}% complete
              </span>

              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${completion}%`,
                  }}
                />
              </div>

            </div>

          </div>

          <div className={styles.editorBody}>

            <ResumeForm
              formData={formData}
              setFormData={setFormData}
            />

          </div>

        </section>


        {/* RIGHT — LIVE PREVIEW */}

        <section
          ref={previewPanelRef}
          className={styles.previewPanel}
        >

          <div className={styles.previewHeader}>

            <div className={styles.previewTitle}>

              <span>Live Preview</span>

              <span className={styles.liveIndicator}>
                <span className={styles.liveDot} />
                Live
              </span>

            </div>


            <div className={styles.previewControls}>

              <button
                type="button"
                className={styles.previewControl}
                onClick={decreaseZoom}
                aria-label="Zoom out"
              >
                −
              </button>

              <button
                type="button"
                className={styles.zoomValue}
                onClick={resetZoom}
                title="Reset zoom"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                className={styles.previewControl}
                onClick={increaseZoom}
                aria-label="Zoom in"
              >
                +
              </button>

            </div>

          </div>


          <div className={styles.previewCanvas}>

            <div
              className={styles.resumeScale}
              style={{
                transform: `scale(${zoom})`,
              }}
            >

              <ResumePreview
                ref={previewRef}
                formData={formData}
              />

            </div>

          </div>

        </section>

      </main>


      {/* =====================================
          AI RESUME REVIEW
          ===================================== */}

      <section
        ref={reviewSectionRef}
        className={styles.reviewSection}
      >

        <div className={styles.sectionHeading}>

          <div className={styles.sectionEyebrow}>
            AI ANALYSIS
          </div>

          <h2>
            Improve your resume
          </h2>

          <p>
            Get an AI-powered resume score, identify weaknesses,
            and discover missing keywords for your target role.
          </p>

        </div>

        <ResumeReview
          formData={formatResumeData(formData)}
        />

      </section>


      {/* =====================================
          AI CHAT ASSISTANT
          ===================================== */}

      <AIChatAssistant
        formData={formData}
        setFormData={setFormData}
      />

    </div>
  );
}

export default App;