'use client';

import {
  StarshipFragment,
  UpdateScoreDocument,
} from '../../../../../../libs/graphql/lib/__generated__/types';
import StarshipCard from '../../../_components/StarshipCard';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';

interface BattleProps {
  yourStarship: StarshipFragment;
  opponentsStarship: StarshipFragment;
}

const Battle = ({ yourStarship, opponentsStarship }: BattleProps) => {
  const [battled, setBattled] = useState(false);

  const [updateScore] = useMutation(UpdateScoreDocument, {
    variables: {
      id: Number(
        yourStarship.crew > opponentsStarship.crew
          ? yourStarship.id
          : opponentsStarship.id
      ),
    },
  });

  return (
    <>
      <div className="grid grid-cols-3">
        <StarshipCard
          {...yourStarship}
          battleResult={
            battled
              ? yourStarship.crew > opponentsStarship.crew
                ? 'WIN'
                : 'LOOSE'
              : undefined
          }
        />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl">Battle</h1>
          <span className="text-4xl font-bold">VS</span>
        </div>
        <StarshipCard
          {...opponentsStarship}
          battleResult={
            battled
              ? yourStarship.crew <= opponentsStarship.crew
                ? 'WIN'
                : 'LOOSE'
              : undefined
          }
        />
      </div>
      <div className="flex flex-col items-center">
        {battled ? (
          <Link
            className="py-2 px-4 shadow text-lg font-semibold rounded-md hover:bg-zinc-100"
            onClick={() => {
              setBattled(false);
            }}
            href={`/battle/${yourStarship.id}`}
          >
            Next Battle
          </Link>
        ) : (
          <button
            onClick={() => {
              setBattled(true);
              updateScore().then((r) => console.log(r));
            }}
            className="py-2 px-4 shadow text-lg font-semibold rounded-md hover:bg-zinc-100"
          >
            Battle!!!
          </button>
        )}
      </div>
    </>
  );
};

export default Battle;
