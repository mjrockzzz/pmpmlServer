const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
app.use(cors())
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pmpmldb'
})

app.get('/getRouteDetails', (req, res) => {
    var route_no = req.query.route
    connection.query('Select * from pmp_routes where route_no = " '+route_no+' "', function(err, rows, fields){
        if(err) throw err
        else {
            res.send(rows);
        }
    })
})

app.get('/getFromToRoutes', (req, res) => {
    var from = req.query.from
    var to = req.query.to
    connection.query('Select * from pmp_routes where stop_details like "%'+from+'%'+to+'%"', function(err, rows, fields){
        if(err) throw err
        else {
            res.send(rows);
        }
    })
})

app.get('/getRoutesAtStop', (req, res) => {
    var stop = req.query.stop
    connection.query('Select * from pmp_routes where stop_details like "%'+stop+'%"', function(err, rows, fields){
        if(err) throw err
        else {
            res.send(rows);
        }
    })
})

app.get('/getRoutesList', (req, res) => {
    connection.query('Select distinct route_no from pmp_routes order by route_no asc', function(err, rows, fields){
        if(err) throw err
        else {
            var resData = [];
            rows.forEach(data => {
                resData.push(data.route_no)
            })
            res.send(resData);
        }
    })
})

app.get('/getStopList', (req, res) => {
    connection.query('Select stop_name, latitude, longitude from pmp_stops order by stop_name asc', function(err, rows, fields){
        if(err) throw err
        else {
            var resData = [];
            rows.forEach(data => {
                resData.push(data.stop_name)
            })
            res.send(rows);
        }
    })
})

app.listen(8000)