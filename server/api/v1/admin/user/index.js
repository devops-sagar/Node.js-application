var router = global.express.Router();
var controller = require('./user.controller');

router.get('/totalUsers', global.common_function.validateAdmin, controller.totalUsers);
router.get('/listUsers', global.common_function.validateAdmin, controller.listUsers);
router.put('/enableDisableUser', global.common_function.validateAdmin, controller.enableDisableUser);
router.get('/userDetails/:id', global.common_function.validateAdmin, controller.userDetails);


module.exports = function (app) {
    app.use('/api/v1/admin/user', router);
};