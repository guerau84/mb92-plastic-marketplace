import { useI18n } from "@/lib/i18n";
import heroBg from "@/assets/hero-bg.jpg";
import { Recycle } from "lucide-react";

const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/75" />
      </div>
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Recycle className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent tracking-wide uppercase">
              {t.hero.pp}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
