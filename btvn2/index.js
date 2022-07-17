const express = require('express');
const app = express();
const port = 5000;
const Users = require('./router/Users');

app.use(express.json());
app.use('/api/user',Users);

app.listen(port, ()=>{
    console.log("server running with port",port); 
});