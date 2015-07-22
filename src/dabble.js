var fs = require("fs")
module.exports = function(){
  console.log("Dabblin!")
  console.log(process.cwd())
  var time = (new Date).getTime()
  var toFile = process.cwd() + "/dabble-" + time + ".html"
  fs.createReadStream(__dirname + "/dabble.html").pipe(fs.createWriteStream(toFile))
}