#!/usr/bin/env node

const { getVaultItem } = require("@gtr/config");
const spawn = require("child_process").spawn;

const env =
  {
    development: "dev",
    production: "prod",
  }[process.env.NODE_ENV] || "dev";

const vaultPrefix = `projects/anitya/relive/cms/${env}`;

const start = async () => {
  const db = await getVaultItem(`${vaultPrefix}/mongo/rw`);
  const core = await getVaultItem(`${vaultPrefix}/core`);

  spawn("npm", ["run", ...process.argv.slice(2)], {
    stdio: "inherit",
    env: {
      DATABASE_HOST: db.hostname,
      DATABASE_PORT: db.port,
      DATABASE_NAME: db.database,
      DATABASE_USERNAME: db.username,
      DATABASE_PASSWORD: db.password,
      AUTHENTICATION_DATABASE: db.auth_database,
      DATABASE_SSL: db.ssl,
      ADMIN_JWT_SECRET: core.admin_jwt_secret,
      JWT_SECRET: core.jwt_secret,
      ...process.env,
    },
  });
};

start();
