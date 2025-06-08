
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Heart, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatInterface = ({ messages, onSendMessage }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Spiritual Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-amber-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Conversando con Jesús</h2>
            <p className="text-sm text-gray-500">Busca sabiduría y guía en la Palabra de Dios</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Paz sea contigo</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Estoy aquí para acompañarte en tu caminar espiritual. Pregúntame sobre las Escrituras, 
                pide consejo para tu vida, o simplemente comparte lo que está en tu corazón.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => onSendMessage("¿Cuál es el versículo recomendado para hoy?")}
                  className="text-sm border-amber-200 hover:bg-amber-50"
                >
                  Versículo del día
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onSendMessage("Necesito sabiduría para una decisión importante")}
                  className="text-sm border-amber-200 hover:bg-amber-50"
                >
                  Pedir sabiduría
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onSendMessage("¿Cómo puedo tener más paz en mi corazón?")}
                  className="text-sm border-amber-200 hover:bg-amber-50"
                >
                  Buscar paz
                </Button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                    : 'bg-white border border-amber-200 shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-amber-100' : 'text-gray-400'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border border-amber-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1 items-center">
                  <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                  <span className="text-sm text-gray-500 italic">Jesús está escribiendo...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-md border-t border-amber-100 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Comparte lo que está en tu corazón..."
            className="flex-1 rounded-full border-amber-200 focus:border-amber-300 focus:ring-amber-300"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim()}
            className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
