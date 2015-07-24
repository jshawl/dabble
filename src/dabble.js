var request = require("request")
var fs = require("fs")

var Dabble = function(){
    this.time = (new Date).getTime()
    this.toFile = process.cwd() + "/dabble-" + this.time + ".html"
    fs.createReadStream(__dirname + "/index.html").pipe(fs.createWriteStream(this.toFile))
    var editor = require('child_process').spawn(process.env.EDITOR, [this.toFile], {stdio: 'inherit'})
    editor.on('exit', function(arg){
      console.log("Publish dabble with:")
      console.log("    dabble publish dabble-"+this.time+".html")
    }.bind(this))
}

Dabble.prototype = {
  save: function(){
    var file = fs.readFileSync(this.toFile,"utf8")
    var time = this.time
    request.post("http://dabble.site/", { 
      form:{
	name: time + ".html",
	content: file
      } 
    }, function( err, res, body ){
      console.log("http://dabble.site/" + time + ".html")
      process.exit()
    })
  }
}

module.exports = Dabble