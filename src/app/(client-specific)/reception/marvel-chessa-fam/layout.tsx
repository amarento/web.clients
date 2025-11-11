'use client';

import Header from './header/page';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}