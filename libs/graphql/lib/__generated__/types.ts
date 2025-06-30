import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyStarships: Array<Starship>;
  createStarship: Starship;
  updateScore: Starship;
};


export type MutationCreateManyStarshipsArgs = {
  newStarshipsData: Array<NewStarshipInput>;
};


export type MutationCreateStarshipArgs = {
  newStarshipData: NewStarshipInput;
};


export type MutationUpdateScoreArgs = {
  id: Scalars['Int']['input'];
};

export type NewStarshipInput = {
  crew: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllStarships: Array<Starship>;
  getPaginatedStarships: Array<Starship>;
  getRandomStarship: Starship;
  starship: Starship;
};


export type QueryGetPaginatedStarshipsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStarshipArgs = {
  id: Scalars['Int']['input'];
};

export type Starship = {
  __typename?: 'Starship';
  crew: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  score: Scalars['Int']['output'];
};

export type StarshipFragment = { __typename?: 'Starship', id: string, name: string, score: number, crew: number };

export type UpdateScoreMutationVariables = types.Exact<{
  id: types.Scalars['Int']['input'];
}>;


export type UpdateScoreMutation = { __typename?: 'Mutation', updateScore: { __typename?: 'Starship', id: string, name: string, score: number, crew: number } };

export type GetPaginatedStarshipsQueryVariables = types.Exact<{
  page?: types.InputMaybe<types.Scalars['Int']['input']>;
  size?: types.InputMaybe<types.Scalars['Int']['input']>;
}>;


export type GetPaginatedStarshipsQuery = { __typename?: 'Query', getPaginatedStarships: Array<{ __typename?: 'Starship', id: string, name: string, score: number, crew: number }> };

export type GetRandomStarshipQueryVariables = types.Exact<{ [key: string]: never; }>;


export type GetRandomStarshipQuery = { __typename?: 'Query', getRandomStarship: { __typename?: 'Starship', id: string, name: string, score: number, crew: number } };

export type GetStarshipQueryVariables = types.Exact<{
  id: types.Scalars['Int']['input'];
}>;


export type GetStarshipQuery = { __typename?: 'Query', starship: { __typename?: 'Starship', id: string, name: string, score: number, crew: number } };

export const StarshipFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"starship"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Starship"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"crew"}}]}}]} as unknown as DocumentNode<StarshipFragment, unknown>;
export const UpdateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"starship"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"starship"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Starship"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"crew"}}]}}]} as unknown as DocumentNode<UpdateScoreMutation, UpdateScoreMutationVariables>;
export const GetPaginatedStarshipsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPaginatedStarships"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedStarships"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"starship"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"starship"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Starship"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"crew"}}]}}]} as unknown as DocumentNode<GetPaginatedStarshipsQuery, GetPaginatedStarshipsQueryVariables>;
export const GetRandomStarshipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRandomStarship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRandomStarship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"starship"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"starship"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Starship"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"crew"}}]}}]} as unknown as DocumentNode<GetRandomStarshipQuery, GetRandomStarshipQueryVariables>;
export const GetStarshipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStarship"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starship"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"starship"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"starship"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Starship"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"crew"}}]}}]} as unknown as DocumentNode<GetStarshipQuery, GetStarshipQueryVariables>;