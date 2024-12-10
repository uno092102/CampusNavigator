// src/utils/api.js

const BASE_URL = 'http://localhost:8080/api';

export async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const config = {
            method,
            headers,
            credentials: 'include', // Include if you're using cookies
        };

        if (body && (method === 'POST' || method === 'PUT')) {
            config.body = JSON.stringify(body);
        }

        // Remove any leading slashes from the endpoint
        const cleanEndpoint = endpoint.replace(/^\/+/, '');
        const url = `${BASE_URL}/${cleanEndpoint}`;

        const response = await fetch(url, config);

        // Handle non-OK responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: `HTTP error! status: ${response.status}`
            }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // Check if response has content
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        
        return null;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}