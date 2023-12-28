const config = {
    ORIGIN: 'http://localhost,http://localhost:3000,http://localhost:8000,https://real-time-chat-app-client-nine.vercel.app,https://real-time-chat-app-server-eta.vercel.app',
};

const credentials = (req, res, next) => {
    const listedOrigins = config.ORIGIN.split(',');
    const origin = req.headers.origin;

    if (listedOrigins.indexOf(origin) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Max-Age', '1800');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    }
    next();
};
module.exports = { credentials };
