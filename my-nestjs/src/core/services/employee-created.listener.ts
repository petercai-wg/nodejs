import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class EmployeeCreatedListener {

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    @OnEvent('employee.created')
    handleEmployeeCreatedEvent(event: any) {

        console.log(`EmployeeCreatedListener... handleEmployeeCreatedEvent: ${JSON.stringify(event)}`);

        this.dataSource.query(`update Employee set description = 'Default Sr job title' WHERE id = ${event} `);


    }
}