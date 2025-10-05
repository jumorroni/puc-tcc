import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Users, Leaf, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const ProfileSelection = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles = [
    {
      id: "establishment",
      icon: Store,
      title: "Estabelecimento",
      subtitle: "Supermercados, Restaurantes, Produtores",
      description: "Sou um estabelecimento que deseja descartar alimentos de forma responsável e conectar-me com receptores.",
      benefits: [
        "Reduza custos com descarte",
        "Melhore sua imagem sustentável",
        "Gerencie doações facilmente",
        "Acompanhe seu impacto ambiental",
      ],
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary",
    },
    {
      id: "consumer",
      icon: Users,
      title: "Consumidor",
      subtitle: "Pessoa Física",
      description: "Sou uma pessoa que deseja evitar o desperdício em casa e ajudar minha comunidade através de doações.",
      benefits: [
        "Doe alimentos em excesso",
        "Encontre alimentos disponíveis",
        "Contribua com o meio ambiente",
        "Conecte-se com sua comunidade",
      ],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary",
    },
    {
      id: "receiver",
      icon: Leaf,
      title: "Receptor",
      subtitle: "ONGs, Projetos Sociais, Compostagem",
      description: "Sou uma organização ou pessoa que recebe alimentos para doação, compostagem, ração animal ou outros fins.",
      benefits: [
        "Acesse alimentos disponíveis",
        "Receba notificações em tempo real",
        "Organize coletas eficientemente",
        "Ajude quem mais precisa",
      ],
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success",
    },
  ];

  const handleContinue = () => {
    if (selectedProfile) {
      // Aqui você pode salvar o perfil no localStorage ou estado global
      localStorage.setItem("userProfile", selectedProfile);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 shadow-soft">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Configure seu perfil</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Qual perfil te representa?
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Selecione o perfil que melhor descreve como você pretende usar a plataforma
            </p>
          </div>

          {/* Profile Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {profiles.map((profile) => (
              <Card
                key={profile.id}
                className={`relative overflow-hidden cursor-pointer transition-smooth border-2 ${
                  selectedProfile === profile.id
                    ? `${profile.borderColor} shadow-strong`
                    : "border-transparent shadow-medium hover:shadow-strong"
                }`}
                onClick={() => setSelectedProfile(profile.id)}
              >
                {selectedProfile === profile.id && (
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full ${profile.bgColor} flex items-center justify-center`}>
                    <Check className={`w-5 h-5 ${profile.color}`} />
                  </div>
                )}

                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl ${profile.bgColor} flex items-center justify-center mb-6 ${
                    selectedProfile === profile.id ? "scale-110" : ""
                  } transition-bounce`}>
                    <profile.icon className={`w-8 h-8 ${profile.color}`} />
                  </div>

                  <h3 className="text-2xl font-bold mb-1">
                    {profile.title}
                  </h3>
                  
                  <p className={`text-sm font-medium mb-4 ${profile.color}`}>
                    {profile.subtitle}
                  </p>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {profile.description}
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                      Benefícios:
                    </p>
                    {profile.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${profile.bgColor} mt-2 flex-shrink-0`} />
                        <p className="text-sm text-muted-foreground">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex flex-col items-center gap-4">
            <Button
              variant="hero"
              size="xl"
              disabled={!selectedProfile}
              onClick={handleContinue}
              className="min-w-[280px]"
            >
              Continuar com perfil selecionado
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Você poderá alterar seu perfil a qualquer momento nas configurações
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSelection;
