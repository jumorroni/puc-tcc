import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Apple, Package, ArrowRight } from "lucide-react";

export const DonationTypes = () => {
  const donationTypes = [
    {
      icon: Sprout,
      title: "Doar Adubo/Compostagem",
      description: "Restos orgânicos que podem ser transformados em adubo rico para agricultura e jardinagem.",
      examples: "Cascas de frutas, verduras, borra de café",
      color: "text-success",
      bgColor: "bg-success/10",
      gradient: "from-success/20 to-success/5",
    },
    {
      icon: Apple,
      title: "Alimentos para Consumo",
      description: "Alimentos frescos próximos ao vencimento, mas ainda próprios para consumo humano.",
      examples: "Frutas maduras, pães, laticínios, vegetais",
      color: "text-primary",
      bgColor: "bg-primary/10",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Package,
      title: "Alimentos Industrializados",
      description: "Produtos embalados e não perecíveis que podem ajudar famílias necessitadas.",
      examples: "Enlatados, grãos, massas, conservas",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      gradient: "from-secondary/20 to-secondary/5",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O que você deseja doar?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o tipo de doação que você tem disponível e conecte-se com quem precisa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {donationTypes.map((type, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-0 shadow-medium hover:shadow-strong transition-smooth group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-smooth`} />
              
              <CardContent className="p-8 relative">
                <div className={`w-16 h-16 rounded-2xl ${type.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce`}>
                  <type.icon className={`w-8 h-8 ${type.color}`} />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {type.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {type.description}
                </p>

                <div className={`text-sm ${type.color} font-medium mb-6 p-3 rounded-lg ${type.bgColor}`}>
                  <span className="opacity-70">Exemplos: </span>
                  {type.examples}
                </div>

                <Button 
                  variant="default" 
                  className="w-full group/btn"
                >
                  Cadastrar doação
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-background rounded-xl shadow-soft">
          <p className="text-muted-foreground">
            Não sabe qual opção escolher? 
            <a href="#" className="text-primary font-medium hover:underline ml-1">
              Veja nosso guia de classificação de alimentos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
