const http=require('http')
const server=http.createServer((req,res) => {
console.log(req.url,req.headers)
if(req.url.toLowerCase()==="/home")
        {res.setHeader('Content-Type','text/html');
        res.write(`
                <html>
                    <head><title>home page</title></head>
                    <body>
                        <h1>this is home page</h1>
                    </body>
                </html>
             `)
             return res.end();}
else if(req.url.toLowerCase()==="/sales")
        {res.setHeader('Content-Type','text/html');    
        res.write(`
                <html>
                    <head><title>sales page</title></head>
                    <body>
                        <h1>this is sales page</h1>
                        <form action="/home" method="GET">
                            <button type="submit">Go to home page</button>
                        </form>
                    </body>
                </html>
             `)
             return res.end();}
    else if(req.url==="/product"){
        res.setHeader('Content-Type','text/html');    
        res.write(`
                <html>
                    <head><title>new page</title></head>
                    <body>
                        <h1>this is product page</h1>
                    </body>
                </html>
             `)
            return res.end();

    } 


     res.setHeader('Content-Type','text/html');
     res.write(`
                <html>
                    <head><title>new page</title></head>
                    <body>
                        <h1>choose the link page</h1>
                        <a href="/home">home</a>
                        <a href="/sales">sales</a>
                        <a href="/product">product</a>
                    </body>
                </html>
             `)
             return res.end();


})
const port=3001;
server.listen(port,()=>{
    console.log("server start listening")
});
