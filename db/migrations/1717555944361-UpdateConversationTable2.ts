import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConversationTable21717555944361 implements MigrationInterface {
    name = 'UpdateConversationTable21717555944361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "message_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "banner_uri"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "commission"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "commission_from_ids"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "target_user_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "campaign_id" integer`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "sender_id" integer`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "action" character varying NOT NULL DEFAULT 'NONE'`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "mission_ids" integer array`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "commission_ids" integer array`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "shaker_ids" integer array`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "title" text`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "status" character varying NOT NULL DEFAULT 'NONE'`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP CONSTRAINT "PK_18325f38ae6de43878487eff986"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "user_ids"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "user_ids" integer array`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "ref_user_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "ref_user_id" integer`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "amount" double precision`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "content" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "content" text`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "amount" bigint`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "ref_user_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "ref_user_id" bigint`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "user_ids"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "user_ids" character varying array`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP CONSTRAINT "PK_18325f38ae6de43878487eff986"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "shaker_ids"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "commission_ids"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "mission_ids"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "sender_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" DROP COLUMN "campaign_id"`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "target_user_id" bigint`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "commission_from_ids" jsonb`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "commission" character varying array`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "banner_uri" text`);
        await queryRunner.query(`ALTER TABLE "migration"."messages" ADD "message_id" character varying NOT NULL`);
    }

}
