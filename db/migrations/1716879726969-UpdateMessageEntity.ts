import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1716879726969 implements MigrationInterface {
    name = 'UpdateMessageEntity1716879726969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "created_at"`);
    }

}
