const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createPool({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b39a40423d1646",
    password: "b842a8cc",
    database: "heroku_8c92a54ebfd06ea"
})

const port = process.env.PORT || 5000;

require('dotenv').config();

app.listen(port, () => {
    console.log("running on port 5000")
})

// middlewares that are a must 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// and all other crud operations if needed 

app.get('/api/get-channel/UC7hxIHncBbcHKUxGM67KZ4g', (req, res) => {

    const sqlGetHeartSoftners = "SELECT * FROM al_amaan_channel";

    db.query(sqlGetHeartSoftners, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-channel/UC8DILJwxM8wNTz6XDo2ZbNw', (req, res) => {

    const sqlGetKnowledge = "SELECT * FROM islamic_university_english_channel";

    db.query(sqlGetKnowledge, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-channel/UCPZvLwo3dIUoRMGSRPGWY3A', (req, res) => {

    const sqlGetQuran = "SELECT * FROM quran_visualization_channel";

    db.query(sqlGetQuran, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-channel/UCpOuNtadjyviGvy7p4Va5tA', (req, res) => {

    const sqlGetShykJamel = "SELECT * FROM shyk_jamel_channel";

    db.query(sqlGetShykJamel, (err, result) => {
        res.send(result)
    })
})


app.post('/api/bulk-post', (req, res) => {
    const data = [...req.body];

    const sqlInsert = "INSERT INTO shyk_jamel_channel (video_id, video_title, video_description, posted_at) VALUES ?";
    db.query(sqlInsert, [data], (err, results) => {
        if(err){
            console.log(err);

          } else {
            return res.status(200).json({"status": 200,"err": null,"response": results});
          }
    })
})

// app.post('/api/post-user-and-content', (req, res) => {
//     const data = [...req.body];

//     const sqlInsert = "INSERT INTO quran_visualization_channel (video_id, video_title, video_description, posted_at) VALUES ?";
//     db.query(sqlInsert, [data], (err, results) => {
//         if(err){
//             console.log(err);

//           } else {
//             return res.status(200).json({"status": 200,"err": null,"response": results});
//           }
//     })
// })

