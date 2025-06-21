import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generates a PDF from a given HTML element.
 * @param {HTMLElement} element The DOM element to convert to PDF.
 */
export const generatePDF = (element) => {
  if (!element) {
    console.error('PDF generation error: No element provided to convert.');
    return;
  }

  // Use a higher scale for better resolution in the PDF
  html2canvas(element, {
    scale: 3, // Increased scale to capture more detail
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff', // Ensure a white background for transparent elements
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    
    // Initialize jsPDF with portrait ('p') orientation, 'mm' units, and 'a4' size
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);

    const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width in mm (210mm)
    const pdfHeight = pdf.internal.pageSize.getHeight(); // A4 height in mm (297mm)

    // Calculate image dimensions to fit within PDF while maintaining aspect ratio and margins
    const aspectRatio = imgProps.width / imgProps.height;
    const margin = 10; // 10mm margin on all sides
    const availableWidth = pdfWidth - (margin * 2);
    const availableHeight = pdfHeight - (margin * 2);

    let imgPdfWidth = availableWidth;
    let imgPdfHeight = availableWidth / aspectRatio;

    // If calculated height exceeds available height, scale down based on height
    if (imgPdfHeight > availableHeight) {
      imgPdfHeight = availableHeight;
      imgPdfWidth = availableHeight * aspectRatio;
    }

    // Calculate centered position
    const x = margin + (availableWidth - imgPdfWidth) / 2;
    const y = margin + (availableHeight - imgPdfHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, imgPdfWidth, imgPdfHeight);
    pdf.save('resume.pdf');
  }).catch((error) => {
    console.error('Error generating PDF:', error);
  });
};
