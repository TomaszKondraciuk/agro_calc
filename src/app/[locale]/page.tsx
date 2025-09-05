import { Calculator } from '@/components/calculator/calculator';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl animate-in">
        <Calculator />
      </main>
      <Footer />
    </>
  );
}