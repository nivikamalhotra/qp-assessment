import jwt from 'jsonwebtoken';

import { GlobalUtils } from '../../utils';
import { CONSTANT_CONFIG } from '../../../config/CONSTANT_CONFIG';

export const auth = {
  validateUser: async (object, options) => {
    var res = GlobalUtils.responseObject();

    let token = options.headers['authorization'];
    if (token) {
      token = token.replace(/^Bearer\s/, '');
    } else {
      res.status = 400;
      res.success = false;
      res.message = 'Token not provided';
      return res;
    }

    const decodedJwt = jwt.decode(token, { complete: true });
    if (!decodedJwt) {
      res.status = 401;
      res.success = false;
      res.message = 'Not a valid JWT token';
      return res;
    } else {
      try {
        const verifyJwt = jwt.verify(token, CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY);
        verifyJwt['isMiddleware'] = true;
        return verifyJwt;
      } catch (error) {
        res.status = 401;
        res.success = false;
        res.message = error.message;
        return res;
      }
    }
  },

  restric: (...role) => {
    var res = GlobalUtils.responseObject();
    return async (object?, options?) => {
      const response = options.locals.auth;
      response['isRole'] = true;

      if (!role.includes(options?.locals?.auth.role)) {
        res.status = 403;
        res.success = false;
        res.message = 'You do not have permission to perform this action';
        return res;
      }
      return response;
    };
  }
};
