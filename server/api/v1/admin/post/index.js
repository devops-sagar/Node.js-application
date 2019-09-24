var router = global.express.Router();
var controller = require('./post.controller');

router.get('/listAdPost', global.common_function.validateAdmin, controller.listPost)
router.get('/totalPosts', global.common_function.validateAdmin, controller.GetTotalPosts)
router.put('/changePostStatus', global.common_function.validateAdmin, controller.ChangePostStatus)

module.exports = function (app) {
    app.use('/api/v1/admin/post/', router);
};