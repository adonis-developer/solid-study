import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1716446923756 implements MigrationInterface {
    name = 'NewMigrations1716446923756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "migration"."users" ("id" SERIAL NOT NULL, "message_id" character varying NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "banner_uri" text, "commission" character varying array, "user_ids" character varying array, "target_user_id" bigint, "ref_user_id" bigint, "amount" bigint, "content" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "migration"."users"`);
    }

}
