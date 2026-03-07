import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/portfolio/Navbar';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'b.max.dev Portfolio',
  description: 'Sleek personal portfolio for b.max.dev showcasing projects, skills, and work.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="font-body antialiased selection:bg-primary selection:text-primary-foreground relative" 
        suppressHydrationWarning
      >
        <FirebaseClientProvider>
          <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] electric-blur opacity-10 pointer-events-none z-0" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] electric-blur opacity-5 pointer-events-none z-0" />
          
          <Navbar />
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
