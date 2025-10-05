import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, Shield, Sprout } from "lucide-react";

export const EducationalTips = () => {
  const tips = [
    {
      icon: Lightbulb,
      category: "Armazenamento",
      title: "Como conservar alimentos por mais tempo",
      description: "Aprenda técnicas simples de armazenamento que podem aumentar a vida útil dos seus alimentos em até 50%.",
      tips: [
        "Mantenha vegetais em recipientes herméticos",
        "Congele frutas maduras para uso posterior",
        "Use o método FIFO (First In, First Out)",
      ],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Shield,
      category: "Validade",
      title: "Entenda os prazos de validade",
      description: "Nem sempre a data de validade significa que o alimento está impróprio. Saiba a diferença entre os tipos de data.",
      tips: [
        "'Consumir até': limite de segurança alimentar",
        "'Melhor antes de': qualidade ideal",
        "Use seus sentidos: visão, olfato e paladar",
      ],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Sprout,
      category: "Compostagem",
      title: "Transforme restos em adubo",
      description: "Restos vegetais podem virar adubo rico em nutrientes para plantas. Comece sua composteira caseira.",
      tips: [
        "Misture restos verdes e marrons",
        "Mantenha úmido mas não encharcado",
        "Adubo pronto em 2-3 meses",
      ],
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4 shadow-soft">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Educação & Conscientização</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Boas Práticas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprenda dicas valiosas para evitar o desperdício e aproveitar melhor seus alimentos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <Card key={index} className="border-0 shadow-medium hover:shadow-strong transition-smooth group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-smooth" />
              
              <CardContent className="p-8 relative">
                <div className={`w-14 h-14 rounded-xl ${tip.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                  <tip.icon className={`w-7 h-7 ${tip.color}`} />
                </div>

                <Badge variant="secondary" className="mb-4">
                  {tip.category}
                </Badge>

                <h3 className="text-xl font-bold mb-3">
                  {tip.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {tip.description}
                </p>

                <div className="space-y-3">
                  {tip.tips.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${tip.bgColor} mt-2 flex-shrink-0`} />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-muted/50 rounded-2xl shadow-soft">
            <BookOpen className="w-12 h-12 text-primary" />
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Quer aprender mais?
              </h3>
              <p className="text-muted-foreground mb-4">
                Acesse nossa biblioteca completa de conteúdos educativos sobre sustentabilidade alimentar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
