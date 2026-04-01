
const sumres=require('./sum');
const requesthandler = (req, res) => {
 
    console.log(req.method);
    if(req.url === '/'){
      res.setHeader('Content-Type','text/html');
 const html=`
         <html>
         <head>
            <title>home page</title>
         </head>
         <body>
            <h1>welcome to home page</h1>
            <a href="/calc">go to calulator paage</a>
         </body>
        </html>`;  
     return  res.end(html);
    }
    

        if(req.url === '/calc'){
      res.setHeader('Content-Type','text/html');
 const html=`
         <html>
         <head>
            <title>calc page</title>
         </head>
         <body>
  
         <form action="/calc-result" method="POST">
        <label for="first">enter first number</label>
  
         <input type="number" name="number1" id="first">
  </br>
   <label for="second">enter second number</label>
       
  <input type="number" name="number2" id="second">
       </br>
         <button type="submit">sum </button>
    </form>
         </body>
        </html>`;  
    return  res.end(html);
    }


      

     

        if(req.url === '/calc-result' && req.method=='POST'){
    return  sumres(req,res);
    }
    


     res.setHeader('Content-Type','text/html');
 const html=`
         <html>
         <head>
            <title>calc page</title>
         </head>
         <body>
       <h1>404 not found</h1>
     
         </body>
        </html>`;  
      res.end(html);
    

};

module.exports = requesthandler;
