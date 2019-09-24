'use strict';

var express = require('express');
var app = express();
app.set('superSecret', 'abcde');
var models = require('../../../../models/index');
var bcrypt = require("bcrypt-nodejs");
var moment = require('moment');
var generator = require('generate-password');

exports.logIn = logIn;
exports.logOut = logOut;
exports.forgotPassword = forgotPassword;
exports.changePassword = changePassword;

function adminResponse(adminObj){
    var result = {};
    result.id = adminObj.id;
    result.email = adminObj.email;
    result.status = adminObj.status;
    result.created_at = adminObj.created_at;
    result.updated_at = adminObj.updated_at;
    result.access_token = adminObj.access_token;
    return result;
}

function logIn(req,res) {
	var token = generateJwt();
    models.Admin.findOne({where:{email:req.body.email,status:1}}).then(function(adminData){
        if(!adminData || adminData == undefined || adminData==null){
            return res.status(400).send({
                code: 400,
                message: 'Wrong email address or password'
            });
        }

        var pass = validPassword(req.body.password, adminData.salt, adminData.password);
        if(!pass){
            return res.status(400).send({
                code: 400,
                message: 'Wrong email address or password'
            });
        }

        adminData.update({
            access_token: token
        }).then(function(data, err){
            return res.status(200).send({
                message: 'Signin Successfully',
                code: 200,
                data: adminResponse(data),
            });
        })
    })
}

function logOut(req,res) {
	models.Admin.findById(req.body.admin_id).then(function(admin){
        if(admin && admin!=undefined && admin!=null){
            var token = '';
            admin.update({
                access_token: token
            }).then(function(data, err){
                return res.status(200).send({
                    message: 'Logout Successfully',
                    code: 200
                });
            });
        }
    })
}

function forgotPassword(req,res){
    models.Admin.findOne({where:{email:req.params.email,status:1}}).then(function(adminData){
        if(adminData && adminData!=undefined && adminData!=null){
            var temp_password = generator.generate({
                length: 10,
                numbers: true
            });
            var salt= adminData.salt;
            var pass = hashpassword(temp_password, salt);
            var token = generateJwt();
            adminData.update({
                password: pass,
                forgot_pwd_token: token
            }).then(function(data, err){
                if(err){
                    return res.status(400).status({
                        code: 400,
                        message: err
                    })
                }
                var transporter = nodemailer.createTransport(global.CONFIG.smtpConfig);

                var mailOptions = {
                    from: global.CONFIG.smtpConfig.auth.user,
                    to: req.params.email,
                    subject: 'Forgot Password',
                    html: "<p>Hello,</p>"+
                            "<p>Your new password is : "+temp_password+"</p><br><br>"+
                            "<p>Thanks & Regards,</p>"+
                            "<p>Ball Link Team</p>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(!error){
                        res.status(200).send({
                            code:200,
                            message: 'Password reset and sent to your email'
                        })
                    }
                })
            });
        }else{
           return res.status(404).send({
                code: 404,
                message: 'Email not registered or Invalid user request'
            }) 
        }
    })
}

//Change admin password
function changePassword(req,res){
    models.Admin.findOne({where:{id:req.body.id}}).then(function(admin){
        if(!admin || admin==undefined || admin==null){
            return res.status(400).send({
                code: 400,
                message: 'Unauthorized request'
            })
        }
        var pass = hashpassword(req.body.password, admin.salt);
        admin.update({
            password: pass
        }).then(function(data, err){
            return res.status(200).send({
                message: 'Password changed successfully',
                code: 200
            });
        });
    })
}

//To generate hash of password
function hashpassword(password, salt){
    return bcrypt.hashSync(password, salt, null);
}

//To validate password
function validPassword(password, salt, currentPass) {
    var encrypt_pwd = hashpassword(password, salt);
    if(encrypt_pwd == currentPass){
      return true;
    }
    return false;
    //return bcrypt.compareSync(password, currentPass);    
}

//To generate access_token for user
function generateJwt() {
    var expires = moment().add(5, 'm').format("DD-MM-YYYY h:m:s a");
    var token = jwt.encode({
        exp: expires
    }, app.get('superSecret'));
    return token;
}
