import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PgNotificationService implements OnModuleInit {
    private readonly pool: Pool;

    constructor(private readonly configService: ConfigService) {
        const host = configService.get('DB_HOST'),
            port = configService.get('DB_PORT'),
            username = configService.get('DB_USERNAME'),
            password = configService.get('DB_PASSWORD'),
            database = configService.get('DB_NAME');

        const db_url = `postgresql://${username}:${password}@${host}:${port}/${database}`;

        this.pool = new Pool({
            connectionString: db_url,
        });
    }

    async onModuleInit() {
        await this.listenForNotifications();
    }

    private async listenForNotifications() {
        const client = await this.pool.connect();
        await client.query('LISTEN new_order_channel'); //Need a PostgreSQL function and a trigger to notify a specific channel

        client.on('notification', (msg) => {
            const payload = JSON.parse(msg.payload);
            console.log('Received notification:', payload);
            // Here you can use a NestJS EventEmitter or a WebSocket gateway
            // to forward this notification to connected clients (e.g., frontend users).

        });

        console.log('Listening for PostgreSQL notifications on channel "new_order_channel"');
    }

    // // Example method to insert a notification (optional, can be done via any ORM/service)
    // async createNotification(userId: number, message: string) {
    //     await this.pool.query(
    //         'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
    //         [userId, message],
    //     );
    // }
}