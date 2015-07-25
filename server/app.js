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

function version( file ){
  if(file.match(/-v[0-9]+\.html$/)){
    var num = parseInt(file.match(/-v([0-9]+)\.html$/)[1])
    var name = file.replace(/[0-9]+\.html$/, ++num + ".html")
  } else {
    var name = file.replace(".html","-v1.html")
  }
  if(fs.fileExistsSync(name)){
    version( name )
  }
  return name
}

app.post("/", function(req, res){
  var toFile = __dirname + "/public/" + req.body.name
  if(req.body.name.match(/\.html$/)){
    if(fs.fileExistsSync(toFile)){
      toFile = version(toFile)
    }
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