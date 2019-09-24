var router = global.express.Router();
var controller = require('./admin.controller');

router.post('/login', controller.logIn);
router.post('/logout', global.common_function.validateAdmin, controller.logOut);
router.put('/forgotPassword/:email', controller.forgotPassword);
router.put('/changePassword', global.common_function.validateAdmin, controller.changePassword);


module.exports = function (app) {
    app.use('/api/v1/admin/admin', router);
};