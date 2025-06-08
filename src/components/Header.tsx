
import { Button } from "@/components/ui/button";
import { Menu, Heart } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-amber-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Palabras de Vida
            </h1>
            <p className="text-xs text-gray-500">Conversando con Jesús</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full">
          Bendición
        </div>
      </div>
    </header>
  );
};
