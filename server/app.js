var express = require("express")
var bodyParser = require("body-parser")
var fs = require("fs")
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", function(req, res){
  fs.writeFile(__dirname+"/public/"+req.body.name, req.body.content, function(err){
    res.send( err )
  })
})

app.listen(3041, function(){
  console.log("listenin' on 3041") 
})