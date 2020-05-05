const jwt = require('jsonwebtoken');

exports.checkid = function(req,res,next){
    const token =req.headers.authorization
    jwt.verify(token,'RESTFULAPIs',function(err,decodedToken)
    {if(err){res.status(401).send({message:'auth failed, login to continue'})}
    
    else{req.body.id=decodedToken;
      
    next()
}

    })
}
