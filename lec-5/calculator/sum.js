const { log } = require('console');
const http=require('http');
const { buffer } = require('stream/consumers');
const sumres=(req,res) => {
    const body=[];
    req.on('data',(chunk)=>{
        body.push(chunk);
        console.log(chunk);
    })
    req.on('end',()=>{
        const bodyres=Buffer.concat(body).toString();
        console.log(bodyres);
        const parsedres=new URLSearchParams(bodyres);
        const jsonobj=Object.fromEntries(parsedres);
        console.log(jsonobj);
        const result=Number(jsonobj.number1)+Number(jsonobj.number2);
        console.log(result);
           res.setHeader('Content-Type','text/html');
 const html=`
         <html>
         <head>
            <title>calc page</title>
         </head>
         <body>
       <h1>your res is ${result}</h1>
     
         </body>
        </html>`;  
      res.end(html);
        
    })
}
module.exports=sumres
