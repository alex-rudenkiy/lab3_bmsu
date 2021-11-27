import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        protocol: 'postgres',
        host: 'ec2-54-172-169-87.compute-1.amazonaws.com',
        port: 5432,
        username: 'hhpjhckmxhethv',
        password: 'a2745ccda743ce92ca9784c9870ac80791429086dd62ef25ea64fd8615bf6d44',
        database: 'd8u8fnt44jli7d',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
      });

      await sequelize.sync();

      const _reservation = require('./models/reservation');
      const reservation = _reservation(sequelize, DataTypes);

      const models = {
        reservation,
      };


      return sequelize;
    },
  },
];
