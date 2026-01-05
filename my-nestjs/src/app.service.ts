import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
    onModuleInit() {
        console.log(`The AppService is now initialized.`);
    }
    getHello(): string {
        return 'Hello my nestjs World!';
    }
}
