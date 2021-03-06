var http = require('http');
var fs = require('fs');
var server = http.Server();
var url = require('url');
const jsdom = require("jsdom");
//const JSDOM = jsdom['JSDOM'];
const utils = require("./modules/utils");
const fixHeader = utils.fixHeader;



var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
server.listen(port, ip);
server.on('request', function(req,res){
    /*
    var urlParts = url.parse(req.url, true),
        urlParams = urlParts.query,
        urlPathname = urlParts.pathname;
    /**/
    var URI = decodeURI(req.url);
    //console.log(URI);
    if(URI!="/"){
        URI=URI.split('?')[0];
        //console.log(URI);
        fs.readFile("."+URI,function(err, html){
            if(err){
                res.statusCode = 404;
                res.end(URI);
                return;
            }
            //res.writeHeader(200, {"Content-Type": "text/html"});
            if(~URI.indexOf('.htm')&&URI.indexOf('treeview.html')!==1) {
                //*
                html = fixHeader(new jsdom.JSDOM(html)).serialize();
                res.writeHeader(200, {"Content-Type": "text/html; charset=UTF-8"});
                res.write(html);
                res.end();
                /**/
                /*
                JSDOM.fromFile("."+URI).then(function(dom) {
                    html = fixHeader(dom).serialize();
                    res.writeHeader(200, {"Content-Type": "text/html; charset=UTF-8"});
                    res.write(html);
                    res.end();
                    //console.log('promise then' + URI);
                });
                /**/
            }else {
                if(~URI.indexOf('.css'))
                    res.writeHeader(200, {"Content-Type": "text/css; charset=UTF-8"});
                if(~URI.indexOf('.js'))
                    res.writeHeader(200, {"Content-Type": "text/javascript; charset=UTF-8"});
                //if(~URI.indexOf('.htm'))
                //    res.writeHeader(200, {"Content-Type": "text/html"});
                res.write(html);
                res.end();
            }
        });
    }else{
        fs.readFile("./1cDocs.html",function(err, html){
            if(err){
                return;
            }
            //res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
});