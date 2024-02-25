import { Request, Response, NextFunction } from 'express';
import url from 'url';
import _ from 'lodash';

/**
 * ### HTTP
 *
 * Decorator for API functions which are called via an HTTP request. Takes the API method and wraps
 * it so that it gets data from the request and returns a sensible JSON response.
 *
 * @public
 * @param {Function} apiMethod API method to call
 * @return {Function} middleware format function to be called by the route when a matching request
 *   is made
 */
const http = function http(apiMethod) {
  return async function apiHandler(req: Request, res: Response, next: NextFunction) {
    // We define 2 properties for using as arguments in API calls:

    const object = req.body;
    const requestKeys = [`file`, `files`, `headers`, `params`, `query`, `clientIp`];
    const requestHeaders = req.headers;
    const httpReferrer: any =
      requestHeaders.referrer || requestHeaders.referer || requestHeaders[`client-referrer`];

    const options = {
      ..._.pick(req, requestKeys),
      locals: res.locals ? res.locals : null,
      user: req.user ? req.user : null,
      referrer: httpReferrer && url.parse(httpReferrer).hostname
    };

    try {
      const response = await apiMethod(object, options);

      /**
       * Setting response body in the res
       */
      if (response?.isMiddleware) {
        res.locals['isMiddleware'] = response?.isMiddleware || false;
        delete response.isMiddleware;
        // delete requestHeaders['authorization'];
        res.locals.auth = response;
        return next();
      }

      //RBAC
      if (response?.isRole) {
        res.locals['isRole'] = response?.isRole || false;
        delete response.isRole;
        res.locals.auth = response;
        return next();
      }

      res.body = response;

      // RBAC
      if (response.status === 403) {
        return res.status(403).send(response);
      }

      if (!res.locals['isMiddleware'] && requestHeaders['authorization']) {
        return res.status(401).send(response);
      }

      delete res.locals['isMiddleware'];
      delete res.locals['isRole'];
      // Send a properly formatting HTTP response containing the data with correct headers
      res.status(response.status || 200).json(response || {});
    } catch (err) {
      // To be handled by the API middleware
      next(err);
    }
  };
};

export default {
  http
};
