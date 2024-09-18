const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myemitter = new Sales();

myemitter.on("newSale", ()=>{
    console.log("There was a new sale");
});
myemitter.on("newSale",()=>{
    console.log("Custmor name:- ");
});
myemitter.on("newSale", stock=>{
    console.log(`There are now ${stock} items available`);
})

myemitter.emit("newSale", 9);


const server = http.createServer();


server.on('request',(req,res)=>{
    console.log("Request Reveived");
    console.log(req.url);
    res.end("Request Reveived")
})
server.on('close',(req,res)=>{
    console.log('Server Closed');
})

server.listen(3000, '127.0.0.1',()=>{
    console.log("waiting for requests...");
})