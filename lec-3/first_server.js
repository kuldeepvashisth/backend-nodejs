const http =require('http')

const server =http.createServer((req,res) => {
    console.log(req);
    console.log("server created");
    console.log(req.url,req.method,req.headers);
    if(req.url === '/'){
      res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>new page</title></head>');
    res.write('<body><h1>home page</h1></body>');
    res.write('</html>');
  return  res.end();


    }
    else if(req.url === '/testing'){
      res.setHeader('Content-Type',"text/plain")
            res.write("testing pagE")
          return res.end();
}

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>new page</title></head>');
    res.write('<body><h1>last page</h1></body>');
    res.write('</html>');
    res.end();
});
const port=3001;
server.listen(port,()=>{
console.log("server listening");

});
