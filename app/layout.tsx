import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'Hidesmith Leather Co. | Handcrafted in Lagos',
  description: 'Bespoke handcrafted leather bags, wallets, and accessories meticulously constructed in Lagos for those who appreciate lifetime durability.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased bg-[#1E1E1E]`}>
        {children}
      </body>
    </html>
  );
}