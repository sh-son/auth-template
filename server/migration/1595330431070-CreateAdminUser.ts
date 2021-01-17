import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User, Role } from "../data/entity/User";

export class CreateAdminUser1595330431070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.type = Role.ADMIN;
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}

}
