import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntity1716876352759 implements MigrationInterface {
    name = 'InitEntity1716876352759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "migration"."users" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "user_name" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "day_data_user_idx" ON "migration"."users" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "migration"."messages" ("id" SERIAL NOT NULL, "message_id" character varying NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "banner_uri" text, "commission" character varying array, "commission_from_ids" jsonb, "user_ids" character varying array, "target_user_id" bigint, "ref_user_id" bigint, "amount" bigint, "content" text, "type_action" character varying NOT NULL DEFAULT 'NONE', CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "migration"."messages"`);
        await queryRunner.query(`DROP INDEX "migration"."day_data_user_idx"`);
        await queryRunner.query(`DROP TABLE "migration"."users"`);
    }

}
