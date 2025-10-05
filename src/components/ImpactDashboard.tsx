import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Leaf, Users, Heart, Clock, Recycle } from "lucide-react";

export const ImpactDashboard = () => {
  const metrics = [
    {
      icon: Leaf,
      value: "5.4",
      unit: "toneladas",
      label: "Alimentos salvos",
      trend: "+23%",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Users,
      value: "1.234",
      unit: "pessoas",
      label: "Beneficiadas",
      trend: "+18%",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Heart,
      value: "892",
      unit: "doações",
      label: "Realizadas este mês",
      trend: "+31%",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Clock,
      value: "2.5",
      unit: "horas",
      label: "Tempo médio de retirada",
      trend: "-12%",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Recycle,
      value: "89%",
      unit: "redução",
      label: "Desperdício evitado",
      trend: "+8%",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: TrendingUp,
      value: "12.8",
      unit: "ton CO₂",
      label: "Emissões evitadas",
      trend: "+27%",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="impacto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4 shadow-soft">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Nosso Impacto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Resultados que Transformam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe em tempo real o impacto positivo da nossa comunidade no combate ao desperdício
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-smooth group cursor-pointer overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-smooth" />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    metric.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                  }`}>
                    {metric.trend}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {metric.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-hero text-primary-foreground shadow-strong">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Cada ação conta!
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Juntos, já evitamos o equivalente a <strong>12.8 toneladas de CO₂</strong> na atmosfera. 
              Isso é como plantar <strong>640 árvores</strong> ou tirar <strong>5 carros</strong> de circulação por um ano.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                <span>Sustentável</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-primary-foreground" />
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Solidário</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-primary-foreground" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Comunitário</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
