// frontend/src/components/UploadMessage.js
import React from 'react';

// Component hiển thị thông báo thành công/lỗi
function UploadMessage({ filename, error }) {
    return (
        <div className="upload-messages">
            {/* Hiển thị thông báo thành công nếu có filename */}
            {filename && (
                <div className="success-message">
                    File {filename} uploaded successfully!
                </div>
            )}
            
            {/* Hiển thị thông báo lỗi nếu có error */}
            {error && (
                <div className="error-message">{error}</div>
            )}
        </div>
    );
}

export default UploadMessage;