import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    employeeId: number;

    @Column()
    department: string;

    @Column()
    tranist: number;

    @CreateDateColumn({ name: 'created_date' })
    createdAt: Date;


    @UpdateDateColumn({ name: 'last_updated' })
    updatedAt: Date;


}