// frontend/src/FileUpload.js
import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import UploadMessage from '../../components/UploadMessage';
import { uploadFile } from '../../services/api';
import './FileUpload.css';

function FileUpload() {
    // State chỉ liên quan đến upload
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Xử lý việc chọn file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Xử lý việc upload file
    const handleUpload = async () => {
        try {
            console.log('Starting upload process...');
            setLoading(true);
            setError(null);
            
            const response = await uploadFile(file);
            setFilename(response.filename);
            console.log('File uploaded successfully:', response.filename);
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <FileUploader 
                onFileChange={handleFileChange}
                onUpload={handleUpload}
                loading={loading}
                file={file}
            />
            <UploadMessage 
                filename={filename}
                error={error}
            />
        </div>
    );
}

export default FileUpload;