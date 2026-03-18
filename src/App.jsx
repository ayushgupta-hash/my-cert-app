import React, { useState } from 'react';
import { jsPDF } from "jspdf";

export default function App() {
  const [unit, setUnit] = useState('');
  const [certType, setCertType] = useState('');
  const [name, setName] = useState('');

  // Aap yahan apne Units aur unke Documents ki list badha sakte hain
  const unitsData = {
    "Publication Unit - A": ["Author Certificate", "Reviewer Letter", "Achievement"],
    "Marketing Dept": ["Internship Certificate", "Offer Letter"],
    "Editorial Board": ["Membership Card", "Excellence Award"]
  };

  const generatePDF = () => {
    if(!unit || !certType || !name) {
      alert("Bhai, saari details toh bhar do!");
      return;
    }

    const doc = new jsPDF("landscape", "px", "a4");

    // Professional Border
    doc.setLineWidth(15);
    doc.setDrawColor(44, 62, 80); 
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40);

    // Header - Unit Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(44, 62, 80);
    doc.text(unit, 315, 80, { align: "center" });

    // Document Title
    doc.setFontSize(22);
    doc.setTextColor(100, 100, 100);
    doc.text(certType.toUpperCase(), 315, 120, { align: "center" });

    // Body Text
    doc.setFont("times", "italic");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("This is to certify that", 315, 170, { align: "center" });

    // Person Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(45);
    doc.setTextColor(184, 134, 11); // Gold color
    doc.text(name, 315, 230, { align: "center" });

    // Footer/Date
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 400);

    // Final Download
    doc.save(`${name}_${certType}.pdf`);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'inline-block', width: '450px' }}>
        <h1 style={{ color: '#1a2a3a', marginBottom: '10px' }}>📄 Publication Pro</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Create & Edit Software Publications</p>
        
        <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>Select Unit</label>
        <select onChange={(e) => { setUnit(e.target.value); setCertType(''); }} style={{ width: '100%', padding: '12px', margin: '8px 0 20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option value="">-- Choose Unit --</option>
          {Object.keys(unitsData).map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        
        {unit && (
          <>
            <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>Document Type</label>
            <select onChange={(e) => setCertType(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0 20px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <option value="">-- Choose Type --</option>
              {unitsData[unit].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </>
        )}

        <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>Recipient Name</label>
        <input 
          type="text" 
          placeholder="Enter Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          style={{ width: '94%', padding: '12px', margin: '8px 0 30px', borderRadius: '8px', border: '1px solid #ddd' }}
        />

        <button onClick={generatePDF} style={{ width: '100%', padding: '15px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          DOWNLOAD PDF
        </button>
      </div>
    </div>
  );
}