const Repository = require("../repositories/repository");

module.exports = class Service{
    constructor(){
        this.repository = new Repository();
    }

    async PostActivity(data){
        return await this.repository.AddActivity(data);
    }

    async PostPhoto(data){
        return await this.repository.AddPhoto(data);
    }

    async PostPublication(data){
        return await this.repository.AddPublication(data);
    }

    async PostManual(data){
        return await this.repository.AddManual(data);
    }

    async PostAutomatic(data){
        return await this.repository.AddAutomatic(data);
    }

    async Get(data){
        return await this.repository.Get(data);
    }

    async GetAll(){
        return await this.repository.GetAll();
    }

}