import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const uploadFile = async (file) => {
    if (!file) throw new Error('Please select a file first');
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    });
    
    return response;
};

export const saveData = async (data, filename) => {
    const dataToSave = data.map(({ id, ...rest }) => rest);
    return axios.post(`${API_BASE_URL}/update`, {
        data: dataToSave,
        filename
    });
};

export const runScriptApi = async (scriptName) => {
    return axios.post(`${API_BASE_URL}/api/scripts/run/${scriptName}`);
}; 