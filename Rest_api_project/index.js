const express = require('express');
const users = require("./MOCK_DATA.json");
const fs=require('fs');

const app =express();
const port = 8000;
// Middleware -plugin
app.use(express.urlencoded({extended: false}))
app.use((res,req,next)=>{
    console.log("hello from middleware 1");
    //req.myUserName("aadi");  
   next();
});

app.use((res,req,next)=>{
    console.log("hello from middleware 2");
   next();
});
//Routs
app.get("/users", (req,res) =>{
    const html =`
    <ul>
   ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
 
    </ul>
 
    `;
    res.send(html);
 });

//REST API
app.get("/api/users", (req,res) =>{
    return res.json(users);
});


// app.get("/api/users/:id", (req,res)=>{

//     const id = Number(req.params.id);
//     const user= users.find((user) => user.id === id);
//     return res.json(user);

// });

//marge all api
app
.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user= users.find((user) => user.id === id);
    return res.json(user);

})

    //update user
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const user = users.findIndex(user => user.id === id);
    
        if (user !== -1) {
            users[user] = { ...users[user], ...body };
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
                return res.json({ status: "updated", id });
                
            });
        } else {
            return res.status(400).json({ status: "error", message: "User not found" });
        }
        console.log(body);
    })
    
.delete((req,res)=>{
     //delete user id
        const id = Number(req.params.id);
       
        const userIndex = users.findIndex(user => user.id === id);
    
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: err.message });
                }
                return res.json({ status: "deleted", id });
            });
        } else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        console.log(userIndex);
    });
app.post("/api/users",(req,res) =>{
    //enter  user id
    const body = req.body;
    users.push({ ...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) =>{
        return res.json({ status: "success",id:users.length });
    });
    console.log(body);

});

app.listen(port, ()=> console.log(`server started atv port: ${port}`));
