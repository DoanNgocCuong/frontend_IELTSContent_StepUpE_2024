// ContentGenerator.js
import React, { useState } from 'react';
import { runScriptApi } from '../../services/api';
import './ContentGenerator.css';

function ContentGenerator() {
    // State chỉ liên quan đến việc chạy scripts
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [scriptStatus, setScriptStatus] = useState({});

    const scripts = ['generate_story', 'generate_ipa', 'generate_meaning', 'gen_answer_pic'];

    // Xử lý việc chạy script
    const runScript = async (scriptName) => {
        try {
            console.log(`Starting script: ${scriptName}`);
            setLoading(true);
            setError(null);
            setScriptStatus(prev => ({ ...prev, [scriptName]: 'running' }));
            
            const response = await runScriptApi(scriptName);
            console.log(`Script ${scriptName} response:`, response);
            
            setScriptStatus(prev => ({ ...prev, [scriptName]: 'completed' }));
            alert(`${scriptName} executed successfully!`);
        } catch (error) {
            console.error(`Script ${scriptName} error:`, error);
            setScriptStatus(prev => ({ ...prev, [scriptName]: 'error' }));
            setError(`Error running ${scriptName}: ${error.message}`);
            throw error; // Re-throw to handle in runAll
        } finally {
            setLoading(false);
        }
    };

    const runAll = async () => {
        setError(null);
        for (const script of scripts) {
            try {
                await runScript(script);
            } catch (error) {
                // Stop execution if any script fails
                break;
            }
        }
    };

    return (
        <div className="generator-container">
            <h3>Generate Content</h3>
            <div className="script-buttons">
                <button
                    onClick={runAll}
                    disabled={loading}
                    className="run-all-button"
                >
                    RUN ALL
                    {loading && <span className="loading">...</span>}
                </button>
                {scripts.map(script => (
                    <button
                        key={script}
                        onClick={() => runScript(script)}
                        disabled={loading}
                        className={`script-button ${scriptStatus[script] || ''}`}
                    >
                        {script.replace(/_/g, ' ').toUpperCase()}
                        {scriptStatus[script] === 'running' && 
                            <span className="loading">...</span>}
                    </button>
                ))}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default ContentGenerator;