const express = require('express');
const mongoose= require('mongoose');
const User = require('../model/user');
const route = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Tutor = require('../model/tutors');
const Subjects= require('../model/subjects.js');


route.post('/login',async  (req,res)=>{
    const {userName,password} = req.body;
    // let john = {};
    // john.userName = userName;
    // john.password = password;
    User.findOne({userName},function(err,user){
        if(err) throw err;
        if(!user){
            res.status(401).json({message:'authentication failed,student not found'});
        }else if (user){
            if(!user.comparePassword(password)){
                res.status(401).json({message:'authentication failed, wrong password.'});
            }else {return res.json({_id: user._id,
                token:jwt.sign({userName:user.userName,firstName:user.firstName,_id:user._id},'RESTFULAPIs',{ expiresIn:"1hr"})});
        }
        }
    })
  

})
route.post('/register', async(req,res)=>{
    const{firstName,lastName, userName,password}= req.body;
    User.findOne({ userName }).then(user => {if (user) 
        {return res.status(401).send({message:"this student already exist"});}}
        );
    let user= {};
    user.firstName= firstName;
    user.lastName = lastName;
    user.userName = userName;
    user.password=  bcrypt.hashSync(password,10);
    let userModel= new User(user);
    await userModel.save();
    userModel.password= "your choosen password";
    res.json({message:"account created successfuly"});
});

route.post('/tutorlogin',async  (req,res)=>{
    const {userName,password} = req.body;
    // let john = {};
    // john.userName = userName;
    // john.password = password;
    Tutor.findOne({userName},function(err,tutor){
        if(err) throw err;
        if(!tutor){
            res.status(404).json({message:'authentication failed,tutor not found'});
        }else if (tutor){
            if(!tutor.comparePassword(password)){
                res.status(401).json({message:'authentication failed, wrong password.'});
            }else {return res.json({_id: tutor._id,
                token:jwt.sign({userName:tutor.userName,firstName:tutor.firstName,_id:tutor._id},'FULAPIs',{ expiresIn:"1hr"})});
        }
        }
    }).select('+password')
  

})
route.post('/tutorregister', async(req,res)=>{
    const{firstName,lastName, userName,password}= req.body;
Tutor.findOne({ userName }).then(user => {if (user) 
    {return res.status(401).send({message:"this tutor already exist"});}}
    );

    let tutor= {};
    tutor.firstName= firstName;
    tutor.lastName = lastName;
    tutor.userName = userName;
    tutor.password=  bcrypt.hashSync(password,10);
    let tutorModel= new Tutor(tutor);
    await tutorModel.save();
    tutorModel.password= "your choosen password";
    res.json({message:"tutor account created successfuly"});
});

route.post('/Subjects', async (req,res)=>{
    const {subjectsName}= req.body;
    Subjects.findOne({subjectsName}).then(subjects => {if (subjects) 
        {return res.status(401).send({message:subjectsName +" already exist in subjects base"});}}
        );
    newSubject = new Subjects({subjectsName});
   await newSubject.save();
   res.json({message:subjectsName +' saved to database successfully'})

})

route.delete('/Subjects/:id', (req,res)=>{
    const id=req.params.id
    Subjects.deleteOne({_id:id}).then(success=>{
        if (success){ 
            return res.status(200).send({message:"selected subjects deleted from database"});
        }
        else {return res.status(401).send({message:"an error occurred,check if the subject is correct"})}
    })
})

route.get('/subjects', (req,res)=>{
    Subjects.find({}).then(subjects_list=>{
        return res.status(202).send({subjects_list})
    })
})



route.get('/tutorsearch', (req,res)=>{
    try{
    Tutor.find({}).then(tutors=>{
        
        return  res.status(202).send({tutors});
    })}catch(e){res.status(404).send({e})}
})

route.delete('/tutordel/:id', (req,res)=>{
    const id=req.params.id
    Tutor.deleteOne({_id:id}).then(success=>{
        if (success){ 
            return res.status(200).send({message:"selected tutor account deleted from database"});
        }
        else {return res.status(401).send({message:"an error occurred,check if the subject is correct"})}
    })
})


module.exports = route;