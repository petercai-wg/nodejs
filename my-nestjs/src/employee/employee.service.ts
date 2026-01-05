import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
    ) { }

    findAll() {
        console.log(`EmployeeService... findAll`);
        return this.employeeRepository.find();
    }

    findEmployeeById(id: number) {
        console.log(`EmployeeService... findEmployeeById: ${id}`);
        return this.employeeRepository.findOneBy({ id: id });
    }

    async findEmployeeByManagerId(managerId: number): Promise<Employee[]> {
        console.log(`EmployeeService... findEmployeeByManagerId: ${managerId} , ${typeof managerId}`);
        return await this.employeeRepository.find({
            where: {
                managerId: managerId,
            },
        });
    }

    async saveEmployee(employee: Employee): Promise<Employee> {
        console.log(`EmployeeService... saveEmployee: ${JSON.stringify(employee)}`);
        const result = await this.employeeRepository.save(employee);
        return result;
    }
}