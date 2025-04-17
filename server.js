const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Manutd101',
    database: 'horticulture'
});

db.connect(function(err) {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/', function(req, res) {
    res.redirect('/signup');
});


app.post('/signup', function(req, res) {
    const { username, password } = req.body;

    
    const checkUserSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserSql, [username], function(err, results) {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }

        if (results.length > 0) {
            return res.status(400).send("Username already taken");
        }

        
        bcrypt.hash(password, 10, function(err, hashedPassword) {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Server error");
            }

            const insertSql = "INSERT INTO users (username, password) VALUES (?, ?)";
            db.query(insertSql, [username, hashedPassword], function(err, result) {
                if (err) {
                    console.error("Database insert error:", err);
                    return res.status(500).send("Database error");
                }

                res.send("User registered successfully!");
            });
        });
    });
});
// ===== LOGIN Route =====
app.post('/login', function(req, res) {
    const { username, password } = req.body;

    const loginSql = "SELECT * FROM users WHERE username = ?";
    db.query(loginSql, [username], function(err, results) {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid username or password");
        }

        const storedHashedPassword = results[0].password;

        bcrypt.compare(password, storedHashedPassword, function(err, isMatch) {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Server error");
            }

            if (isMatch) {
                res.send("Login successful!");
            } else {
                res.status(401).send("Invalid username or password");
            }
        });
    });
});