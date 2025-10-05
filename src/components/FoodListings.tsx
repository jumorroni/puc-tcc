import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, MapPin, Package } from "lucide-react";

export const FoodListings = () => {
  const listings = [
    {
      id: 1,
      title: "Frutas e Verduras Frescas",
      category: "Hortifruti",
      quantity: "15 kg",
      location: "Centro, São Paulo",
      timeLeft: "2 horas",
      image: "🥬",
      donor: "Mercado Verde",
      status: "Disponível",
    },
    {
      id: 2,
      title: "Pães do Dia Anterior",
      category: "Padaria",
      quantity: "50 unidades",
      location: "Vila Mariana, SP",
      timeLeft: "4 horas",
      image: "🥖",
      donor: "Padaria Artesanal",
      status: "Disponível",
    },
    {
      id: 3,
      title: "Sobras de Refeição",
      category: "Restaurante",
      quantity: "30 porções",
      location: "Pinheiros, SP",
      timeLeft: "1 hora",
      image: "🍱",
      donor: "Restaurante Bom Sabor",
      status: "Urgente",
    },
    {
      id: 4,
      title: "Laticínios Próximos ao Vencimento",
      category: "Supermercado",
      quantity: "25 itens",
      location: "Jardins, SP",
      timeLeft: "6 horas",
      image: "🥛",
      donor: "Super Express",
      status: "Disponível",
    },
  ];

  return (
    <section className="py-20" id="alimentos">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Alimentos Disponíveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja o que está disponível para retirada em sua região agora mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden border-0 shadow-soft hover:shadow-strong transition-smooth group">
              <div className="relative h-48 bg-gradient-card flex items-center justify-center">
                <div className="text-7xl group-hover:scale-110 transition-bounce">
                  {listing.image}
                </div>
                <Badge 
                  className={`absolute top-4 right-4 ${
                    listing.status === "Urgente" 
                      ? "bg-destructive text-destructive-foreground" 
                      : "bg-success text-success-foreground"
                  }`}
                >
                  {listing.status}
                </Badge>
              </div>

              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-smooth">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{listing.donor}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>{listing.quantity} • {listing.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Disponível por {listing.timeLeft}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button 
                  variant="default" 
                  className="w-full"
                >
                  Solicitar retirada
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver todos os alimentos disponíveis
          </Button>
        </div>
      </div>
    </section>
  );
};
