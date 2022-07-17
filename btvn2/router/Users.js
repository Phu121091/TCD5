const express = require('express');
const Users = express.Router();
const joi = require('joi');

//create  list
// const users = [
//     { id: 1, name:"Nguyen Trong Phu"},
//     { id: 2, name:"Edogawa Conan"},
//     { id: 3, name:"Kurosaki Ichigo"}
// ];

// Users.get('/',function(req,res){
//     res.send(users)
// });

// Users.post('/',function(req,res){
//     const newUser = {
//         id: users[users.length-1].id+1,
//         name : req.body.name
//     };
//     users.push(newUser);
//     res.send(users);
// });



// Users.put(`/:id`, (req, res) => {

   
//     for (let i = 0; i < users.length; i++){
//         if (users[i].id == req.params.id){
//             const newUser = {
//                 id: req.params.id,
//                 name: req.body.name,
//             }

//             users.splice(i,1,newUser);
           
//         }
//     }
  
//     res.send(users);
// })

// Users.delete(`/:id`, (req, res) => {
//     for (let i = 0; i < users.length; i++){
//         if (users[i].id == req.params.id){
    
//             users.splice(i,1);
           
//         }
//     }
//     res.send(users);
// })
const users = [
    {
        id: 1, name: 'Nguyen Trong Phu', phoneNumber: '0000000000', email: 'phuuuuuu@gmail.com', gender: 'nam', age: 50 
    },
    {
        id: 2, name: 'Vu Thi Nhi', phoneNumber: '0867576851', email: 'phuuuuu@gmail.com', gender: 'nữ', age: 60
    },
]

Users.get('/',function(req,res){
    res.send(users)
})

Users.post('/',function(req,res){
    const {error}  = validationUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const newUser = {
        id: users[users.length-1].id+1,
        name : req.body.name,
        phoneNumber : req.body.phoneNumber,
        email : req.body.email,
        gender : req.body.gender,
        age : req.body.age,
    }
    users.push(newUser)
    res.send(users)
})


function validationUser(user){
    const option = ['nam','nữ','không xác định']
    const schema = joi.object({
        name : joi.string().regex(/[^0-9]$/).min(15).required(),
        phoneNumber : joi.string().pattern(new RegExp('^[0-9]{3,30}$')).min(10).max(12),
        email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        age : joi.number().max(200),
        gender : joi.compile(option)
    })
    return schema.validate(user)
}


module.exports = Users;