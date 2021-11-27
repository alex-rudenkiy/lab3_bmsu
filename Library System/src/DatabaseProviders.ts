import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        protocol: 'postgres',
        host: 'ec2-52-201-72-91.compute-1.amazonaws.com',
        port: 5432,
        username: 'ekjrzohusmpygr',
        password: '738693c1201574df7b476276cf768264543fa33959e6a611b5f4612d5f7c01f5',
        database: 'dfnge4tf0d5l61',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
      });

      await sequelize.sync();

      const _books = require('./models/books');
      const _library = require('./models/library');
      const _library_books = require('./models/library_books');
      const books = _books(sequelize, DataTypes);
      const library = _library(sequelize, DataTypes);
      const library_books = _library_books(sequelize, DataTypes);

      const models = {
        books,
        library,
        library_books,
      };

      return sequelize;
    },
  },
];
