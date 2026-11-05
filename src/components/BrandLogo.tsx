interface BrandLogoProps {
  variant?: 'default' | 'inverse';
  className?: string;
}

const OFFICIAL_LOGO = '/images/flamante.png';

export default function BrandLogo({ variant = 'default', className = '' }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={OFFICIAL_LOGO}
        alt="Logotipo oficial de Flamante: máscara mexicana"
        className={`h-12 w-28 rounded-xl object-contain object-center shadow-sm ring-1 ring-cacao-900/10 sm:h-14 sm:w-32 ${
          variant === 'inverse' ? 'ring-white/20' : ''
        }`}
      />
      <span className="font-display text-2xl tracking-wide text-white sm:text-3xl">Flamante</span>
    </span>
  );
}
