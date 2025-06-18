import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
      isAuthenticated?: () => boolean;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Если пользователь авторизован через сессию (Passport)
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    // Если есть JWT-токен в cookie
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'swagozavr2swag1') as JwtPayload;
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'Пользователь не найден' });
        }
        req.user = user;
        return next();
      } catch (error) {
        return res.status(401).json({ message: 'Неверный токен или истек срок жизни' });
      }
    }

    // Если ничего не подошло — не авторизован
    return res.status(401).json({ message: 'Пожалуйста, авторизуйтесь' });
  } catch (error) {
    console.error('Auth middleware ошибка:', error);
    return res.status(500).json({ message: 'педик' });
  }
};

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Не авторизован' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Ошибка авторизации администратора', error: String(error) });
  }
}; 