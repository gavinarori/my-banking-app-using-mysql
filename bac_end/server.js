const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"Login"
})

app.post('/createUser',(req,res) =>
{
    const sql = "INSERT INTO createUser (`name`,`password`,`idNumber`,`deposit`,`branchCode`,`Number`,) VALUES(?)";
    const values = [
        req.body.name,
        req.body.password,
        req.body.idNumber,
        req.body.deposit,
        req.body.branchCode,
        req.body.Number
    ]
    db.query(sql,[values],(err,data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/Login',(req,res) =>
{
    const sql = "SELECT * FROM login WHERE `name` = ? AND `password` = ?"; 
    db.query(sql,[req.body.name,req.body.password,],(err,data) =>{
        if(err){
            return res.json("Error");
        }
        if (data.length > 0 ){
            return res.json('success')
        } else{
            return res.json('failed')
        }
    })
})


// Transfer money route
app.post('/transfer', (req, res) => {
    const { senderId, receiverId, amount } = req.body;
  
    // Check if sender has sufficient balance
    pool.query('SELECT balance FROM users WHERE id = ?', [senderId], (error, results) => {
      if (error) {
        console.error('Error retrieving sender balance:', error);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      const senderBalance = results[0].balance;
      if (senderBalance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      // Start a MySQL transaction
      pool.getConnection((error, connection) => {
        if (error) {
          console.error('Error establishing database connection:', error);
          return res.status(500).json({ error: 'An error occurred' });
        }
  
        connection.beginTransaction((error) => {
          if (error) {
            console.error('Error beginning transaction:', error);
            connection.release();
            return res.status(500).json({ error: 'An error occurred' });
          }
  
          // Deduct amount from sender's balance
          connection.query('UPDATE users SET balance = balance - ? WHERE id = ?', [amount, senderId], (error) => {
            if (error) {
              console.error('Error deducting amount from sender balance:', error);
              connection.rollback();
              connection.release();
              return res.status(500).json({ error: 'An error occurred' });
            }
  
            // Update receiver's balance
            connection.query('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, receiverId], (error) => {
              if (error) {
                console.error('Error updating receiver balance:', error);
                connection.rollback();
                connection.release();
                return res.status(500).json({ error: 'An error occurred' });
              }
  
              // Commit the transaction
              connection.commit((error) => {
                if (error) {
                  console.error('Error committing transaction:', error);
                  connection.rollback();
                  connection.release();
                  return res.status(500).json({ error: 'An error occurred' });
                }
  
                // Release the connection and send success response
                connection.release();
                return res.json({ message: 'Money transferred successfully' });
              });
            });
          });
        });
      });
    });
  });


  // Get all transactions route
app.get('/transactions', (req, res) => {
    // Retrieve all transactions from the database
    pool.query('SELECT * FROM transactions', (error, results) => {
      if (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      // Send the transactions as a response
      return res.json(results);
    });
  });

app.listen(8081,()=>
{
    console.log('listening')
})