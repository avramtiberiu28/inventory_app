const express = require('express');
const db = require('./config/dbconnect.js')
const cors = require('cors')

const app = express();
const jwt = require('jsonwebtoken');


const  PORT = 3002;
app.use(cors());
app.use(express.json())

app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        let sql_query = `SELECT * FROM users WHERE nr_tableta='${username}' AND password=MD5('${password}')`;
        console.log(sql_query);
        // Verifică în baza de date dacă există un utilizator cu aceste credențiale
        db.query(sql_query, (err, result) => {
            if(err) {
                console.log(err)
            } 
            console.log(result);
            if (result.length !== 0) {
                // Dacă există un utilizator cu aceste credențiale, generăm un token JWT
                const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
                const nr_tableta = username
  
                // Returnează token-ul în răspuns
                res.json({ token, nr_tableta});
            }
            else {
                res.status(401).json({ error: 'Credențiale invalide' });
            }
            //res.send(result)
        });
    } 
    catch (error) {
        console.error('Eroare la cerere:', error);
        res.status(500).json({ error: 'A apărut o eroare la autentificare. Vă rugăm să încercați din nou.' });
    }
});


app.get("/aduArticoleScanate/:nr_tableta", (req, res) => {
    const nr_tableta = req.params.nr_tableta;
    console.log(nr_tableta)
    let sql_query = `SELECT * FROM inventar WHERE nr_tableta = ${nr_tableta} ORDER BY nr_crt DESC`;
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})
  /*app.post("/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let sql_query = `SELECT * FROM users WHERE username='${username}' AND password=MD5('${password}')`;
    db.query(sql_query, (err,result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});*/

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})







