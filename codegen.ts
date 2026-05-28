import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");

const config: CodegenConfig = {
  schema: [
    {
      [env.VITE_GRAPHQL_ENDPOINT]: {
        headers: { Authorization: env.API_KEY },
      },
    },
  ],
  documents: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "!src/shared/lib/graphql/gql/**/*",
    "!src/**/*.generated.ts",
  ],
  generates: {
    "./src/shared/lib/graphql/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        scalars: {
          Long:         "number",
          AWSTimestamp: "number",
          AWSJSON:      "string",
          AWSDate:      "string",
          AWSDateTime:  "string",
          AWSEmail:     "string",
          AWSURL:       "string",
          AWSPhone:     "string",
          AWSIPAddress: "string",
        },
      },
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "~@/shared/lib/graphql/gql/graphql",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
        apolloReactHooksImportFrom: "@/shared/lib/apollo",
        addDocBlockToTypes: false,
        scalars: {
          Long: "number",
          AWSTimestamp: "number",
          AWSJSON: "string",
          AWSDate: "string",
          AWSDateTime: "string",
          AWSEmail: "string",
          AWSURL: "string",
          AWSPhone: "string",
          AWSIPAddress: "string",
        },
      },
    },
    "./src/shared/lib/graphql/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
