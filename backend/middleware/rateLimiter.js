import rateLimit from 'express-rate-limit';


export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,       
    max: 5,
    message: { message: 'Too many registration attempts, please try again after 15 minutes' },
    standardHeaders: true, 
    legacyHeaders: false,
});

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: { message: 'Too many login attempts, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});
