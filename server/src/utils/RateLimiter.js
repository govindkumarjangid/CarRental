const rateLimiter = (options = {}) => {
    const { windowMs = 60 * 1000, max = 100, message = 'Too many requests from this IP, please try again later.' } = options;
    const requests = new Map();

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();

        if (!requests.has(ip)) {
            requests.set(ip, { count: 1, firstRequest: now });
            return next();
        }

        const requestData = requests.get(ip);

        if (now - requestData.firstRequest > windowMs) {
            requests.set(ip, { count: 1, firstRequest: now });
            return next();
        }

        requestData.count++;

        if (requestData.count > max) {
            return res.status(429).json({ success: false, message });
        }

        next();
    };
};
export default rateLimiter;