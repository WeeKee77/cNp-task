import Link from 'next/link';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">SpaceShip Battle Game</h1>
      <div className="flex justify-between">
        <Link
          href="/battle"
          className="text-lg font-semibold px-4 py-2 shadow-md animated-background bg-gradient-to-r from-purple-400 via-green-400 to-red-400 rounded-md text-white hover:outline-4 hover:outline-red-600 outline-none"
        >
          Random Battle
        </Link>
        <Link
          href="/list"
          className="text-lg font-semibold px-4 py-2 shadow-md rounded-md hover:bg-zinc-100"
        >
          Choose your ship
        </Link>
      </div>
    </div>
  );
}
