import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

@Entity('template')
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, {nullable: true, eager: true})
    @JoinColumn({name: 'user_id'})
    project: Project;

    @Column({nullable: false})
    amountUse: number;

    @Column('text', {nullable: false})
    description: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}