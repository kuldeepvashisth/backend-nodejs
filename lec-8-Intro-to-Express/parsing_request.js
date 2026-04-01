const fs=require('fs');

const requesthandler=((req,res) => {
          console.log(req.method);
          
if(req.url.toLowerCase()==="/submit-details" && req.method=="POST"){
  const body=[];
  req.on('data',((chunk) => {
    console.log(chunk);
    body.push(chunk); //body mI Hr ek chunk ko push krte jao
  }))
  req.on('end',()=>{
    //concat all chunks of body to one and convert to string 
    const finalres=Buffer.concat(body).toString();
    console.log(finalres);
    const readabledata=new URLSearchParams(finalres);
    //const jsonobj={}
    // for(const[key,value] of readabledata.entries()){
    //    jsonobj[key]=value;
    // }
    // console.log(jsonobj);
    
      const bodyobj=Object.fromEntries(readabledata);
    console.log(bodyobj);
    const jsonstring=JSON.stringify(bodyobj);
    fs.writeFileSync('user-details',jsonstring);
  })
  
  res.statusCode=302; //redirecting
  res.setHeader('Location','/');
  return res.end();
}

  
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>new page</title></head>');
    res.write('<body><h1>info my kd page</h1>');
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
  module.exports =requesthandler