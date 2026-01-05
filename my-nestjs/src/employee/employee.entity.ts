
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'firstname', nullable: true })
    firstname: string;

    @Column({ name: 'lastname', nullable: true })
    lastname: string;

    @Column({ name: 'description', unique: true, nullable: true })
    description: string;

    @Column({ name: 'job_level', nullable: true })
    joblevel: number;

    @CreateDateColumn({ name: 'created_date' })
    createdAt: Date;


    @UpdateDateColumn({ name: 'last_updated' })
    updatedAt: Date;

    // Foreign Key mapping
    @Column({ name: 'manager_id', nullable: true })
    managerId: number;

    // @ManyToOne(() => Manager, (manager) => manager.id)
    // @JoinColumn({ name: 'manager_id' }) // Matches "manager_id" column in DB
    // manager: Manager;
}