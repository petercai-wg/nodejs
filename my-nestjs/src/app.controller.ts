import { Controller, Get, Post, Request, Render, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {

    private readonly logger = new Logger(AppController.name);

    constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('myLocal'))
    @Post('/validateUser')
    validateUser(@Request() req) {
        // calling authService.validateUser() by UseGuards decorator and passport local strategy
        this.logger.log(`AppController after Use AuthGuard ${JSON.stringify(req.body)},  ${JSON.stringify(req.user)}`);

        return this.authService.createJwtToken(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    @Render('index')
    getIndex() {

        return { message: 'Hello hbs template world!' };
    }

    @Get("/hello")
    getHello() {
        return this.appService.getHello();

    }
}
