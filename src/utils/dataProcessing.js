export const processUploadResponse = (response) => {
    try {
        const { data, filename, success } = response.data;
        
        if (!success || !data) {
            throw new Error('Invalid response data');
        }

        const processedData = data;
        const cols = data.length > 0 ? Object.keys(data[0]) : [];
        
        return {
            processedData,
            cols,
            filename
        };
    } catch (error) {
        console.error('Error processing response:', error);
        throw new Error('Invalid response data structure');
    }
}; 