var request = require("request")
var fs = require("fs")
module.exports = function(){
  var time = (new Date).getTime()
  var toFile = process.cwd() + "/dabble-" + time + ".html"
  fs.createReadStream(__dirname + "/index.html").pipe(fs.createWriteStream(toFile))
  var editor = require('child_process').spawn(process.env.EDITOR, [toFile], {stdio: 'inherit'})
  editor.on('exit', function(arg){
    var file = fs.readFileSync(toFile,"utf8")
    request.post("http://localhost:3041/", { 
      form:{
        name: time + ".html",
        content: file
      } 
    }, function( err, res, body ){
      console.log("http://localhost:3041/" + time + ".html")
      process.exit()
    })
  })
}