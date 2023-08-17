import React, { useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';  
import CodeEditor from './components/CodeEditor';
import GoTutorial from './components/GoTutorial';
import OutputPanel from './components/OutputPanel'; 
import axios from 'axios';

function App() {
    const [code, setCode] = useState('');
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [output, setOutput] = useState('');  // New state for storing execution output


    const handleExecute = () => {
    
        axios.post('http://localhost:3001/execute', { content: code })
            .then(response => {

                if (response.data.error) {
                    setOutput(response.data.error);
                } 
                else {
                setOutput(response.data.output);
                }
            })
            
            .catch(error => {
                console.error('Error executing code:', error);
            
                if (error.response && error.response.data && error.response.data.details) {
                    setOutput(error.response.data.details);
                } else {
                    console.error('Unexpected error:', error.message);
                }
            });
            
    };

    return (
        <div className="App">
            <Toolbar onLectureSelect={setSelectedLecture} onExecute={handleExecute} />
            <div className="content">
                <CodeEditor value={code} onChange={setCode} />
                
                <GoTutorial lectureId={selectedLecture} />
            </div>
            <OutputPanel output={output} />  
        </div>
    );
}

export default App;
