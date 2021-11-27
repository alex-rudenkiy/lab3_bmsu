import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseProviders } from './DatabaseProviders';
import sequelize from 'sequelize';
var DataTypes = require("sequelize").DataTypes;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/boooook")
  getHello(): string {
    //var initModels = require("./models/init-models");
    //var models = initModels(sequelize);


    //model.findAll({ where: { username: "tony" }}).then(()=>{ console.log('lol') });

    return this.appService.getHello();
  }
}
