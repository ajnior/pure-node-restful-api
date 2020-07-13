// Create and export configuration variables

// Container for all the environments
var environments = {};

// Staging (default) env
environments.staging = {
  port: 3000,
  envName: "staging",
};

// Production env
environments.production = {
  port: 5000,
  envName: "production",
};

// Determine which env was passed as a commmand-line argument
var currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

var envToExport =
  typeof environments[currentEnv] == "object"
    ? environments[currentEnv]
    : environments.staging;

// Export the module
module.exports = envToExport;
