import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Users, TrendingDown } from "lucide-react";
import heroImage from "@/assets/hero-food-sharing.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Compartilhamento de alimentos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 shadow-soft">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">Juntos contra o desperdício</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transforme{" "}
            <span className="text-primary">alimentos</span>{" "}
            em{" "}
            <span className="text-secondary">oportunidades</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Conectamos quem tem alimentos para compartilhar com quem precisa. 
            Reduza o desperdício, ajude o planeta e fortaleça sua comunidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group" onClick={() => window.location.href = '/selecionar-perfil'}>
              Começar agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}>
              Saiba como funciona
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">1.200+</div>
              <div className="text-sm text-muted-foreground">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-success">5.4 ton</div>
              <div className="text-sm text-muted-foreground">Alimentos salvos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingDown className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-secondary">-89%</div>
              <div className="text-sm text-muted-foreground">Desperdício</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
