import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from "jspdf";

// 1. Supabase Setup (Wahi URL aur Key rakhein jo pehle thi)
const supabaseUrl = 'https://frcnfuloaxduznqpkjtt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyY25mdWxvYXhkdXpucXBranR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTIxMDIsImV4cCI6MjA4OTM4ODEwMn0.k3fZA02yNzbZtka8q1ZYKo9Wze-l4dvrKsaKcLlnXdg'; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [unit, setUnit] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Search ke liye
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const unitsData = {
    "Publication Unit - A": ["Author Certificate", "Reviewer Letter", "Achievement"],
    "Marketing Dept": ["Internship Certificate", "Offer Letter"],
    "Editorial Board": ["Membership Card", "Excellence Award"]
  };

  const fetchRecords = async () => {
    const { data } = await supabase.from('publications').select('*').order('created_at', { ascending: false });
    if (data) setHistory(data);
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleSave = async () => {
    if (!unit || !type || !name) return alert("Please fill all details!");
    setLoading(true);
    const { error } = await supabase.from('publications').insert([{ unit_name: unit, cert_type: type, recipient_name: name }]);
    
    if (!error) {
      generatePDF(unit, type, name);
      setName('');
      fetchRecords();
    }
    setLoading(false);
  };

  const generatePDF = (u, t, n) => {
    const doc = new jsPDF("landscape", "px", "a4");
    // Border
    doc.setLineWidth(10);
    doc.setDrawColor(184, 134, 11); // Gold Border
    doc.rect(20, 20, 590, 400);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.text(u.toUpperCase(), 315, 80, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text("THIS IS TO CERTIFY THAT", 315, 150, { align: "center" });

    doc.setFontSize(35);
    doc.setTextColor(184, 134, 11); // Gold Color for Name
    doc.text(n, 315, 210, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text(`HAS SUCCESSFULLY RECEIVED THE ${t.toUpperCase()}`, 315, 270, { align: "center" });
    
    doc.save(`${n}_Certificate.pdf`);
  };

  // Filter Logic for Search
  const filteredHistory = history.filter(item => 
    item.recipient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6' }}>
      
      {/* LEFT: Premium Form */}
      <div style={sidebarStyle}>
        <h2 style={{ color: '#fff', marginBottom: '30px', textAlign: 'center' }}>🏆 CertPro</h2>
        
        <label style={labelStyle}>Select Unit</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} style={inputStyle}>
          <option value="">-- Choose Unit --</option>
          {Object.keys(unitsData).map(u => <option key={u}>{u}</option>)}
        </select>

        <label style={labelStyle}>Document Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
          <option value="">-- Choose Type --</option>
          {unit && unitsData[unit].map(t => <option key={t}>{t}</option>)}
        </select>

        <label style={labelStyle}>Recipient Name</label>
        <input placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />

        <button onClick={handleSave} disabled={loading} style={btnStyle}>
          {loading ? "SAVING..." : "GENERATE & SAVE"}
        </button>
      </div>

      {/* RIGHT: Modern Dashboard */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>📜 Digital Records</h2>
          <input 
            type="text" 
            placeholder="🔍 Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchStyle}
          />
        </div>

        <div style={tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#ecf0f1', textAlign: 'left' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Recipient Name</th>
                <th style={thStyle}>Unit</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                  <td style={tdStyle}>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td style={{...tdStyle, fontWeight: 'bold'}}>{item.recipient_name}</td>
                  <td style={tdStyle}><span style={badgeStyle}>{item.unit_name}</span></td>
                  <td style={tdStyle}>
                    <button onClick={() => generatePDF(item.unit_name, item.cert_type, item.recipient_name)} style={actionBtn}>Re-Print PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHistory.length === 0 && <p style={{textAlign: 'center', padding: '20px'}}>No records found.</p>}
        </div>
      </div>
    </div>
  );
}

// Styles
const sidebarStyle = { width: '320px', padding: '30px', background: '#2c3e50', color: '#fff', boxShadow: '4px 0 10px rgba(0,0,0,0.1)' };
const labelStyle = { fontSize: '12px', color: '#bdc3c7', marginBottom: '5px', display: 'block' };
const inputStyle = { width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '6px', border: 'none', fontSize: '14px' };
const btnStyle = { width: '100%', padding: '15px', background: '#f1c40f', color: '#2c3e50', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };
const tableContainer = { background: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' };
const thStyle = { padding: '15px', color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase' };
const tdStyle = { padding: '15px', color: '#2c3e50', fontSize: '14px' };
const badgeStyle = { background: '#e8f4fd', color: '#3498db', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' };
const actionBtn = { background: '#2ecc71', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' };
const searchStyle = { padding: '10px 20px', borderRadius: '25px', border: '1px solid #ddd', width: '250px', outline: 'none' };