import { query } from '../../../../utils/ApolloClient';
import { GetPaginatedStarshipsDocument } from '../../../../../../libs/graphql/lib/__generated__/types';
import StarshipCard from '../../../_components/StarshipCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ListPage({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const page = await params.then((params) => Number(params.page ?? 0));

  const starships = await query({
    query: GetPaginatedStarshipsDocument,
    variables: { page, size: 12 },
  })
    .then(({ data }) => {
      return data.getPaginatedStarships;
    })
    .catch((error) => {
      console.error('Failed to get starships page', error);
      return [];
    });

  if (!starships.length) {
    redirect('/');
  }

  return (
    <>
      <h1 className="text-5xl font-bold mb-4">Choose your ship!</h1>
      <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {starships.map((starship) => (
          <Link
            href={`/battle/${starship.id}`}
            key={starship.id}
            className="[&>*]:hover:bg-zinc-100"
          >
            <StarshipCard {...starship} />
          </Link>
        ))}
      </div>
      <div className="flex my-2">
        {page !== 0 && (
          <Link
            href={`/list/${page === 1 ? '' : page - 1}`}
            className="px-4 py-2 shadow-md hover:bg-zinc-100 rounded-sm"
          >
            Previous
          </Link>
        )}
        <Link
          href={`/list/${page + 1}`}
          className="px-4 py-2 shadow-md hover:bg-zinc-100 self-end ml-auto rounded-sm"
        >
          Next
        </Link>
      </div>
    </>
  );
}
