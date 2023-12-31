import React from 'react';
import './OutputPanel.css';  

const OutputPanel = ({ output }) => {
  return (
    <div className="output-panel">
      <h3>Execution Output</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default OutputPanel;
