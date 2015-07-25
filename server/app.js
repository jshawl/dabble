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
  var pathTo = __dirname + "/public/" 
  if(file.match(/-v[0-9]+\.html$/)){
    var num = parseInt(file.match(/-v([0-9]+)\.html$/)[1])
    var name = file.replace(/[0-9]+\.html$/, ++num + ".html")
  } else {
    var name = file.replace(".html","-v1.html")
  }
  if(fs.existsSync(pathTo + name)){
    return version( name )
  }
  return name
}

app.post("/", function(req, res){
  var pathTo = __dirname + "/public/" 
  var file = req.body.name
  if(file.match(/\.html$/)){
    if(fs.existsSync(pathTo + file)){
      file = version(file)
    }
    fs.writeFile(pathTo + file, req.body.content, function(err){
      res.json({
	status: "ok.",
	url: "http://" + req.headers.host + "/" + file,
	filename: file
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