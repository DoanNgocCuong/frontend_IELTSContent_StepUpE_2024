import React from 'react';

function FileUploader({ onFileChange, onUpload, loading, file }) {
    return (
        <div className="upload-section">
            <input 
                type="file" 
                onChange={onFileChange}
                accept=".xlsx,.xls"
                disabled={loading}
            />
            <button 
                onClick={onUpload}
                disabled={loading || !file}
                className="upload-button"
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
}

export default FileUploader; 