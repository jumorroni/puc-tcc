// ===== Estado global / utilidades =====
require('dotenv').config()
const mysql = require('mysql');
const express = require('express')
const port = process.env.PORT || 3001
const app = express()

app.get('/', (re, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`start listening ${port}`)
})

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};

const connection = mysql.createConnection(config);

app.get('/data', (req, res) => {
    connection.query(
      "SELECT * FROM user", 
      (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    )
});