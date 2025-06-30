import { query } from '../../../utils/ApolloClient';
import {
  GetRandomStarshipDocument,
  GetStarshipDocument,
} from '../../../../../libs/graphql/lib/__generated__/types';
import { notFound } from 'next/navigation';
import Battle from './Battle';

export default async function BattlePage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const id = await params.then((params) =>
    params.id ? Number(params.id) : undefined
  );

  const yourStarship = id
    ? await query({
        query: GetStarshipDocument,
        variables: { id: id },
      })
        .then(({ data }) => {
          return data.starship;
        })
        .catch((error) => {
          console.error('Failed to get starships page', error);
          return undefined;
        })
    : await query({
        query: GetRandomStarshipDocument,
      })
        .then(({ data }) => {
          return data.getRandomStarship;
        })
        .catch((error) => {
          console.error('Failed to get starships page', error);
          return undefined;
        });

  const opponentsStarship = await query({
    query: GetRandomStarshipDocument,
  })
    .then(({ data }) => {
      return data.getRandomStarship;
    })
    .catch((error) => {
      console.error('Failed to get starships page', error);
      return undefined;
    });

  if (!yourStarship || !opponentsStarship) {
    notFound();
  }

  return (
    <Battle yourStarship={yourStarship} opponentsStarship={opponentsStarship} />
  );
}
