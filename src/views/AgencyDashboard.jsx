import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

export default function AgencyDashboard({ unit }) {
  const [formData, setFormData] = useState({});

  const handleInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="card">
      <h1>🏢 {unit.unit_name} Dashboard</h1>
      <p>Fill details to generate certificate:</p>
      
      {unit.custom_fields.map(field => (
        <div key={field} style={{marginBottom: '15px'}}>
          <label>{field}: </label>
          <input 
            placeholder={`Enter ${field}`} 
            onChange={(e) => handleInput(field, e.target.value)}
            className="dynamic-input"
          />
        </div>
      ))}

      <button 
        onClick={() => generatePDF(unit, formData)} 
        className="generate-btn"
      >
        GENERATE OFFICIAL CERTIFICATE
      </button>
    </div>
  );
}
