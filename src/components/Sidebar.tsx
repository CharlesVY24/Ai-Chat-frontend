
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, MessageSquare, Plus, Trash2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  uploadedDocument: File | null;
  messages: Message[];
}

export const Sidebar = ({ isOpen, uploadedDocument, messages }: SidebarProps) => {
  if (!isOpen) return null;

  const chatSessions = [
    { id: '1', name: 'Análisis de Informe Financiero', lastMessage: 'hace 2 horas' },
    { id: '2', name: 'Revisión de Documento Legal', lastMessage: 'hace 1 día' },
    { id: '3', name: 'Resumen de Artículo de Investigación', lastMessage: 'hace 3 días' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-md border-r border-purple-100 flex flex-col z-40">
      <div className="p-4 border-b border-purple-100">
        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white gap-2">
          <Plus className="h-4 w-4" />
          Nueva Conversación
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {uploadedDocument && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Documento Actual</h3>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700 truncate">
                  {uploadedDocument.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {(uploadedDocument.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Conversaciones Recientes</h3>
          <div className="space-y-2">
            {chatSessions.map((session) => (
              <div
                key={session.id}
                className="group p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors border border-transparent hover:border-purple-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MessageSquare className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {session.name}
                      </p>
                      <p className="text-xs text-gray-500">{session.lastMessage}</p>
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
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Sesión Actual</h3>
            <div className="text-xs text-gray-500">
              {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
