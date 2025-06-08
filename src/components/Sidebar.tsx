import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageSquare, Plus, Trash2, Book, HandHeart } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: Message[];
}

export const Sidebar = ({ isOpen, messages }: SidebarProps) => {
  if (!isOpen) return null;

  const prayerTopics = [
    { id: '1', name: 'Oración por la Familia', lastMessage: 'hace 2 horas' },
    { id: '2', name: 'Búsqueda de Propósito', lastMessage: 'hace 1 día' },
    { id: '3', name: 'Sanación del Corazón', lastMessage: 'hace 3 días' },
  ];

  const dailyVerses = [
    "No temas, porque yo estoy contigo - Isaías 41:10",
    "Todo lo puedo en Cristo que me fortalece - Filipenses 4:13",
    "Jehová es mi pastor, nada me faltará - Salmo 23:1"
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-md border-r border-amber-100 flex flex-col z-40">
      <div className="p-4 border-b border-amber-100">
        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white gap-2">
          <Plus className="h-4 w-4" />
          Nueva Conversación
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Book className="h-4 w-4 text-amber-600" />
            Versículo del Día
          </h3>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-700 italic">
              "{dailyVerses[0]}"
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <HandHeart className="h-4 w-4 text-amber-600" />
            Temas de Oración
          </h3>
          <div className="space-y-2">
            {prayerTopics.map((topic) => (
              <div
                key={topic.id}
                className="group p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors border border-transparent hover:border-amber-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MessageSquare className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {topic.name}
                      </p>
                      <p className="text-xs text-gray-500">{topic.lastMessage}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {messages.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-amber-600" />
              Conversación Actual
            </h3>
            <div className="text-xs text-gray-500">
              {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
