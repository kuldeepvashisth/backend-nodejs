const http =require('http')
const fs=require('fs')
const server =http.createServer((req,res) => {
               
if(req.url.toLowerCase()==="/submit-details" && req.method=="POST"){
  fs.writeFileSync('user.txt',"kd vash")
  res.statusCode=302; //redirecting
  res.setHeader('Location','/');
  return res.end();
}

  
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>new page</title></head>');
    res.write('<body><h1>info page</h1>');
    res.write('<form action="/submit-details" method="POST">')
    res.write('<label for="name">enter name : </label>')
    res.write('<input type="text" id="name" name="username">')
    res.write('</br>')

    
    res.write('<label for="age">enter age </label>')
    res.write('<input type="number" id="age" name="age">')

    res.write('<input type="submit" value="submit">')

    res.write('</form>')
    res.write('</body>');

    res.write('</html>');
    res.end();


  });

const port=3001;
server.listen(port,()=>{
console.log("server listening");

});
