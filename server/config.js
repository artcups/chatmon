var fs = require("fs"),
    jsmin = require('jsmin').jsmin;

var config = (function(){
    parseConfig = function(path) {
      return JSON.parse(jsmin(fs.readFileSync(path).toString()));
    }
    return {
        server: (function() {
            var path = "./configs/server.json";
            return parseConfig(path)
        })()
    }
})()

exports.config = config;