-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(50),
    "year_of_birth" VARCHAR(50),
    "relationship_status" VARCHAR(50),
    "bvn" VARCHAR(50),
    "password" VARCHAR(1050) NOT NULL,
    "pin" VARCHAR(1050),
    "user_type" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),
    "last_login" VARCHAR(50),
    "modified" VARCHAR(500),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.phone_number_unique" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
