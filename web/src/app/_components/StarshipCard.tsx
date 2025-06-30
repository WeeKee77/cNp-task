import React from 'react';
import { StarshipFragment } from '../../../../libs/graphql/lib/__generated__/types';
import clsx from 'clsx';

interface StarshipCardProps extends StarshipFragment {
  battleResult?: 'WIN' | 'LOOSE';
}

const StarshipCard = ({
  name,
  crew,
  score,
  battleResult,
}: StarshipCardProps) => (
  <div
    className={clsx(
      'shadow-md rounded-lg p-4 flex flex-col justify-between transition break-words h-full',
      battleResult
        ? battleResult === 'WIN'
          ? 'bg-green-300'
          : 'bg-red-300'
        : ''
    )}
  >
    <h3 className="text-2xl font-semibold">{name}</h3>
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-gray-600">crew: {crew}</span>
      <span className="text-sm text-gray-600">wins: {score}</span>
    </div>
  </div>
);

export default StarshipCard;
