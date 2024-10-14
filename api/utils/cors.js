// /utils/cors.js
const allowCors = (fn) => async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust as necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    // Call the actual handler
    return await fn(req, res);
};

export default allowCors;
