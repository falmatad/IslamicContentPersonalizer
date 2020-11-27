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

// app.get('/api/get', (req, res) => {

//     const sqlGetHeartSoftners = "SELECT * FROM contact_form";

//     db.query(sqlInsert, (err, result) => {
//         res.send(result)
//     })
// })

app.post('/api/bulk-post', (req, res) => {
    const data = [...req.body];

    const sqlInsert = "INSERT INTO quran_visualization_channel (video_id, video_title, video_description, posted_at) VALUES ?";
    db.query(sqlInsert, [data], (err, results) => {
        if(err){
            console.log(err);

          } else {
            return res.status(200).json({"status": 200,"err": null,"response": results});
          }
    })
})

