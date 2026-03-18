const { faker }  = require("@faker-js/faker");
const mysql      = require("mysql2");
const express    = require("express");
const app        = express();
const path    = require("path");   // ← built-in Node module, install nahi karna
const methodOverride = require("method-override");

// Middleware setup
app.use(methodOverride("_method"));                     // PATCH/PUT/DELETE forms se
app.use(express.urlencoded({ extended: true }));       // form data parse karo

// EJS ko view engine set karo
app.set("view engine", "ejs");

// Views folder ka path set karo
app.set("views", path.join(__dirname, "/views"));
// MySQL Connection
const connection = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  database: "alpha_app",
  password: "123454321",
});

// Faker helper function
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

//Home Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM users`; // users table me kitne records hain, wo count karo

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let count = result[0]["count(*)"];  // 103
      
      // res.send() hatao — ab res.render() use karo
      res.render("home.ejs", { count }); 
      //          ↑ file name   ↑ data object jo EJS ko bhejte hain
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

//Show Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM users`;   // sabhi users fetch karo
  try {
    connection.query(q, (err, users) => {
      //                       ↑
      //           result ki jagah 'users' likha — zyada readable
      if (err) throw err;
      res.render("showusers.ejs", { users });
      //                            ↑
      //               poora users array EJS ko bhejo
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }

});

//Edit Route
app.get("/user/:id/edit", (req, res) => {

  let { id } = req.params;           // URL se id nikalo
  let q = `SELECT * FROM users WHERE id='${id}'`;  // us user ko fetch karo

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];           // pehla (aur ek hi) object
      res.render("edit.ejs", { user }); // user data form mein bhejo
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }

});

//UPDATE (DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  // Form se data nikalo
  let { password: formPass, username: newUsername } = req.body;
  // Pehle us user ko fetch karo — password verify karna hai
  let q = `SELECT * FROM users WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];  // DB mein stored user
      // Password match karo
      if (formPass != user.password) {
        res.send("WRONG password");   // galat password

      } else {
        // Sahi password — username update karo
        let q2 = `UPDATE users SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");   // update ke baad /user page par bhejo
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

app.listen("8080", () => {
  console.log("server is listening to port 8080");
});



 