var request = require("request")
var fs = require("fs")
var host = "http://dabble.site/" //"http://localhost:3041" 
var open = require("open")

var Dabble = function(){
    this.time = (new Date).getTime()
    this.filename = this.time + ".html"
    this.toFile = process.cwd() +"/"+ this.filename
    console.log(this.toFile)
    fs.createReadStream(__dirname + "/index.html").pipe(fs.createWriteStream(this.toFile))
    var editor = require('child_process').spawn(process.env.EDITOR, [this.toFile], {stdio: 'inherit'})
    editor.on('exit', function(arg){
      console.log("Save dabble with:")
      console.log("    dabble -s "+this.filename)
    }.bind(this))
}

Dabble.save = function(file){
  var contents = fs.readFileSync(file,"utf8")
  request.post(host, { 
    form:{
      name: file,
      content: contents
    } 
  }, function( err, res, body ){
    var dab = JSON.parse(body)
    if(dab.status == "error."){
      console.log(dab.message) 
    }else{
      console.log("New dabble created!")
      console.log(dab.url)
    }
    process.exit()
  })
}

Dabble.open = function(file){
  console.log(file)
  open(host + file)
}

module.exports = Dabble