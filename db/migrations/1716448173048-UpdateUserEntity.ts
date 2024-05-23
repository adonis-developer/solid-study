import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1716448173048 implements MigrationInterface {
    name = 'UpdateUserEntity1716448173048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."users" ADD "commission_from_ids" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."users" DROP COLUMN "commission_from_ids"`);
    }

}
