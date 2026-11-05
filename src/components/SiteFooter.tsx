import BrandLogo from '@/components/BrandLogo';

export default function SiteFooter() {
  return (
    <footer className="border-t border-cacao-900/10 bg-crema-100 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <BrandLogo />
        <p className="text-sm text-cacao-500">
          © 2026 Flamante. Hecho con sabor mexicano.
        </p>
      </div>
    </footer>
  );
}
