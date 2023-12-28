const config = {
    ORIGIN: 'http://localhost,http://localhost:3000,http://localhost:8000,https://real-time-chat-app-client-nine.vercel.app,https://real-time-chat-app-server-eta.vercel.app,https://comfy-bienenstitch-afa8c6.netlify.app',
};

const credentials = (req, res, next) => {
    const listedOrigins = config.ORIGIN.split(',');
    const origin = req.headers.origin;

    console.log(origin);
    console.log(listedOrigins);
    console.log('from credentials');
    if (listedOrigins.indexOf(origin) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    next();
};
module.exports = { credentials };
