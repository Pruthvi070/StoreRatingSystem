const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'storeratingdb',
    port: 3306
});

async function setupAdmin() {
    try {
        // First check if users table exists
        const [tables] = await connection.promise().query("SHOW TABLES LIKE 'users'");
        if (tables.length === 0) {
            console.log("❌ Users table does not exist. Please run the server first to create tables.");
            return;
        }

        // Check if admin exists
        const [existingAdmin] = await connection.promise().query(
            "SELECT * FROM users WHERE email = ?",
            ["admin@admin.com"]
        );

        if (existingAdmin.length > 0) {
            console.log("✅ Admin user already exists!");
            console.log("Email: admin@admin.com");
            console.log("Password: admin123");
        } else {
            // Create admin user
            const adminPassword = "admin123";
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            const sql = `INSERT INTO users (id, name, email, password, role, address) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [
                "admin1",
                "Administrator Account System User",
                "admin@admin.com",
                hashedPassword,
                "admin",
                "Administrator Office Address, Main Street, City"
            ];

            await connection.promise().query(sql, values);
            console.log("✅ Admin user created successfully!");
            console.log("Email: admin@admin.com");
            console.log("Password: admin123");
        }

        // Create store owner
        const [existingOwner] = await connection.promise().query(
            "SELECT * FROM users WHERE email = ?",
            ["rajesh.kumar@owner.com"]
        );

        if (existingOwner.length > 0) {
            console.log("✅ Store owner already exists!");
            console.log("Email: rajesh.kumar@owner.com");
            console.log("Password: owner123");
        } else {
            const ownerPassword = "owner123";
            const hashedOwnerPassword = await bcrypt.hash(ownerPassword, 10);

            const ownerSql = `INSERT INTO users (id, name, email, password, role, address) VALUES (?, ?, ?, ?, ?, ?)`;
            const ownerValues = [
                "sto123",
                "Rajesh Kumar Store Owner",
                "rajesh.kumar@owner.com",
                hashedOwnerPassword,
                "store_owner",
                "123 Main Street, Business District, City"
            ];

            await connection.promise().query(ownerSql, ownerValues);
            console.log("✅ Store owner created successfully!");
            console.log("Email: rajesh.kumar@owner.com");
            console.log("Password: owner123");
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
        if (error.code === 'ER_NO_SUCH_TABLE') {
            console.log("Please run the server first to create the database tables.");
        }
    } finally {
        connection.end();
    }
}

setupAdmin(); 