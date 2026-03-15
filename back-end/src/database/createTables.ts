import { pool } from "../config/db"

export const createTables = async () => {

  try {

    // 1️⃣ Enable UUID extension
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `)

    // 2️⃣ Create Schema
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS ackrock;
    `)

    // 3️⃣ Create ENUM for article status
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

    // 4️⃣ Roles Table
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

    // 5️⃣ Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ackrock.users (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role_id VARCHAR(36) REFERENCES ackrock.roles(id),
        status INTEGER DEFAULT 1,
        is_deleted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 6️⃣ Articles Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ackrock.articles (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id VARCHAR(36) REFERENCES ackrock.users(id),
        status ackrock.article_status DEFAULT 'draft',
        is_deleted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 7️⃣ Insert default roles
    await pool.query(`
      INSERT INTO ackrock.roles (role_name, status)
      VALUES ('Admin',1), ('Staff',1)
      ON CONFLICT (role_name) DO NOTHING;
    `)

    console.log("✅ Database tables created successfully")

  } catch (error) {

    console.error("❌ Database setup error:", error)

  }

}