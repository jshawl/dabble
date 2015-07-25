var request = require("request")
var fs = require("fs")
var host = "http://localhost:3041"

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
    if(err){
      console.log(err) 
    }else{
      console.log(JSON.parse(body).url)
    }
    process.exit()
  })
}

Dabble.prototype = {
  save: function(){
  }
}

module.exports = Dabble