import './global.css';
import { Roboto } from 'next/font/google';
import { ApolloWrapper } from './ApolloWrapper';
import Link from 'next/link';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Starships game',
  description: 'Starships game page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <nav className="sticky top-0 h-12 w-full shadow-md z-50 bg-white flex items-center px-4">
          <Link href="/" className="text-2xl">
            🏠
          </Link>
        </nav>
        <div className="wrapper">
          <ApolloWrapper>
            <div className="container">{children}</div>
          </ApolloWrapper>
        </div>
      </body>
    </html>
  );
}
