const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;


// Set EJS as the templating engine
app.get('/users',(req,res)=>{
  return res.json(users);
})


app.listen(PORT , ()=>console.log('ServerStarted at PORT:${PORT}'))