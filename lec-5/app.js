const http =require('http')
const requesthandler=require('./parsing_request')
const server =http.createServer(requesthandler);




const port=3001;
server.listen(port,()=>{
console.log("server start listening via port number");

});
