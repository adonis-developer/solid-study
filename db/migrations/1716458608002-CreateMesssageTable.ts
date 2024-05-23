import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMesssageTable1716458608002 implements MigrationInterface {
    name = 'CreateMesssageTable1716458608002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "migration"."messages" ("id" SERIAL NOT NULL, "message_id" character varying NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "banner_uri" text, "commission" character varying array, "commission_from_ids" jsonb, "user_ids" character varying array, "target_user_id" bigint, "ref_user_id" bigint, "amount" bigint, "content" text, "type_action" character varying NOT NULL DEFAULT 'NONE', CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "migration"."messages"`);
    }

}
