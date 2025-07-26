require("dotenv").config();
var sql = require("mssql");
var bcrypt = require("bcrypt");
var express = require("express");
var jwt = require("jsonwebtoken");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var port = process.env.PORT || 3000;

var config = {
  user: "AlexDev",
  password: "Barcelona101",
  server: "localhost",
  database: "Horticulture",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

var pool = null;

sql
  .connect(config)
  .then(function (p) {
    pool = p;
    console.log("Connected to database", config.database);

    // Start the server only after connection is ready
    app.listen(port, function () {
      console.log("Server running on port " + port);
    });
  })
  .catch(function (error) {
    console.log("Couldn't connect to database", error);
  });

function authenticateToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, user) {
    if (error) {
      return res.status(403).send();
    }
    req.user = user;
    next();
  });
}

function generateToken(id, email) {
  return jwt.sign({ id: id, email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

app.post("/userRegistration", function (req, res) {
  var firstname = req.body.firstname;
  var secondname = req.body.secondname;
  var email = req.body.email;
  var password = req.body.password;

  if (
    !password ||
    typeof password !== "string" ||
    password.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Error: please enter a valid password" });
  }

  if (!pool) {
    console.log("Database connection pool not available");
    return res.status(500).send("Database connection not available");
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.log("Error salting password", err);
      return res.status(500).send("Error salting password");
    }

    bcrypt.hash(password, salt, function (err, hashed) {
      if (err) {
        console.log("Error hashing password", err);
        return res.status(500).send("Error hashing password");
      }
      console.log("Inserting user:", {
        firstname: firstname,
        secondname: secondname,
        email: email,
        hashedPassword: hashed,
      });
      pool
        .request()
        .input("Firstname", sql.NVarChar, firstname)
        .input("Secondname", sql.NVarChar, secondname)
        .input("Email", sql.NVarChar, email)
        .input("Password", sql.NVarChar, hashed)
        .query(
          "INSERT INTO USERS (Firstname, Secondname, Email, Password) VALUES (@Firstname, @Secondname, @Email, @Password)"
        )
        .then(function () {
          console.log("Insert query executed successfully");
          return pool
            .request()
            .input("Email", sql.NVarChar, email)
            .query("SELECT ID FROM USERS WHERE Email = @Email");
        })
        .then(function (result) {
          if (!result.recordset || result.recordset.length === 0) {
            return res
              .status(500)
              .send("Error: could not retrieve user after registration");
          }

          var id = result.recordset[0].ID;
          var token = generateToken(id, email);

          res.status(201).json({
            message: "User has been registered successfully",
            accessToken: token,
          });
        })
        .catch(function (error) {
          console.log("Error during registration", error);
          res.status(500).send("Error registering user: " + error.message);
        });
    });
  });
});

app.post("/login", function (req, res) {
  sql
    .connect(config)
    .then(function (pool) {
      return pool
        .request()
        .input("email", sql.NVarChar, req.body.email)
        .query("SELECT * FROM USERS WHERE Email = @Email");
    })
    .then(function (result) {
      const user = result.recordset[0];
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const id = user.ID;
      const hashed = user.Password;

      bcrypt.compare(req.body.password, hashed, function (error, isMatch) {
        if (error) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }
        if (isMatch) {
          const token = generateToken({ id, email: req.body.email });
          return res.status(201).json({
            message: "User has logged in successfully",
            accessToken: token,
          });
        } else {
          return res.status(401).send({ message: "Incorrect password" });
        }
      });
    })
    .catch(function (error) {
      return res.status(500).send("Error logging in", error);
    });
});

app.post("/find-user", authenticateToken, function (req, res) {
  const firstname = req.body.firstname;
  const password = req.body.password;

  sql
    .connect(config)
    .then(function (pool) {
      return pool
        .request()
        .input("Firstname", sql.NVarChar, firstname)
        .query("SELECT * FROM USERS WHERE Firstname = @Firstname");
    })
    .then(function (result) {
      if (result.recordset.length === 0) {
        return res.status(401).send("User not found");
      }

      const user = result.recordset[0];
      const hashed = user.Password;

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, hashed, function (err, isMatch) {
        if (err) {
          return res.status(500).send("Error comparing passwords");
        }

        if (isMatch) {
          res.status(200).send("User has been found");
        } else {
          res.status(401).send("Invalid password");
        }
      });
    })
    .catch(function (error) {
      res.status(500).send("Database error: " + error.message);
    });
});

app.put("/change-user-details", authenticateToken, function (req, res) {
  const firstname = req.body.firstname;
  const password = req.body.password;
  const secondname = req.body.secondname;
  const email = req.body.email;
  const id = req.body.ID;
  let conn;

  sql
    .connect(config)
    .then(function (pool) {
      conn = pool;
      return conn
        .request()
        .input("id", sql.Int, id)
        .query("SELECT Password FROM USERS WHERE id = @id");
    })
    .then(function (result) {
      if (result.recordset.length === 0) {
        return res.status(401).send("User not found");
      }

      const user = result.recordset[0];
      const hashed = user.Password;

      bcrypt.compare(password, hashed, function (err, isMatch) {
        if (err) {
          return res.status(500).send("Error comparing passwords");
        }

        if (isMatch) {
          conn
            .request()
            .input("firstname", sql.NVarChar, firstname)
            .input("secondname", sql.NVarChar, secondname)
            .input("email", sql.NVarChar, email)
            .input("id", sql.Int, id)
            .query(
              "UPDATE USERS SET firstname = @firstname, secondname = @secondname, email = @email WHERE id = @id"
            )
            .then(function (updateResult) {
              res.status(200).send("User has been updated");
            })
            .catch(function (error) {
              res.status(500).send("User update failed: " + error.message);
            });
        } else {
          return res.status(401).send("Invalid password");
        }
      });
    })
    .catch(function (error) {
      res.status(500).send("Database error: " + error.message);
    });
});

app.delete("/delete-user", authenticateToken, async function (req, res) {
  const email = req.body.email;
  const id = req.body.ID;

  try {
    const conn = await sql.connect(config);

    const result = await conn
      .request()
      .input("email", sql.NVarChar, email)
      .input("id", sql.Int, id)
      .query("SELECT * FROM USERS WHERE email = @email AND id = @id");

    if (result.recordset.length === 0) {
      return res.status(401).send("Error, no users found");
    }

    await conn
      .request()
      .input("email", sql.NVarChar, email)
      .input("id", sql.Int, id)
      .query("DELETE FROM USERS WHERE email = @email AND id = @id");

    return res.send("User has been deleted");
  } catch (error) {
    // Send only if headers have not already been sent
    if (!res.headersSent) {
      res.status(500).send("Error: " + error.message);
    } else {
      console.error("Unhandled error after response sent:", error);
    }
  }
});

app.post("/forgot-password", authenticateToken, function (req, res) {
  const email = req.body.email;
  const id = req.body.id;
  const newPassword = req.body.newPassword;

  let conn;

  sql
    .connect(config)
    .then(function (pool) {
      conn = pool;
      return conn
        .request()
        .input("email", sql.NVarChar, email)
        .input("id", sql.Int, id)
        .query("SELECT * FROM USERS WHERE email = @email AND id = @id");
    })
    .then(function (foundUser) {
      if (!foundUser.recordset || foundUser.recordset.length === 0) {
        return res.status(401).send("Couldn't find user");
      }

      return bcrypt.hash(newPassword, 10);
    })
    .then(function (hashedPassword) {
      return conn
        .request()
        .input("email", sql.NVarChar, email)
        .input("id", sql.Int, id)
        .input("newPassword", sql.NVarChar, hashedPassword)
        .query(
          "UPDATE USERS SET password = @newPassword WHERE email = @email AND id = @id"
        );
    })
    .then(function (updateResult) {
      res.status(200).send("Password has been updated");
    })
    .catch(function (error) {
      res.status(500).send("Unable to update password: " + error.message);
    });
});

app.listen(3000, function () {
  console.log("Server started on http://localhost:3000");
});
