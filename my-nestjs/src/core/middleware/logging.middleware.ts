import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('LoggerMiddleware Request received:', req.method, req.url);
        // You can add logic here, e.g., logging, authentication.
        next(); // Pass control to the next middleware or route handler.

        console.log('LoggerMiddleware after next() ', req.method, req.url);
    }
}