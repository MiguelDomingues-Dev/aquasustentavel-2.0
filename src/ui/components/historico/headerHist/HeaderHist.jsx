import React from 'react';
import './headerHist.css';

export default function HeaderHist() {
  return (
    <div className="header">
      <h3>Histórico</h3>
      <select className="dateSelect">
        <option value="30/03/2025">30/03/2025</option>
      </select>
    </div>
  );
}
