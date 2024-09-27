import React from 'react';
import logo from './logo.svg';
import './App.css';
import PipelineManager from './components/PipelineManager';

function App() {
  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
            <h1>Ado Pipeline Manager</h1>
            <PipelineManager definitionId={12345} /> {/* Replace with your definition ID */}
        </div>
    </div>
  );
}

export default App;
