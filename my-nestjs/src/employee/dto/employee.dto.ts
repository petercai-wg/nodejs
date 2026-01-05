import { IsInt, IsString } from 'class-validator';

export class EmployeeDto {
    @IsString()
    name: string;

    title: string;

    @IsInt()
    jobLevel: number;

    @IsInt()
    managerId: number;
}   