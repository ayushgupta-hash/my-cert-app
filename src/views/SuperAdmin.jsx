import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SuperAdmin({ onRefresh }) {
  const [unitName, setUnitName] = useState('');
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState('');
  const [bgImage, setBgImage] = useState('');

  const addField = () => {
    if (currentField) {
      setFields([...fields, currentField]);
      setCurrentField('');
    }
  };

  const saveAgency = async () => {
    const { error } = await supabase.from('units').insert([{
      unit_name: unitName,
      custom_fields: fields,
      bg_image_base64: bgImage
    }]);
    if (!error) {
      alert("Agency Dashboard Ready!");
      onRefresh();
    }
  };

  return (
    <div className="card">
      <h2>🚀 Create New Agency Dashboard</h2>
      <input placeholder="Agency Name (e.g. Times Publication)" onChange={e => setUnitName(e.target.value)} />
      
      <div className="field-builder">
        <input placeholder="Add Column (e.g. Book Title)" value={currentField} onChange={e => setCurrentField(e.target.value)} />
        <button onClick={addField}>Add</button>
      </div>

      <div className="tags">
        {fields.map(f => <span key={f} className="badge">{f}</span>)}
      </div>

      <label>Upload Template Background (Full Page Design)</label>
      <input type="file" onChange={(e) => {
        const reader = new FileReader();
        reader.onload = () => setBgImage(reader.result);
        reader.readAsDataURL(e.target.files[0]);
      }} />

      <button onClick={saveAgency} className="primary-btn">ACTIVATE AGENCY DASHBOARD</button>
    </div>
  );
}
