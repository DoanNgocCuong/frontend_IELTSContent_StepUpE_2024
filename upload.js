import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid from 'react-data-grid';

function Upload() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [filename, setFilename] = useState('');
    const [columns, setColumns] = useState([]);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:5000/upload', formData);
        setData(response.data.data);
        setFilename(response.data.filename);

        // Tạo cột từ dữ liệu
        if (response.data.data.length > 0) {
            const cols = Object.keys(response.data.data[0]).map(key => ({
                key,
                name: key,
                editable: true
            }));
            setColumns(cols);
        }
    };

    const handleSave = async () => {
        await axios.post('http://localhost:5000/update', { data, filename });
        alert('File updated successfully!');
    };

    const handleRowsChange = (rows) => setData(rows);

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
            {data.length > 0 && (
                <>
                    <DataGrid
                        columns={columns}
                        rows={data}
                        onRowsChange={handleRowsChange}
                    />
                    <button onClick={handleSave}>Save Changes</button>
                    <a href={`http://localhost:5000/download/${filename}`} target="_blank" rel="noopener noreferrer">
                        Download Updated File
                    </a>
                </>
            )}
        </div>
    );
}

export default Upload;
