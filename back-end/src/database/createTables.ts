import { pool } from "../config/db"

export const createTables = async () => {

  try {



    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `)




    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS ackrock;
    `)




    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_namespace n ON n.oid = t.typnamespace
          WHERE t.typname = 'article_status'
          AND n.nspname = 'ackrock'
        ) THEN
          CREATE TYPE ackrock.article_status AS ENUM (
            'draft',
            'published',
            'archived'
          );
        END IF;
      END
      $$;
    `)




    // Roles Table
    await pool.query(`
  CREATE TABLE IF NOT EXISTS ackrock.roles (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  status INTEGER DEFAULT 1,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `)

    // Add permission columns if table already existed
    await pool.query(`
ALTER TABLE ackrock.roles
ADD COLUMN IF NOT EXISTS can_view BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS can_create BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS can_update BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS can_delete BOOLEAN DEFAULT FALSE;
`)

    // Insert default roles
    await pool.query(`
INSERT INTO ackrock.roles
(role_name, can_view, can_create, can_update, can_delete, status)
VALUES
('Admin', TRUE, TRUE, TRUE, TRUE, 1),
('Staff', TRUE, TRUE, FALSE, FALSE, 1)
ON CONFLICT (role_name) DO NOTHING;
`)




    await pool.query(`
      CREATE TABLE IF NOT EXISTS ackrock.users (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,

        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,

        role_id VARCHAR(36)
        REFERENCES ackrock.roles(id)
        ON DELETE SET NULL,

        status INTEGER DEFAULT 1,
        is_deleted BOOLEAN DEFAULT FALSE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)




    await pool.query(`
      CREATE TABLE IF NOT EXISTS ackrock.categories (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,

        name VARCHAR(120) UNIQUE NOT NULL,
        description TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)



    await pool.query(`
      CREATE TABLE IF NOT EXISTS ackrock.articles (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,

        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,

        author_id VARCHAR(36)
        REFERENCES ackrock.users(id)
        ON DELETE SET NULL,

        category_id VARCHAR(36)
        REFERENCES ackrock.categories(id)
        ON DELETE SET NULL,

        status ackrock.article_status DEFAULT 'draft',

        is_deleted BOOLEAN DEFAULT FALSE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)




    await pool.query(`
      CREATE TABLE IF NOT EXISTS ackrock.article_reviews (

        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,

        article_id VARCHAR(36)
        REFERENCES ackrock.articles(id)
        ON DELETE CASCADE,

        author_id VARCHAR(36)
        REFERENCES ackrock.users(id)
        ON DELETE CASCADE,

        rating INTEGER CHECK (rating BETWEEN 1 AND 5),

        review TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)




    await pool.query(`
      INSERT INTO ackrock.roles 
      (role_name, can_view, can_create, can_update, can_delete, status)

      VALUES
      ('Admin', TRUE, TRUE, TRUE, TRUE, 1),
      ('Staff', TRUE, TRUE, FALSE, FALSE, 1)

      ON CONFLICT (role_name) DO NOTHING;
    `)


    console.log("Database tables created successfully")

  } catch (error) {

    console.error("❌ Database setup error:", error)

  }
}