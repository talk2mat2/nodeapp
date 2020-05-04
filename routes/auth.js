const express = require('express');
const mongoose= require('mongoose');
const User = require('../model/user');
const route = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Tutor = require('../model/tutors');
const Subjects= require('../model/subjects.js');
const Category =require('../model/category')


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

route.post('/tutors/login',async  (req,res)=>{
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
//tutors registration
route.post('/tutors/register', async(req,res)=>{
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


//admin create subject by category by category id
route.post('/category/:id', async (req,res)=>{
    const {subjectsName}= req.body;
    const id= req.params.id;
    Subjects.findOne({subjectsName}).then(subjects => {if (subjects) 
        {return res.status(401).send({message:subjectsName +" already exist in subjects base"});}}
        );
    newclass= await Category.findById(id);
    newSubject = new Subjects({subjectsName});
    newSubject.class= newclass;
   await newSubject.save();
   newclass.subjects.push(newSubject);
   await newclass.save();
   res.json({message:subjectsName +' saved to database successfully'})

})
//delete subjects by subject id
route.delete('/Subjects/:id', (req,res)=>{
    const id=req.params.id
    Subjects.deleteOne({_id:id}).then(success=>{
        if (success){ 
            return res.status(200).send({message:"selected subjects deleted from database"});
        }
        else {return res.status(401).send({message:"an error occurred,check if the subject is correct"})}
    })
})
// search for all subjects in database
route.get('/subjects', (req,res)=>{
    Subjects.find({}).populate({path:'class',model:'category',select:'className'}).then(subjects_list=>{
        return res.status(202).send({subjects_list})
    })
})




// route.get('/subjects', (req,res)=>{
//         Subjects.find({},{class:0}).then(subjects_list=>{
//             return res.status(202).send({subjects_list})
//         })
//     })

route.get('/subjects/byname/:subjectsName', (req,res)=>{
    const subjectsName = req.params.subjectsName;
    const query ={'subjectsName':subjectsName};
    try{
    Subjects.find(query).sort({'subjectsName':-1}).then(subjects=>{
        
        return  res.status(202).send({subjects});
    })}catch(err){res.status(404).send({err:'not found'})}
})


route.get('/tutors', (req,res)=>{
    try{
    Tutor.find({}).then(tutors=>{
        
        return  res.status(202).send({tutors});
    })}catch(e){res.status(404).send({e})}
})


route.get('/tutors/:id', (req,res)=>{
    const id = req.params.id;
    try{
    Tutor.findById(id).then(tutor=>{
        
        return  res.status(202).send({tutor});
    })}catch(e){res.status(404).send({e})}
})
//search for tutors by first name, sorted alphabetically in ascending order.
route.get('/tutors/byname/:firstName', (req,res)=>{
    const firstName = req.params.firstName;
    const query ={'firstName':firstName};
    try{
    Tutor.find(query).sort({'firstName':-1}).then(tutor=>{
        
        return  res.status(202).send({tutor});
    })}catch(err){res.status(404).send({err:'not found'})}
})



//delete totor by id
route.delete('/tutors/:id', (req,res)=>{
    const id=req.params.id
    Tutor.deleteOne({_id:id}).then(success=>{
        if (success){ 
            return res.status(200).send({message:"selected tutor account deleted from database"});
        }
        else {return res.status(401).send({message:"an error occurred,check if the subject is correct"})}
    })
})

// admin create category
route.post('/category', async (req,res)=>{
    const {className}= req.body;
    Category.findOne({className}).then(cla => {if (cla) 
        {return res.status(401).send({message:className +" already exist in  database"});}}
        );
    newCat = new Category({className});
   await newCat.save();
   res.json({message:className +' saved to database successfully'})

})
// list all category
route.get('/category',async  (req,res)=>{
    await Category.find({}).populate({path:'subjects',model:'subjects',select:'subjectsName'}).then(classlist=>{
        return res.status(202).send({classlist})
    })
})
//rerieve all subjects by categoryid
route.get('/category/:id',async(req,res)=>{
    const id = req.params.id;
    await Category.findById(id).populate({path:'subjects',model:'subjects',select:'subjectsName'}).then(classname=>{
        return res.status(200).send(classname)
    })
})



// delete category
route.delete('/category/:id', (req,res)=>{
    const id=req.params.id
    Category.deleteOne({_id:id}).then(success=>{
        if (success){ 
            return res.status(200).send({message:"selected category deleted from database"});
        }
        else {return res.status(401).send({message:"an error occurred,check if the selection is correct"})}
    })
})





module.exports = route;