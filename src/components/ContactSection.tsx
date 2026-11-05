import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { RESTAURANT_INFO } from '@/data/site';

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  WhatsApp: MessageCircle,
};

export default function ContactSection() {
  return (
    <section id="contacto" className="section-anchor relative overflow-hidden bg-verde-900 px-5 py-20 text-verde-50 sm:px-8 sm:py-28">
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-cempasuchil-400/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="space-y-10">
          <SectionHeading
            align="left"
            tone="dark"
            eyebrow="Contacto"
            title="Visítanos o escríbenos"
            description="Te esperamos con la mesa lista y el chile recién tostado."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard icon={MapPin} title="Ubicación">
              <p>{RESTAURANT_INFO.address}</p>
            </InfoCard>

            <InfoCard icon={Clock} title="Horarios">
              <ul className="space-y-2">
                {RESTAURANT_INFO.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-4">
                    <span className="text-verde-100">{slot.days}</span>
                    <span className="font-800 text-white">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard icon={Phone} title="Teléfono">
              <a href={RESTAURANT_INFO.phoneHref} className="font-600 text-white underline-offset-4 hover:underline">
                {RESTAURANT_INFO.phone}
              </a>
            </InfoCard>

            <InfoCard icon={Mail} title="Correo">
              <a href={RESTAURANT_INFO.emailHref} className="font-600 text-white underline-offset-4 hover:underline">
                {RESTAURANT_INFO.email}
              </a>
            </InfoCard>
          </div>

          <div>
            <p className="text-sm font-800 uppercase tracking-[0.2em] text-cempasuchil-300">Síguenos</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {RESTAURANT_INFO.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-800 text-white ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cempasuchil-400 hover:text-cacao-900 hover:ring-cempasuchil-400"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.pexels.com/photos/24246006/pexels-photo-24246006.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Interior del restaurante Flamante con mantel de colores vibrantes"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl sm:aspect-[4/3] lg:aspect-[4/5]"
          />
          <a
            href={RESTAURANT_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-6 left-6 right-6 block rounded-2xl bg-cempasuchil-400 p-5 text-cacao-900 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-cempasuchil-300 hover:shadow-2xl sm:left-auto sm:right-8 sm:w-72"
          >
            <p className="font-display text-2xl">¿Evento especial?</p>
            <p className="mt-1 text-sm text-cacao-800">Reserva tu mesa escribiéndonos por WhatsApp.</p>
          </a>
        </div>
      </div>
    </section>
  );
}

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition duration-300 hover:bg-white/10">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-cempasuchil-400 text-cacao-900">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-800 text-white">{title}</h3>
      <div className="mt-2 text-sm leading-[1.5] text-verde-100">{children}</div>
    </div>
  );
}
