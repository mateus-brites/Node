import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1608422457426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('User', new TableColumn({
            name: 'avatar',
            type:'varchar',
            isNullable: true,
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('User', 'avatar')
    }

}
