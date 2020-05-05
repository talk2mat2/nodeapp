const jwt = require('jsonwebtoken');

exports.checkadmin = function(req,res,next){
    const token =req.headers.authorization
    jwt.verify(token,'RESTFULAPIs',function(err,decodedToken)
    {if(decodedToken.Admin_status==false){res.status(501).send({message:"Access Denied,contact your Admin"})}
    
    else{res.status(200).send();
      
    next()
}

    })
}
