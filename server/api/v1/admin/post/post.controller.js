'use strict';

var models = require('../../../../models/index');

exports.listPost = listPost;
exports.GetTotalPosts = GetTotalPosts;
exports.ChangePostStatus = ChangePostStatus;

async function listPost(req,res){
	models.Post.findAll({where:{status:1},order: [['created_at', 'DESC']]}).then(function(postList){
        if(postList.length>0 && postList!=undefined && postList!=null){
            return res.status(200).send({
                code: 200,
                message: 'Post list found',
                data: postList
            })
        }else{
            return res.status(400).send({
                code: 400,
                message: 'Post list not found'
            })
        }
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

async function ChangePostStatus(req, res) {
    models.Post.findOne({where:{id:req.body.id}}).then(function(postData){
        if(postData && postData!=null && postData!=undefined){
            postData.update({
                status: req.body.value
            }).then(function(data, err){
                return res.status(200).send({
                    message: 'Post status updated Successfully',
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
                message: 'Failed to update post status'
            })
        }
    })
}

