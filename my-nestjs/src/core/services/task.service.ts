import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    @Cron('0 */42 9-20 * * *')
    handleCron() {
        this.logger.log('Called every hour, at the 42nd minute between 9am and 8pm');
    }

    @Interval(300000)
    handleInterval() {
        this.logger.log('Called every 300 seconds');
    }

    @Timeout(5000)
    handleTimeout() {
        this.logger.debug('Called once in 5 seconds after initial ');
    }
}