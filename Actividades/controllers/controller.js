const Service = require("../services/service");

module.exports = class Controller{
    constructor(){
        this.service = new Service();
    }

    async AddActivity(ctx,next){
        let data = ctx.request.body;
        try{
            let result = await this.service.PostActivity(data)
            ctx.status = 201;
            ctx.body = result
        }catch(err){
            ctx.status = 400;
        }
        await next();
    }

    async AddPhoto(ctx,next){
        let data = ctx.request.body;
        try{
            let result = await this.service.PostPhoto(data)
            ctx.status = 201;
            ctx.body = result
        }catch(err){
            ctx.status = 400;
            ctx.body = err.message
        }
        await next();
    }
}