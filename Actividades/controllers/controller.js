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

    async AddPublication(ctx,next){
        let data = ctx.request.body;
        try{
            let result = await this.service.PostPublication(data)
            ctx.status = 201;
            ctx.body = result
        }catch(err){
            ctx.status = 400;
            ctx.body = err.message
        }
        await next();
    }

    async AddAutomatic(ctx,next){
        let data = ctx.request.body;
        try{
            let result = await this.service.PostAutomatic(data)
            ctx.status = 201;
            ctx.body = result
        }catch(err){
            ctx.status = 400;
            ctx.body = err.message
        }
        await next();
    }

    async AddManual(ctx,next){
        let data = ctx.request.body;
        try{
            let result = await this.service.PostManual(data)
            ctx.status = 201;
            ctx.body = result
        }catch(err){
            ctx.status = 400;
            ctx.body = err.message
        }
        await next();
    }

    async Get(ctx,next){
        let data = ctx.request.body;
        try{
            let result = await this.service.Get(data)
            ctx.status = 201;
            ctx.body = result
        }catch(err){
            ctx.status = 400;
            ctx.body = err.message;
        }
        await next();
    }

    async GetAll(ctx,next){
        try{
            let result = await this.service.GetAll()
            ctx.status = 201;
            ctx.body = {data: result}
        }catch(err){
            ctx.status = 400;
            ctx.body = err.message;
        }
        await next();
    }


}