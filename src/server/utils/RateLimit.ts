import setRateLimit from 'express-rate-limit';
import { GlobalUtils } from '.';

const result = GlobalUtils.responseObject();
export const RateLimiter = {
  /**
   * Creates a rate limiter for sign-in routes
   */
  limitSignInRates() {
    // delayMs: 0 disable delaying - full speed until the max limit is reached
    return new setRateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 100 // limit each IP to 10 createAccount/login requests per windowMs
    });
  },

  /**
   * Rate limiter for public routes
   */
  publicRates() {
    return new setRateLimit({
      windowMs: 60 * 1000, // 15 minutes
      max: 20, // limit each IP to 300 requests per windowMs,
      //message: 'You have exceeded your 5 requests per minute limit.'
      handler: (req, res, next) => {
        // Customize the error response
        result.status = 429;
        result.success = false;
        result.message = 'Too many requests, please try again later.';
        res.status(429).json(result);
      }
    });
  }
};
