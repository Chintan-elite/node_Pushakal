const { log } = require("console");
const os = require("os")

console.log(os.arch());
console.log(os.homedir());
console.log(os.platform());
console.log(os.hostname());
console.log(os.totalmem()/1024/1024/1024);
console.log(os.freemem()/1024/1024/1024);
const path = require("path")
console.log(__dirname);
console.log("heloo");
console.log("testing");



