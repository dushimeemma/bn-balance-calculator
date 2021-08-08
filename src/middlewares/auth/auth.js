import { User } from '../../database/models';
import { decode } from '../../utils/jwt_functions';

class AuthMiddlewareController {
  async verifyToken(req, res, next) {
    const { 'x-auth-token': token } = req.headers;

    if (!token) {
      return res.status(401).json({
        message: 'No Token, Authorization denied',
      });
    }

    try {
      const user = decode(token);
      const checkUser = await User.findOne({ where: { email: user.email } });

      if (!checkUser) {
        return res.status(400).json({
          error: 'User not found',
        });
      }

      req.user = checkUser;

      next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default AuthMiddlewareController;
