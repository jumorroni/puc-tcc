import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function MyMessages() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-2">
            Minhas Mensagens
          </h1>
          <p className="text-gray-600">Suas conversas sobre os itens</p>
        </div>
        <Card className="border-emerald-100">
          <CardContent className="text-center py-24">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Em Breve</h2>
            <p className="text-gray-500 mt-2">
              Estamos trabalhando para criar uma central de mensagens completa para você.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}