import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/schema.gql',
  documents: ['libs/graphql/**/*.graphql'],
  generates: {
    'libs/graphql/lib/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        useIndexSignature: true,
        content: 'import * as types from "@nx-apollo/models-graphql"',
        namespacedImportName: 'types',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
