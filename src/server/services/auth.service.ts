import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';
import { userMasterDao } from '../../db/daos';
import { MESSAGES } from '../utils/constants/messages';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

class AuthService {
  async signIn(object, options) {
    const { username, password } = object;

    const isUserExist = await userMasterDao.getUserByUsername({ key: 'username', value: username });
    if (!isUserExist) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    const savedPassword = isUserExist?.password;
    const id = isUserExist?.id;

    // Verify password
    const passwordValid = await bcrypt.compare(password, savedPassword);
    if (!passwordValid) {
      throw new Error(MESSAGES.ERROR.SIGNIN);
    }

    // Authenticate user with jwt
    const accessToken = jwt.sign(
      { sub: id, role: isUserExist?.role },
      CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
      }
    );

    // Refresh Token
    const refreshToken = jwt.sign({ sub: id }, CONSTANT_CONFIG.JWT.REFRESH_SECRET_KEY, {
      expiresIn: CONSTANT_CONFIG.JWT.REFRESH_TOKEN_EXPIRY
    });

    return {
      message: MESSAGES.SUCCESS.SIGN_IN,
      data: {
        sub: id,
        role: isUserExist?.role,
        token: accessToken,
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY,
        refreshToken: refreshToken
      }
    };
  }

  async signup(object, options) {
    const { role, username, email, password } = object;

    const ifEmailAlreadyExist = await userMasterDao.getUserByUsername({
      key: 'email',
      value: email
    });
    if (ifEmailAlreadyExist) {
      throw new Error(MESSAGES.ERROR.EMAIL_ALREADY_EXIST);
    }

    // encrypt the pass                            salt-round
    const encryptedPass = await bcrypt.hash(password, 15);
    const data = {
      username: username,
      password: encryptedPass,
      email: email,
      role: role
    };

    await userMasterDao.createUser(data);
    return { message: MESSAGES.SUCCESS.CREATED };
  }
}

export const authService = new AuthService();
