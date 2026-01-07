import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

import { join } from 'node:path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule,
        {
            logger: new ConsoleLogger({
                prefix: 'MyApp',
                logLevels: ['log', 'error', 'warn',],
                timestamp: true,

            })
        }
    );

    //  for MVC applications
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    await app.listen(process.env.PORT || 3000);
}

bootstrap();