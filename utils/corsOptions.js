const config = {
    ORIGIN: 'http://localhost,http://localhost:3000,http://localhost:8000,https://real-time-chat-app-client-nine.vercel.app,https://real-time-chat-app-server-eta.vercel.app,https://comfy-bienenstitch-afa8c6.netlify.app,https://real-time-chat-app-server-iaxl.onrender.com',
};

const corsOptions = {
    origin: (origin, callback) => {
        const listedOrigins = config.ORIGIN.split(',');

        if (listedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
};

module.exports = { corsOptions };
