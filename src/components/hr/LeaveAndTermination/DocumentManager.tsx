import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, Trash2, CheckCircle2, XCircle } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: string;
  size: string;
}

const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'CTPS.pdf',
      type: 'Carteira de Trabalho',
      status: 'approved',
      uploadDate: '24/03/2024',
      size: '2.5 MB'
    },
    {
      id: '2',
      name: 'RG.pdf',
      type: 'Documento de Identidade',
      status: 'pending',
      uploadDate: '23/03/2024',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Atestado.pdf',
      type: 'Atestado Médico',
      status: 'rejected',
      uploadDate: '22/03/2024',
      size: '1.2 MB'
    }
  ]);

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <File className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciador de Documentos</h1>

      {/* Upload de Documentos */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <select className="w-full p-2 border rounded-md" id="tipoDocumento">
                  <option value="">Selecione o tipo</option>
                  <option value="ctps">Carteira de Trabalho</option>
                  <option value="rg">Documento de Identidade</option>
                  <option value="atestado">Atestado Médico</option>
                  <option value="comprovante">Comprovante de Residência</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="arquivo">Arquivo</Label>
                <div className="flex items-center space-x-2">
                  <Input type="file" id="arquivo" className="flex-1" />
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Enviados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.type}</p>
                    <p className="text-sm text-gray-500">
                      {doc.uploadDate} • {doc.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <File className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status dos Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <File className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-600">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-gray-600">Aprovados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-gray-600">Rejeitados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManager; 