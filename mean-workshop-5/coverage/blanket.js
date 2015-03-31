var path = require('path');
var srcDir = path.join(__dirname,'..','test/server/');

require('blanket')({
        pattern : srcDir
});
