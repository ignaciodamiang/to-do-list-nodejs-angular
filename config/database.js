require('dotenv').config();

module.exports = {
  // Conection
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'database',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_DIALECT || 'mysql',

  // Seed configuration
  seederStorage: 'sequelize',
  seederStorageTableName: 'seeds',

  // Migration configuration
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'migrations',

  define: {
    timestamps: false,
    underscored: true,
  },
};
