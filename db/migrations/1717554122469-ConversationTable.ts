import { MigrationInterface, QueryRunner } from "typeorm";

export class ConversationTable1717554122469 implements MigrationInterface {
    name = 'ConversationTable1717554122469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "conversation_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "target_user_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "target_user_id" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "target_user_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "target_user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "conversation_id"`);
    }

}
