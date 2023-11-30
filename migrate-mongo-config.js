const config = {
  mongodb: {
    url: 'mongodb://localhost:27017/dashboardApp',
  },
  migrationsDir: 'src/migrations',
  changelogCollectionName: 'changelog',
};

module.exports = config;
