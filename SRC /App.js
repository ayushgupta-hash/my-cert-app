import React, { useState } from 'react';
import { jsPDF } from "jspdf";

const App = () => {
  // 1. State for Selection
  const [unit, setUnit] = useState('');
  const [certType, setCertType] = useState('');
  const [details, setDetails] = useState({ name: '', date: '', achievement: '' });

  // 2. Data for Units & Templates
  const unitsData = {
    "Unit-A (Education)": ["Merit Certificate", "Completion Certificate"],
    "Unit-B (Sports)": ["Winner Trophy Cert", "Participation"]
  };

  // 3. PDF Generation Function
  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Design Logic
    doc.setFontSize(30);
    doc.text(unit.toUpperCase(), 148, 40, { align: "center" }); // Unit Name
    
    doc.setFontSize(20);
    doc.text(certType, 148, 60, { align: "center" }); // Type
    
    doc.setFontSize(16);
    doc.text(`This is to certify that`, 148, 90, { align: "center" });
    
    doc.setFontSize(25);
    doc.setTextColor(100, 0, 0); 
    doc.text(details.name, 148, 110, { align: "center" }); // Name
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`for ${details.achievement} on ${details.date}`, 148, 130, { align: "center" });

    // Download
    doc.save(`${details.name}_certificate.pdf`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Certificate Automation System</h1>
      <hr />

      {/* Select Unit */}
      <div style={{ margin: '10px 0' }}>
        <label>Select Unit: </label>
        <select onChange={(e) => { setUnit(e.target.value); setCertType(''); }}>
          <option value="">-- Choose Unit --</option>
          {Object.keys(unitsData).map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      {/* Select Template (Only if Unit is selected) */}
      {unit && (
        <div style={{ margin: '10px 0' }}>
          <label>Certificate Type: </label>
          <select onChange={(e) => setCertType(e.target.value)}>
            <option value="">-- Choose Type --</option>
            {unitsData[unit].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}

      {/* Input Details */}
      {certType && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>Enter Details for {certType}</h3>
          <input type="text" placeholder="Full Name" onChange={(e) => setDetails({...details, name: e.target.value})} /><br/><br/>
          <input type="text" placeholder="Achievement" onChange={(e) => setDetails({...details, achievement: e.target.value})} /><br/><br/>
          <input type="date" onChange={(e) => setDetails({...details, date: e.target.value})} /><br/><br/>
          <button onClick={generatePDF} style={{ padding: '10px 20px', background: 'green', color: 'white' }}>
            Generate & Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
