import { jsPDF } from "jspdf";

export const generatePDF = (unit, data) => {
  const doc = new jsPDF("landscape", "px", "a4");

  // 1. Agar Agency ne apna background template upload kiya hai
  if (unit.bg_image_base64) {
    doc.addImage(unit.bg_image_base64, 'PNG', 0, 0, 630, 445);
  }

  // 2. Dynamic Text Placement
  doc.setFontSize(20);
  let yPos = 150; // Starting Y position

  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 315, yPos, { align: "center" });
    yPos += 30; // Har line ke beech gap
  });

  doc.save(`${unit.unit_name}_Cert.pdf`);
};
