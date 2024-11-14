import React, { useState } from 'react';
import { getOutputFiles, downloadFile } from '../../../services/api';
import '../ShowOutput.css';

function DownAll() {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownloadAll = async () => {
        try {
            setDownloading(true);
            setError(null);
            
            // Get list of all files
            const files = await getOutputFiles();
            
            // Download each file with a small delay
            for (const file of files) {
                downloadFile(file.name);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
        } catch (err) {
            setError('Failed to download all files: ' + err.message);
            console.error('Error downloading all files:', err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="download-all-container">
            <button
                onClick={handleDownloadAll}
                disabled={downloading}
                className="download-all-button"
            >
                {downloading ? 'Downloading...' : 'Download All Files'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default DownAll;