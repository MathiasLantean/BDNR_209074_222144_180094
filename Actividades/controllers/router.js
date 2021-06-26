const Router = require('koa-router');
const Controller = require('./controller');


const router = new Router();
const controller = new Controller();


router.post('/activities/activity', (ctx, next) => controller.AddActivity(ctx, next));
router.post('/activities/photo', (ctx, next) => controller.AddPhoto(ctx, next));

module.exports = router;