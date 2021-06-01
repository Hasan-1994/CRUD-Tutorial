//express server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    datebase: 'CRUDDateBase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlSelect = 
    "SELECT * FROM cruddatebase.personaldata ";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post("/api/insert", (req, res)=>{

    const name = req.body.name;
    const surname = req.body.surname;

    const sqlInsert="INSERT INTO cruddatebase.personaldata (name, surname) VALUES (?,?)";
    db.query(sqlInsert, [name, surname], (err, result)=>{
        console.log(result)
    })
})

app.delete("/api/delete/:name", (req, res) =>{
    const name = req.params.name;

    const sqlDelete = "DELETE FROM cruddatebase.personaldata WHERE name  = ?";
    db.query(sqlDelete, name, (err, result)=>{
        if(err) console.log(err)
    })
})
app.put("/api/update/", (req, res) =>{
    const name = req.body.name;
 
    const sqlUpdate = "UPDATE  cruddatebase.personaldata SET  name = ? WHERE name = ?";
    db.query(sqlUpdate, name, (err, result)=>{
        if(err) console.log(err)
    })
})

app.listen(3001, () =>{
    console.log('Server läuft auf 3001')
});