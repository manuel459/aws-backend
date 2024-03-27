import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Productos extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreProducto:string;

    @Column()
    precio: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAd: Date;
}