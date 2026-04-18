const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionConfig = process.env.MYSQL_URL || {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'porto_web',
};

const pool = mysql.createPool(connectionConfig);

// Initialize database tables if they don't exist
async function initDB() {
  try {
    console.log('⏳ Connecting to MySQL and initializing tables...');
    
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS hero (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        tagline TEXT,
        cta_text VARCHAR(255) DEFAULT 'View My Work',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS about (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        instagram VARCHAR(100),
        location VARCHAR(255),
        photo_url TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        start_date VARCHAR(100) NOT NULL,
        end_date VARCHAR(100),
        description TEXT NOT NULL,
        tags TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100) DEFAULT 'Star',
        details TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        level INT NOT NULL,
        category VARCHAR(100) DEFAULT 'general',
        sort_order INT DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        value INT NOT NULL,
        suffix VARCHAR(20) DEFAULT '+',
        icon VARCHAR(100) DEFAULT 'TrendingUp',
        sort_order INT DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        field VARCHAR(255),
        start_date VARCHAR(100) NOT NULL,
        end_date VARCHAR(100),
        description TEXT,
        sort_order INT DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS organizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        start_date VARCHAR(100),
        end_date VARCHAR(100),
        description TEXT,
        bullets TEXT,
        sort_order INT DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(255) NOT NULL,
        answer TEXT NOT NULL,
        sort_order INT DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ MySQL Database and tables initialized.');
  } catch (error) {
    console.error('❌ Failed to initialize MySQL:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('   Please create the database manually first: CREATE DATABASE portfolio_db;');
    }
  }
}

// Attach initDB to the pool so it can be awaited in the seeder
pool.initDB = initDB;

module.exports = pool;
