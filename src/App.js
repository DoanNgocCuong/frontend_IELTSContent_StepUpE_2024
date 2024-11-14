// App.js
import React from 'react';
import FileUpload from './FileUpload';
import App from './App';

function App() {
    return (
        <div className="page-container">
            <h2>Content Generation Tool</h2>
            <FileUpload />
            <App />
        </div>
    );
}

export default App;