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

  html2canvas(element, {
    scale: 2, // high resolution
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();  // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Scale image to fit PDF width exactly
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // If content is taller than one page, add more pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('resume.pdf');
  }).catch((error) => {
    console.error('Error generating PDF:', error);
  });
};
