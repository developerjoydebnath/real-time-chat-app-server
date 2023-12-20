const corsOptions = {
    origin: (origin, callback) => {
        const listedOrigins = config.ORIGIN.split(',');
        if (listedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200,
};

module.exports = { corsOptions };
