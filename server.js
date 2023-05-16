const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Learning'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.render('index', { employee: result });
  });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { name, dob, age, designation } = req.body;
  const sql = 'INSERT INTO employee SET ?';
  db.query(sql, { name, dob, age, designation }, (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
   // res.sendFile(views + '/add.html');
  });
});

app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM employee WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    res.render('edit', { emp: result[0] });
  });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, dob, age, designation } = req.body;
  const sql = 'UPDATE employee SET name = ?, dob = ?, age = ?, designation = ? WHERE id = ?';
  db.query(sql, [name, dob, age, designation, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employee WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

app.listen(9094, () => {
  console.log('Server started on port 9094');
});
