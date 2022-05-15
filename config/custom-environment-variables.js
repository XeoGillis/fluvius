module.exports = {
  env: 'NODE_ENV',
  database: {
    host: 'DATABASE_HOST',
    username: 'DATABASE_USERNAME',
    password: 'DATABASE_PASSWORD',
    name: 'DATABASE_NAME',
  },
  auth: {
    jwt: {
      secret: 'JWT_SECRET',
    },
  },
};