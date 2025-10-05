import { Button } from "@/components/ui/button";
import { Leaf, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FoodShare</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-foreground hover:text-primary transition-smooth font-medium">
              Como funciona
            </a>
            <a href="#doar" className="text-foreground hover:text-primary transition-smooth font-medium">
              Doar
            </a>
            <a href="#alimentos" className="text-foreground hover:text-primary transition-smooth font-medium">
              Alimentos
            </a>
            <a href="#impacto" className="text-foreground hover:text-primary transition-smooth font-medium">
              Impacto
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">
              Entrar
            </Button>
            <Button variant="default" onClick={() => window.location.href = '/selecionar-perfil'}>
              Começar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#como-funciona" className="text-foreground hover:text-primary transition-smooth font-medium">
                Como funciona
              </a>
              <a href="#doar" className="text-foreground hover:text-primary transition-smooth font-medium">
                Doar
              </a>
              <a href="#alimentos" className="text-foreground hover:text-primary transition-smooth font-medium">
                Alimentos
              </a>
              <a href="#impacto" className="text-foreground hover:text-primary transition-smooth font-medium">
                Impacto
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="w-full">
                  Entrar
                </Button>
                <Button variant="default" className="w-full" onClick={() => window.location.href = '/selecionar-perfil'}>
                  Começar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
