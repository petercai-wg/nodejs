import {
    Controller,
    Get, Post,
    Param, Body,
    ParseIntPipe,
    HttpStatus,
    UsePipes,
    ValidationPipe,

} from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }
    @Get()
    findAll() {
        console.log(`EmployeeController... Get findAll`);
        return this.employeeService.findAll();
    }

    @Get(':id')
    findEmployeeById(@Param('id') id: number) {

        console.log(`EmployeeController... Get findEmployeeById: ${id}, typeof id == ${typeof id}`);
        return this.employeeService.findEmployeeById(id);
    }


    @Get('/byMgr/:id')
    findbyManagerId(@Param('id', ParseIntPipe) id: number) {
        console.log("EmployeeController...findbyManagerId, typeof id == ", typeof id);
        const result = this.employeeService.findEmployeeByManagerId(id);
        console.log("EmployeeController...get result ", result.then(res => console.log("... Real result... ", res)));

        return result;
    }

    @Post("/create")
    @UsePipes(new ValidationPipe({ transform: true }))
    async createEmployee(@Body() employeeDto: EmployeeDto) {
        console.log(`EmployeeController... Post create  ${JSON.stringify(employeeDto)}`);
        const employee = new Employee();

        employee.firstname = employeeDto.name.split(' ')[0];
        employee.lastname = employeeDto.name.split(' ')[1] || '';
        employee.description = employeeDto.title;
        employee.joblevel = employeeDto.jobLevel;
        employee.managerId = employeeDto.managerId;

        const result = await this.employeeService.saveEmployee(employee);

        return {
            status: HttpStatus.CREATED,
            message: 'Item created successfully',
            id: result.id,
        };
    }


}