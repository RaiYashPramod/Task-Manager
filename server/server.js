const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();


app.use(cors());
app.use(bodyParser.json())

app.get('/tasks', (req, res) => {
    let sql = "SELECT * FROM todo.tasks";
    db.query(sql, (err, response) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(response);
        }
    })
});

app.post('/addtask', (req, res) => {
    console.log(req.body);
    let sql = `INSERT INTO todo.tasks (task) values ('${req.body.task}')`
    db.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('task has been added');
        }
    })
});

app.delete('/deletetask/:taskid', (req, res) => {
    let sql = `DELETE FROM todo.tasks where (taskid = ${req.params.taskid})`
    db.query(sql, (err, res) => {
        if(err) console.log(err);
    })
});

app.listen(4000, () => {
    console.log('Server is up and running on 4000');
});