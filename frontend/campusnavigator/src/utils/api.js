// src/utils/api.js

const BASE_URL = 'http://localhost:3000/api';

export async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const config = {
            method,
            headers,
            credentials: 'include',
        };

        if (body && (method === 'POST' || method === 'PUT')) {
            config.body = JSON.stringify(body);
        }

        const cleanEndpoint = endpoint.replace(/^\/+/, '');
        const url = `${BASE_URL}/${cleanEndpoint}`;

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // For DELETE requests or empty responses, return success without parsing JSON
        if (method === 'DELETE' || response.status === 204) {
            return { success: true };
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        
        return { success: true };
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}