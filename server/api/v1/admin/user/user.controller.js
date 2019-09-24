'use strict';

var models = require('../../../../models/index');

var sequelize = require('sequelize');

exports.totalUsers = totalUsers;
exports.listUsers = listUsers;
exports.enableDisableUser = enableDisableUser;
exports.userDetails = userDetails;

function listUsers(req,res){
    var options = {}
    models.User.findAll({order: [['created_at', 'DESC']]}).then(function(userList){
        if(userList.length>=0 && userList!=null && userList!=undefined){
            return res.status(200).send({
                code: 200,
                message: 'User list found',
                data: userList
            })
        }else{
            return res.status(400).send({
                code: 400,
                message: 'User list not found'
            })
        }
    });
}

function totalUsers(req,res){
	models.User.count({where:{status:1}}).then(function(count){
        if(count>=0 && count!=null && count!=undefined){
            return res.status(200).send({
                code: 200,
                message: 'User count',
                count: count
            })
        }else{
            return res.status(400).send({
                code: 400,
                message: 'User count not found'
            })
        }
    });
}

function enableDisableUser(req,res){
    models.User.findOne({where:{id:req.body.id}}).then(function(userObj){
        if(userObj && userObj!=null && userObj!=undefined){
            userObj.update({
                status: req.body.value
            }).then(function(data, err){
                return res.status(200).send({
                    message: 'User status updated Successfully',
                    code: 200
                });
            }).catch(function(error){
                return res.status(400).send({
                    code: 400,
                    message: global.common_function.errors_messages(error)
                })
            })
        }else{
            return res.status(400).send({
                code: 400,
                message: 'Failed to update user status'
            })
        }
    })
}

function userDetails(req,res){
    models.User.findOne({
        where:{id:req.params.id}
    }).then(function(userObj){
        if(userObj && userObj!=null && userObj!=undefined){
            return res.status(200).send({
                message: 'User details found',
                code: 200,
                data: userObj
            });
        }else{
            return res.status(400).send({
                code: 400,
                message: 'User details not found'
            })
        }
    })
}