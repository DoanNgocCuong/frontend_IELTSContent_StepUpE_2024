import React from 'react';
import DataGrid from 'react-data-grid';

function DataTable({ data, columns, onDataChange }) {
    return (
        <div className="grid-container" style={{ height: '400px', width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={data}
                rowKeyGetter={row => row.id}
                onRowsChange={onDataChange}
                style={{ height: '100%' }}
            />
        </div>
    );
}

export default DataTable; 