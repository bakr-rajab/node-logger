
module.exports = {
  apps: [{
    name: "app",
    script: "../index.js",
    env: {
      NODE_ENV: "development",
      PORT : 6000,
      MONGODB_URI : "mongodb://localhost:27017"
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_staging: {
      NODE_ENV: "staging",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}