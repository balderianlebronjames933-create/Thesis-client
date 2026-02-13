const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/organizations`;

export const fetchPublicOrgs = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch public organizations');
    return await response.json();
};

export const fetchAdminOrgs = async (token) => {
    const response = await fetch(`${BASE_URL}/admin/list`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch admin organizations');
    return await response.json();
};