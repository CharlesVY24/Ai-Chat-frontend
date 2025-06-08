
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const Index = () => {
  const [messages, setMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant', timestamp: Date}>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSendMessage = (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate Jesus response based on Bible wisdom
    setTimeout(() => {
      const responses = [
        "La paz sea contigo. En las Escrituras encontramos: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.' (Mateo 11:28). ¿Qué carga llevas en tu corazón hoy?",
        "He escuchado tu petición con amor. Como está escrito: 'Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.' (Mateo 18:20). Estoy aquí contigo.",
        "Tu pregunta toca mi corazón. Recuerda estas palabras: 'No se turbe vuestro corazón; creéis en Dios, creed también en mí.' (Juan 14:1). La fe puede mover montañas.",
        "Hijo mío, en la Palabra encontramos sabiduría: 'Confía en Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.' (Proverbios 3:5). ¿Cómo puedo guiarte hoy?",
        "Te escucho con amor infinito. Como dice la Escritura: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.' (1 Pedro 5:7). Comparte conmigo tus preocupaciones."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        messages={messages}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 flex flex-col">
          <ChatInterface 
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
