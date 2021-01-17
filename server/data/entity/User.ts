import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

export enum Role {
    ADMIN = '관리자',
    USER = '사용자',
}

@Entity()
@Unique(["username"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    username: string;
 
    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    type: Role;

    @Column()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = "Bearer " + bcrypt.hashSync(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        const r = "Bearer "; 
        const c = this.password.replace(r, ""); 
        const ok = bcrypt.compareSync(unencryptedPassword, c);

        return ok
    }

    static findByIdAndUsername(id: string, username: string) {
        return this.createQueryBuilder("user")
            .where("user.id = :id", { id })
            .andWhere("user.username = :username", { username } )
            .getOne
    }

}
