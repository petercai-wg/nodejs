import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggerMiddleware } from './middleware/logging.middleware';
import { PgNotificationService } from './services/pg-notification.service';

@Module({
    providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
        PgNotificationService,
    ],
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*'); // Apply to all routes globally.
        // .forRoutes('users'); // Apply only to routes starting with '/users'.
        // .forRoutes({ path: 'users', method: RequestMethod.GET }); // Apply to specific method and path.
    }
}