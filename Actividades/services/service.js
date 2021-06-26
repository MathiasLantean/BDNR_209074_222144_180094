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
}