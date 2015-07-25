var express = require("express")
var bodyParser = require("body-parser")
var fs = require("fs")
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(express.static('public'))

app.get("/", function(req, res){
  res.send("dabble!")
})

app.post("/", function(req, res){
  if(req.body.name.match(/\.html$/)){
    fs.writeFile(__dirname+"/public/"+req.body.name, req.body.content, function(err){
      res.json({
	status: "ok.",
	url: "http://" + req.headers.host + "/" + req.body.name,
	filename: req.body.name
      })
    })
  } else {
    res.json({
      status: "error.",
      message: "Only html dabbles are allowed."
    })
  }
})

app.listen(3041, function(){
  console.log("listenin' on 3041") 
})