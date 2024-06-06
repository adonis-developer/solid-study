import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConversationTable1717554718655 implements MigrationInterface {
    name = 'UpdateConversationTable1717554718655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."conversations" ALTER COLUMN "sender" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."conversations" ALTER COLUMN "sender" SET NOT NULL`);
    }

}
