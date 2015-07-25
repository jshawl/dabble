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

Dabble.save = function(file){
  var contents = fs.readFileSync(file,"utf8")
  request.post("http://dabble.site/", { 
    form:{
      name: file,
      content: contents
    } 
  }, function( err, res, body ){
    console.log("http://dabble.site/" + file)
    process.exit()
  })
}

Dabble.prototype = {
  save: function(){
  }
}

module.exports = Dabble