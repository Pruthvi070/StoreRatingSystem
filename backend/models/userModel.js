// const db = require('../config/db');

// const User = {
//     create: (userData, callback) => {
//         const sql = 'INSERT INTO users (id, name, email, password, address, role) VALUES (?, ?, ?, ?, ?, ?)';
//         db.query(sql, userData, callback);
//     },
//     findByEmail: (email, callback) => {
//         db.query('SELECT * FROM users WHERE email = ?', [email], callback);
//     },
//     getAllUsers: (callback) => {
//         db.query('SELECT id, name, email, role FROM users', callback);
//     }
// };

// module.exports = User;


//v1
const db = require("../config/db");

const User = {
    create: async (id, name, email, password, address, role) => {
        return db.promise().query(
            "INSERT INTO users (id, name, email, password, address, role) VALUES (?, ?, ?, ?, ?, ?)",
            [id, name, email, password, address, role]
        );
    },

    findByEmail: async (email) => {
        const [user] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        return user.length ? user[0] : null;
    },

    findById: async (id) => {
        const [user] = await db.promise().query("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
        return user.length ? user[0] : null;
    }
};

module.exports = User;
