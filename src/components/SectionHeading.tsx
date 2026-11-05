interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      <p className={`text-sm font-800 uppercase tracking-[0.2em] ${isDark ? 'text-cempasuchil-300' : 'text-rosa-600'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-4xl sm:text-5xl ${isDark ? 'text-white' : 'text-cacao-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-[1.5] sm:text-lg ${isDark ? 'text-verde-100' : 'text-cacao-500'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
