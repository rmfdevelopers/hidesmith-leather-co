import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Hidesmith Leather Co.',
  description: 'Bespoke leather bags, wallets, and accessories handcrafted to order in Lagos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} bg-[#1A1A1A] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}