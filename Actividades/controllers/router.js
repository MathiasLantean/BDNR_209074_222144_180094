const Router = require('koa-router');
const Controller = require('./controller');


const router = new Router();
const controller = new Controller();


router.post('/activities/activity', (ctx, next) => controller.AddActivity(ctx, next));
router.post('/activities/photo', (ctx, next) => controller.AddPhoto(ctx, next));
router.post('/activities/publication', (ctx, next) => controller.AddPublication(ctx, next));
router.post('/activities/automatic', (ctx, next) => controller.AddAutomatic(ctx, next));
router.post('/activities/manual', (ctx, next) => controller.AddManual(ctx, next));
router.get('/activities/', (ctx, next) => controller.GetAll(ctx, next));
router.get('/activities/get', (ctx, next) => controller.Get(ctx, next));
module.exports = router;