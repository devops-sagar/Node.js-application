'use strict';

var express = require('express');
var app = express();
app.set('superSecret', 'soa');
var models = require('../../../models/index');
var bcrypt = require("bcrypt-nodejs");
var sequelize = require('sequelize');
var moment = require('moment');

exports.signUp = signUp;
exports.logIn = logIn;
exports.GetTotalPosts = GetTotalPosts;
exports.getProfile = getProfile;
exports.editProfile = editProfile;
exports.AddPost = AddPost;
exports.GetAllPosts = GetAllPosts;
exports.GetPost = GetPost;
exports.SetPost = SetPost;
exports.TopOffendedPost = TopOffendedPost;
exports.logOut = logOut;

function userResponse(userObj){
	var result = {};
	result.id = userObj.id;
	result.name = userObj.name;
	result.email = userObj.email;
	result.phone = userObj.phone,
    result.gender = userObj.gender,
	result.status = userObj.status;
    result.user_type = userObj.user_type;
	result.created_at = userObj.created_at;
	result.updated_at = userObj.updated_at;
	result.access_token = userObj.access_token;
	return result;
}

async function signUp(req,res) {
    console.log(req.body);
    var token = generateJwt();
    var salt= bcrypt.genSaltSync(10);
    if(!req.body.name || req.body.name==null || req.body.name==undefined || req.body.name==''){
        return res.status(400).send({
            code: 400,
            message: 'Name is required'
        });
    }
    if(!req.body.email || req.body.email==null || req.body.email==undefined || req.body.email==''){
        return res.status(400).send({
            code: 400,
            message: 'Email is required'
        });
    }
    if(!req.body.phone || req.body.phone==null || req.body.phone==undefined || req.body.phone==''){
        return res.status(400).send({
            code: 400,
            message: 'Phone is required'
        });
    }
    var tmp_first_name = req.body.name.replace(/ /g,'');
    if(!req.body.password || req.body.password==null || req.body.password==undefined || req.body.password==''){
        return res.status(400).send({
            code: 400,
            message: 'Password is required'
        });
    }
    if(req.body.password.length <= 5){
        return res.status(400).send({
            code: 400,
            message: 'Password should have atleast 6 digits'
        });
    }

    // Check email
    let existEmail = await models.User.findOne({where:{email:req.body.email}});
    if (existEmail && existEmail !== undefined && existEmail !== null) {
        return res.status(400).send({
            code: 400,
            message: 'Email already exist'
        });
    }

    // Check Phone
    let existPhone = await models.User.findOne({where:{phone:req.body.phone}});
    if (existPhone && existPhone !== undefined && existPhone !== null) {
        return res.status(400).send({
            code: 400,
            message: 'Phone already exist'
        });
    }

    var pass = hashpassword(req.body.password, salt);
    var user = models.User.build({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        password: pass,
        user_type: 'user',
        salt: salt,
        status: 1,
        access_token: token,
        created_at: Date.now(),
        updated_at: Date.now(),
        login_at: Date.now()
    });
    user.save().then(function(userData) {
        if(!userData || userData==undefined || userData==null){
            return res.status(400).send({
                code:400,
                message:'User signUp failed'
            })
        }else{
            return res.status(200).send({
                code:200,
                data: userResponse(userData),
                message:'User signUp successfully'
            })
        }
    }).catch(function(error){
        console.log(error)
        return res.status(400).send({
            code: 400,
            message: global.common_function.errors_messages(error)
        })
    })
}

async function logIn(req,res) {
	var token = generateJwt();

    // Check blocked user
    let blockedUser = await models.User.findOne({where:{email:req.body.email,status:2}});
    if (blockedUser && blockedUser !== undefined && blockedUser !== null) {
        return res.status(400).send({
            code: 400,
            message: 'Your account was blocked by admin'
        })
    }

	models.User.findOne({where:{email:req.body.email,status:1}}).then(function(userData){
		if(!userData || userData === undefined || userData === null){
			return res.status(400).send({
				code: 400,
				message: 'Wrong email address or password'
			});
		}

		var pass = validPassword(req.body.password, userData.salt, userData.password);
		if(!pass){
            console.log('error==========')
			return res.status(400).send({
				code: 400,
				message: 'Wrong email address or password'
			});
		}

		userData.update({
			access_token: token,
            login_at: Date.now()
		}).then(function(data, err){
			return res.status(200).send({
				message: 'Signin Successfully',
				code: 200,
				data: userResponse(data),
			});
		})
	})
}

async function GetTotalPosts(req, res) {
    let postObj = {
        totalPosts : 0,
        totalPendingPosts : 0,
        totalApprovedPosts : 0,
        totalRejectPosts : 0,
    }
    try{
        if (req.params.id == 0) {
            let totalPosts = await models.Post.count();
            let pendingPosts = await models.Post.count({where:{status:1}});
            let approvedPosts = await models.Post.count({where:{status:2}});
            let rejectPosts = await models.Post.count({where:{status:3}});
            postObj = {
                totalPosts : totalPosts,
                totalPendingPosts : pendingPosts,
                totalApprovedPosts : approvedPosts,
                totalRejectPosts : rejectPosts,
            }
        } else {
            let totalPosts = await models.Post.count({where:{fk_user_id:req.params.id}});
            let pendingPosts = await models.Post.count({where:{fk_user_id:req.params.id, status:1}});
            let approvedPosts = await models.Post.count({where:{fk_user_id:req.params.id, status:2}});
            let rejectPosts = await models.Post.count({where:{fk_user_id:req.params.id, status:3}});
            postObj = {
                totalPosts : totalPosts,
                totalPendingPosts : pendingPosts,
                totalApprovedPosts : approvedPosts,
                totalRejectPosts : rejectPosts,
            }
        }
        return res.status(200).send({
            code: 200,
            message: 'Total posts found',
            data: postObj
        })
    } catch(err) {
        console.log(err);
        return res.status(200).send({
            code: 200,
            message: 'Total posts found',
            data: postObj
        });
    }
}

function getProfile(req,res){
    var options = {where:{id:req.params.id}};
    models.User.findOne(options).then(function(userDetails){
        if(userDetails && userDetails!=null && userDetails!=undefined){
            return res.status(200).send({
                code: 200,
                message: 'User details found',
                data: userResponse(userDetails)
            })
        }else{
            return res.status(400).send({
                code: 400,
                message: 'User details not found'
            })
        }
    })
}

async function editProfile(req,res){
    console.log(req.body)
	if(!req.body.name || req.body.name==null || req.body.name==undefined || req.body.name==''){
        return res.status(400).send({
            code: 400,
            message: 'Name is required'
        });
    }
    if(!req.body.email || req.body.email==null || req.body.email==undefined || req.body.email==''){
        return res.status(400).send({
            code: 400,
            message: 'Email is required'
        });
    }
    if(!req.body.phone || req.body.phone==null || req.body.phone==undefined || req.body.phone==''){
        return res.status(400).send({
            code: 400,
            message: 'Phone is required'
        });
    }

    // Check email
    let existEmail = await models.User.findOne({where:{id: {$ne:req.body.id},email:req.body.email}});
    if (existEmail && existEmail !== undefined && existEmail !== null) {
        return res.status(400).send({
            code: 400,
            message: 'Email already exist'
        });
    }

    // Check Phone
    let existPhone = await models.User.findOne({where:{id: {$ne:req.body.id},phone:req.body.phone}});
    if (existPhone && existPhone !== undefined && existPhone !== null) {
        return res.status(400).send({
            code: 400,
            message: 'Phone already exist'
        });
    }
	models.User.findOne({
		where:{id:req.body.id,status:1}
	}).then(function(user_data){
		if(user_data && user_data!=null && user_data!=undefined){
    		user_data.update({
    			name: req.body.name,
                email: req.body.email,
    			phone: req.body.phone,
    			updated_at: Date.now()
    		}).then(function(data, err){
    			if(err){
    				return res.status(400).status({
    					code: 400,
    					message: err
    				})
    			}
    			return res.status(200).send({
    				message: 'Profile updated successfully',
    				code: 200
    			});
    		});
		} else {
			return res.status(400).send({
				code: 400,
				message: 'User details not found'
			})
		}
	})
}

async function AddPost(req, res) {
    var post = models.Post.build({
        fk_user_id: req.body.fk_user_id,
        offender_social_info: req.body.offender_social_info,
        offender_user_info: req.body.offender_user_info,
        media_type: req.body.media_type,
        media_url: req.file.filename,
        title: req.body.title,
        description: req.body.description,
        user_type: 'user',
        status: 1,
        created_at: Date.now(),
        updated_at: Date.now()
    });
    let postObj = await post.save();
    if (!postObj || postObj === undefined || postObj === null) {
        global.fs.unlink(req.file.path, function(){});
        return res.status(400).send({
            code: 400,
            message: 'Failed to upload post'
        })
    }
    return res.status(200).send({
        code: 200,
        message: 'Post uploaded successfully'
    })
}

async function GetAllPosts(req, res) {
    try {
        let posts;
        if (req.params.id == 0) {
            posts = await models.Post.findAll({
                where:{status:req.params.status}
            });
        } else {
            posts = await models.Post.findAll({
                where:{fk_user_id: req.params.id, status:req.params.status}
            });
        }
        
        if (posts.length > 0) {
            let items = [];
            let status = '';
            for (let i= 0; i < posts.length; i++) {
                if (posts[i].status === 1) {
                    status = 'Pending';
                } else if (posts[i].status === 2) {
                    status = 'Approved'
                } else if (posts[i].status === 3) {
                    status = 'Rejected'
                }
                let item = {};
                item.id = posts[i].id;
                item.media = global.CONFIG.files.url + posts[i].media_url;
                item.media_type = posts[i].media_type;
                item.title = posts[i].title;
                item.description = posts[i].description;
                item.status = status;
                item.created_at = posts[i].created_at;
                items.push(item);
            }
            return res.status(200).send({
                code: 200,
                message: 'Post list found',
                data: items
            })
        } else {
            return res.status(400).send({
                code: 400,
                message: 'Posts list not found'
            })
        }
    } catch(err) {
        console.log(err);
        return res.status(400).send({
            code: 400,
            message: err
        })
    }
}

async function GetPost(req, res) {
    try {
        let post = await models.Post.findOne({
            where:{id: req.params.id}
        });
        if (post) {
            let status = '';
            if (post.status === 1) {
                status = 'Pending';
            } else if (post.status === 2) {
                status = 'Approved'
            } else if (post.status === 3) {
                status = 'Rejected'
            }
            let item = {};
            item.id = post.id;
            item.media = global.CONFIG.files.url + post.media_url;
            item.media_type = post.media_type;
            item.title = post.title;
            item.description = post.description;
            item.offender_social_info = post.offender_social_info;
            item.offender_user_info = post.offender_user_info;
            item.status = status;
            item.created_at = post.created_at;
            return res.status(200).send({
                code: 200,
                message: 'Post details found',
                data: item
            })
        } else {
            return res.status(400).send({
                code: 400,
                message: 'Post details not found'
            })
        }
    } catch(err) {
        console.log(err);
        return res.status(400).send({
            code: 400,
            message: err
        })
    }
}

async function SetPost(req, res) {
    console.log(req.body);
    models.Post.findOne({
        where:{id:req.body.id}
    }).then(function(post_data){
        if(post_data && post_data!=null && post_data!=undefined){
            post_data.update({
                status: req.body.status,
                updated_at: Date.now()
            }).then(function(data, err){
                if(err){
                    return res.status(400).status({
                        code: 400,
                        message: err
                    })
                }
                return res.status(200).send({
                    message: 'Post updated successfully',
                    code: 200
                });
            });
        }else{
            return res.status(400).send({
                code: 400,
                message: 'Post details not found'
            })
        }
    })
}

async function TopOffendedPost(req, res) {
    models.Post.findAll({
        where:{offender_social_info:req.params.social_type},
        attributes: ['offender_user_info','offender_social_info', [sequelize.fn('count', sequelize.col('offender_user_info')), 'cnt']],
        group: ['offender_user_info'],
        order: [[sequelize.literal('cnt'), 'DESC']]
    }).then(function(posts){
        if (posts.length > 0) {
            let items = [];
            for (let i= 0; i < posts.length; i++) {
                let item = {};
                item.offender_social_info = posts[i].dataValues.offender_social_info;
                item.offender_user_info = posts[i].dataValues.offender_user_info;
                item.cnt = posts[i].dataValues.cnt
                items.push(item);
            }
            return res.status(200).send({
                code: 200,
                message: 'Offender list found',
                data: items
            });
        } else {
            return res.status(400).send({
                code: 400,
                message: 'Offender list not found'
            })
        }
    });
}

function logOut(req, res) {
	models.User.findById(req.body.id).then(function(user){
		if(user && user!=undefined && user!=null){
			var token = '';
			user.update({
				access_token: token,
			}).then(function(data, err){
				return res.status(200).send({
					message: 'Logout Successfully',
					code: 200
				});
			});
		} else {
            return res.status(200).send({
                message: 'Logout Successfully',
                code: 200
            });
        }
	})
}

//To generate hash of password
function hashpassword(password, salt){
	return bcrypt.hashSync(password, salt, null);
}




//To validate password
function validPassword(password, salt, currentPass) {
	var encrypt_pwd = hashpassword(password, salt);
    return encrypt_pwd === currentPass;
}

//To generate access_token for user
function generateJwt() {
	var expires = moment().add(5, 'm').format("DD-MM-YYYY h:m:s a");
	var token = jwt.encode({
		exp: expires
	}, app.get('superSecret'));
	return token;
}