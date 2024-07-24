const http=require("http");
const fs = require("fs");
const url =require("url");
const express =require("express");

const app = express();

app.get("/",(req,res) =>{
  return res.send("Hello from home  page")
});

app.get("/about",(req,res) =>{
    return res.send(`Hello ${req.query.name}`)
});

function myHandler(req,res) {

}
const myserver = http.createServer(app)

app.listen(8000, () => console.log("Server Started!"));

// creating the server

// const myserver=http.createServer((req,res) => {
//     if(req.url === "/favicon.ico") return res.end();
//     const log =`${Date.now()}: ${req.method} ${req.url} New Req Recived\n`
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);
//     fs.appendFile("log.txt", log, (err,data)=>{
// // server page creating
//         switch(myUrl.pathname){
//             case "/":
//                 if(req.method === 'Get') res.end('HomePage');
//             break;
//             case "/about":
//                 const search=myUrl.query.myname;
//                 res.end("Here are you result for search :"+ search);
//                 case '/SignUp':
//                     if( req.method ==="GET") res.end("This is a signup from");
//                     if(req.method ==="POST") {

//                         //Db query
//                         res.end("Success");
//                     }
                
//                 break;
//                 case "/contact": res.end("My phone number: 8536034272")
//                 default: res.end("404 Not found");
                   
//         }
//     });
//     //console.log(req.headers)
//     // console.log("New Req Rec");
//     // res.end("Hello from Server");

// });

//myserver.listen(8000, ()=> console.log("server started !"));



