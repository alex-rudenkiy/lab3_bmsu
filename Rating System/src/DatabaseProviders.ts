import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        protocol: 'postgres',
        host: 'ec2-52-70-107-254.compute-1.amazonaws.com',
        port: 5432,
        username: 'idbeoaxtotpqsd',
        password: 'd73980ef438f1c6afe364dd4b0cfce90167aeefb88410a5f1e7fa0ef9de85e05',
        database: 'deiemsgb7hgvb2',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
      });

      await sequelize.sync();

      const _rating = require('./models/rating')
      const rating = _rating(sequelize, DataTypes);

      const models = {
        rating,
      };

      return sequelize;
    },
  },
];
