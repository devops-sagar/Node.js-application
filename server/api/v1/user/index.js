var router = global.express.Router();
var controller = require('./user.controller');
let multer = require('multer');
let path = require('path');

//To upload post media
let post_media_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let savePath = global.CONFIG.files.posts;
        console.log(savePath)
        cb(null, savePath);
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now()+ext);
    }
});
let upload_post_media = multer({ storage : post_media_storage});
let postMediaUpload = upload_post_media.single('media');

router.post('/signUp', controller.signUp);
router.post('/login', controller.logIn);
router.get('/totalPosts/:id', global.common_function.validateUser, controller.GetTotalPosts);
router.get('/getProfile/:id', global.common_function.validateUser, controller.getProfile);
router.put('/editProfile', global.common_function.validateUser, controller.editProfile);
router.post('/addPost', global.common_function.validateUser, postMediaUpload, controller.AddPost);
router.get('/listPosts/:id/:status', global.common_function.validateUser, controller.GetAllPosts);
router.get('/getPost/:id', global.common_function.validateUser, controller.GetPost);
router.put('/setPost', global.common_function.validateUser, controller.SetPost);
router.get('/getTopAffendedPost/:social_type', global.common_function.validateUser, controller.TopOffendedPost);
router.post('/logout', controller.logOut);

module.exports = function (app) {
    app.use('/api/v1/user', router);
};



