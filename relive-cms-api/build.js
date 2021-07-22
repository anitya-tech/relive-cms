#!/usr/bin/env node

const { generateApi } = require("swagger-typescript-api");
const path = require("path");
const fs = require("fs/promises");

const source = path.resolve(
  __dirname,
  "../extensions/documentation/documentation/1.0.0/full_documentation.json"
);
const cache = path.resolve(__dirname, ".cache/swagger.json");
const dist = path.resolve(__dirname, "./src");

const build = async () => {
  const schema = JSON.parse(await fs.readFile(source, "utf-8"));

  const login = schema["paths"]["/auth/local"]["post"];

  login["responses"]["200"]["content"]["application/json"]["schema"][
    "properties"
  ] = {
    jwt: {
      type: "string",
    },
  };

  login["requestBody"]["content"]["application/json"]["schema"]["properties"] =
    {
      identifier: {
        type: "string",
      },
      password: {
        type: "string",
      },
    };

  await fs.mkdir(path.dirname(cache), { recursive: true });

  await fs.writeFile(cache, JSON.stringify(schema));

  await generateApi({
    name: "api.ts",
    output: dist,
    input: cache,
    httpClientType: "axios",
    generateUnionEnums: true,
    extractRequestParams: true,
    extractRequestBody: true,
  });
};

build();
