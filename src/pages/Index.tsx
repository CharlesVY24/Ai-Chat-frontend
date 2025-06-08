
import { useState } from "react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ChatInterface } from "@/components/ChatInterface";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const Index = () => {
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [messages, setMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant', timestamp: Date}>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDocumentUpload = (file: File) => {
    setUploadedDocument(file);
    setMessages([]);
  };

  const handleSendMessage = (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${content}". I can help you analyze the uploaded document "${uploadedDocument?.name || 'your document'}". This is a simulated response - in a real implementation, this would be connected to an AI service that processes your document.`,
        role: 'assistant' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        uploadedDocument={uploadedDocument}
        messages={messages}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 flex flex-col">
          {!uploadedDocument ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <DocumentUpload onUpload={handleDocumentUpload} />
            </div>
          ) : (
            <ChatInterface 
              messages={messages}
              onSendMessage={handleSendMessage}
              documentName={uploadedDocument.name}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
