// tableUtils.js

import $ from 'jquery';

const API_URL = import.meta.env.VITE_API_URL;

export const handleDataUpdate = async (url) => {
    if (url === undefined) {
        url = `http://${API_URL}:3002/aduArticoleScanate/${localStorage.nr_tableta}`;
    }
    const newData = await fetchData(url);
    reloadData(newData);
};

export const reloadData = (newData) => {
    const dataTable = $('#table_items').DataTable();
    dataTable.clear();
    dataTable.rows.add(newData);
    dataTable.draw();
};

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Eroare de rețea: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error('Date neașteptate de la server');
        }
    } catch (error) {
        console.error('Eroare în timpul solicitării datelor:', error.message);
        return [];
    }
};
