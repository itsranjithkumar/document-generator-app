import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generatePDF(elementId: string, filename: string): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create canvas from the HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Check if content fits on a single page
    if (imgHeight <= 297) {
      // A4 height in mm
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // If content is longer, still fit on one page by scaling down
      const pageHeight = 297;
      const scaledHeight = pageHeight;
      const scaledWidth = (scaledHeight * canvas.width) / canvas.height;
      const xOffset = (imgWidth - scaledWidth) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, 0, scaledWidth, scaledHeight);
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  }
}

export function downloadPDF(
  elementId: string,
  filename: string = 'document.pdf'
): Promise<void> {
  return generatePDF(elementId, filename);
}
