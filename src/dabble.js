var fs = require("fs")
module.exports = function(){
  console.log("Dabblin!")
  console.log(process.cwd())
  var time = (new Date).getTime()
  var toFile = process.cwd() + "/dabble-" + time + ".html"
  fs.createReadStream(__dirname + "/index.html").pipe(fs.createWriteStream(toFile))
  var editor = require('child_process').spawn(process.env.EDITOR, [toFile], {stdio: 'inherit'})
  editor.on('exit', process.exit)
}