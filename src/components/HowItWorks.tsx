import { Store, Users, Leaf, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HowItWorks = () => {
  const profiles = [
    {
      icon: Store,
      title: "Estabelecimentos",
      description: "Supermercados, restaurantes e produtores podem cadastrar alimentos próximos ao vencimento ou com imperfeições estéticas.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      title: "Consumidores",
      description: "Pessoas que desejam evitar o desperdício em casa podem doar ou encontrar alimentos disponíveis na região.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Leaf,
      title: "Receptores",
      description: "ONGs, projetos sociais e pessoas que aproveitam alimentos para compostagem, ração animal ou autoconsumo.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="como-funciona">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Como funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma que conecta três perfis essenciais no combate ao desperdício de alimentos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {profiles.map((profile, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-medium hover:shadow-strong transition-smooth group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-smooth" />
              
              <CardContent className="p-8 relative">
                <div className={`w-16 h-16 rounded-2xl ${profile.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce`}>
                  <profile.icon className={`w-8 h-8 ${profile.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{profile.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.description}
                </p>

                <div className="mt-6 flex items-center text-primary font-medium group-hover:gap-2 transition-smooth">
                  Saiba mais
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-12 h-0.5 bg-primary/30" />
            <span className="text-sm font-medium">Todos juntos pelo mesmo objetivo</span>
            <div className="w-12 h-0.5 bg-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
