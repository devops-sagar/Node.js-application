//Validate User
function validateUser(req,res,next){
    var models = require('../models/index');
    var access_token = req.get('Authorization')
    models.User.findOne({where:{access_token:access_token}}).then(function(user){
        if(user && user!=undefined){
            return next();
        } else {
            res.status(403).send({
                message: 'Unauthorized request',
                code: 403
            })
        }
    })
}

//Validate Admin
function validateAdmin(req,res,next){
    var models = require('../models/index');
    var access_token = req.get('Authorization')
    models.Admin.findOne({where:{access_token:access_token}}).then(function(admin){
        if(admin && admin!=undefined){
            return next();
        } else {
            res.status(401).send({
                message: 'Invalid admin request',
                code: 401
            })
        }
    })
}

function errors_messages(error_array){ 
    console.log(error_array)   
    var error_messge="";   
    error_array.errors.map(function(x){   
        if(error_messge != "") error_messge = error_messge + ", ";  
        error_messge = error_messge +  x.message;  
    });  
    return error_messge;
}

exports.validateUser = validateUser;
exports.validateAdmin = validateAdmin;
exports.errors_messages = errors_messages;
