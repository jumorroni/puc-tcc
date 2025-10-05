import { Leaf, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">FoodShare</span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6 max-w-md">
              Conectando pessoas e estabelecimentos no combate ao desperdício de alimentos. 
              Juntos, criamos um futuro mais sustentável e solidário.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-background/10 hover:text-background">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-background/10 hover:text-background">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-background/10 hover:text-background">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-background/10 hover:text-background">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Plataforma</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Para estabelecimentos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Para receptores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Suporte</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Central de ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Termos de uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-smooth">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 FoodShare. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-background/60">
            <Leaf className="w-4 h-4 text-primary" />
            <span>Feito com propósito para um mundo melhor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
