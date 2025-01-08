import Providers from '@/components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 