
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

interface DocumentUploadProps {
  onUpload: (file: File) => void;
}

export const DocumentUpload = ({ onUpload }: DocumentUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Upload className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Sube tu Documento
        </h2>
        <p className="text-gray-600">
          Sube un documento para iniciar una conversación inteligente sobre su contenido
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
          dragOver
            ? 'border-purple-400 bg-purple-50 scale-105'
            : selectedFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 bg-white/50 hover:border-purple-300 hover:bg-purple-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Archivo Seleccionado</h3>
            <p className="text-gray-600 mb-1">{selectedFile.name}</p>
            <p className="text-sm text-gray-500 mb-6">
              {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleUpload}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
              >
                Comenzar a Chatear
              </Button>
              <Button variant="outline" onClick={clearFile} className="px-4">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Arrastra tu documento aquí
            </h3>
            <p className="text-gray-500 mb-6">
              O haz clic para explorar archivos de tu computadora
            </p>
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.txt,.md"
            />
            <label htmlFor="file-upload">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white cursor-pointer">
                <span>Explorar Archivos</span>
              </Button>
            </label>
            <div className="mt-4 text-xs text-gray-400">
              Formatos soportados: PDF, DOC, DOCX, TXT, MD
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
