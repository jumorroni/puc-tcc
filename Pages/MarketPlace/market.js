
import React, { useState, useEffect, useRef } from "react";
import { FoodItem } from "@/entities/FoodItem";
import { Collection } from "@/entities/Collection";
import { User } from "@/entities/User";
import { Message } from "@/entities/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added Input import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added Select imports
import { Search, Filter, MapPin, Calendar, Package, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription, // Ensure all necessary dialog components are imported
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import FoodCard from "../components/marketplace/FoodCard";
import ChatBubble from "../components/chat/ChatBubble";

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [reserveData, setReserveData] = useState({
    scheduled_date: "",
    notes: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, categoryFilter, conditionFilter]);
  
  useEffect(() => {
    if (showDetailDialog && selectedItem) {
      loadMessages();
      const interval = setInterval(loadMessages, 5000); // Poll for new messages every 5 seconds
      return () => clearInterval(interval);
    }
  }, [showDetailDialog, selectedItem]);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadData = async () => {
    // Mock user for testing
    const mockUser = {
      id: "user123",
      full_name: "João Silva",
      email: "joao@example.com",
    };
    setUser(mockUser);

    // Mock food items
    const mockItems = [
      {
        id: "1",
        donor_id: "donor456",
        title: "Maçãs Orgânicas",
        description: "Maçãs gala frescas, colhidas hoje.",
        quantity: 5,
        unit: "kg",
        category: "frutas",
        condition: "otimo",
        expiry_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        pickup_address: "Rua das Flores, 123",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        donor_id: "user123", // self-donated
        title: "Pães Integrais",
        description: "Pães integrais feitos na padaria local. Próximo do vencimento.",
        quantity: 3,
        unit: "unidades",
        category: "panificados",
        condition: "proximo_vencimento",
        expiry_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
        pickup_address: "Av. Central, 456",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        donor_id: "donor789",
        title: "Tomates Maduros",
        description: "Tomates cereja bem maduros, perfeitos para molhos.",
        quantity: 1,
        unit: "bandeja",
        category: "verduras",
        condition: "apenas_processamento",
        expiry_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        pickup_address: "Travessa do Sol, 789",
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        donor_id: "donor456",
        title: "Leite Pasteurizado",
        description: "Caixas de leite integral, perto do prazo de validade.",
        quantity: 4,
        unit: "litros",
        category: "laticínios",
        condition: "proximo_vencimento",
        expiry_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        pickup_address: "Rua das Flores, 123",
        created_at: new Date().toISOString(),
      },
      {
        id: "5",
        donor_id: "donor101",
        title: "Cenouras Frescas",
        description: "Cenouras da horta, tamanho médio.",
        quantity: 2,
        unit: "kg",
        category: "legumes",
        condition: "otimo",
        expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        pickup_address: "Fazenda Verde, Km 10",
        created_at: new Date().toISOString(),
      },
      {
        id: "6",
        donor_id: "donor101",
        title: "Feijão Carioca",
        description: "Pacotes de feijão carioca, novo.",
        quantity: 10,
        unit: "kg",
        category: "graos_cereais",
        condition: "bom",
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        pickup_address: "Fazenda Verde, Km 10",
        created_at: new Date().toISOString(),
      },
    ];

    // Filter out items donated by the mock user
    const availableItems = mockItems.filter(item => item.donor_id !== mockUser.id);
    setItems(availableItems);
  };

  const filterItems = () => {
    let tempItems = [...items];

    if (searchTerm) {
      tempItems = tempItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      tempItems = tempItems.filter((item) => item.category === categoryFilter);
    }

    if (conditionFilter !== "all") {
      tempItems = tempItems.filter((item) => item.condition === conditionFilter);
    }

    setFilteredItems(tempItems);
  };
  
  const loadMessages = async () => {
    if (!selectedItem || !user) return;
    // Mock messages for demonstration
    const mockMessages = [
      {
        id: "msg1",
        sender_id: user.id,
        sender_name: user.full_name,
        receiver_id: selectedItem.donor_id,
        food_item_id: selectedItem.id,
        food_item_title: selectedItem.title,
        content: `Olá, tenho interesse nas ${selectedItem.title}. Ainda estão disponíveis?`,
        created_date: new Date(Date.now() - 60 * 1000).toISOString(), // 1 minute ago
      },
      {
        id: "msg2",
        sender_id: selectedItem.donor_id,
        sender_name: "Doador Mock",
        receiver_id: user.id,
        food_item_id: selectedItem.id,
        food_item_title: selectedItem.title,
        content: `Olá! Sim, as ${selectedItem.title} estão disponíveis. Quantas unidades você gostaria?`,
        created_date: new Date(Date.now() - 30 * 1000).toISOString(), // 30 seconds ago
      },
    ];

    // Simulate fetching messages relevant to the current user and selected item
    const relevantMessages = mockMessages.filter(m => 
      m.food_item_id === selectedItem.id &&
      ((m.sender_id === user.id && m.receiver_id === selectedItem.donor_id) ||
       (m.sender_id === selectedItem.donor_id && m.receiver_id === user.id))
    );
    setMessages(relevantMessages.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // In a real application, this would call an API or an ORM like Message.create
      const messageToSend = {
        id: `msg-${Date.now()}`,
        sender_id: user.id,
        sender_name: user.full_name,
        receiver_id: selectedItem.donor_id,
        food_item_id: selectedItem.id,
        food_item_title: selectedItem.title,
        content: newMessage,
        created_date: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, messageToSend]);
      setNewMessage("");
      // loadMessages(); // Re-fetch to ensure consistency if real backend is used, or simply update state
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Erro ao enviar mensagem.");
    }
  };

  const handleReserve = async () => {
    if (!reserveData.scheduled_date) {
      alert("Por favor, selecione uma data e hora para coleta.");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call for reservation
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      
      console.log("Reserva confirmada:", {
        item: selectedItem.title,
        scheduled_date: reserveData.scheduled_date,
        notes: reserveData.notes,
        user_id: user.id,
      });

      alert(`Coleta de "${selectedItem.title}" agendada com sucesso para ${format(new Date(reserveData.scheduled_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}!`);
      setShowDetailDialog(false);
      // Optionally remove the item from the marketplace view
      setItems(items.filter(item => item.id !== selectedItem.id));
      setSelectedItem(null);
      setReserveData({ scheduled_date: "", notes: "" });
    } catch (error) {
      console.error("Erro ao agendar coleta:", error);
      alert("Ocorreu um erro ao agendar a coleta. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const openDetailDialog = (item) => {
    setSelectedItem(item);
    setShowDetailDialog(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-2">
            Marketplace de Alimentos
          </h1>
          <p className="text-gray-600">Encontre alimentos disponíveis para coleta ou doação</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-emerald-200 focus:border-emerald-400"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 border-emerald-200">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="frutas">Frutas</SelectItem>
                <SelectItem value="verduras">Verduras</SelectItem>
                <SelectItem value="legumes">Legumes</SelectItem>
                <SelectItem value="graos_cereais">Grãos/Cereais</SelectItem>
                <SelectItem value="laticínios">Laticínios</SelectItem>
                <SelectItem value="carnes">Carnes</SelectItem>
                <SelectItem value="panificados">Panificados</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>

            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger className="w-full md:w-48 border-emerald-200">
                <SelectValue placeholder="Condição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="otimo">Ótimo</SelectItem>
                <SelectItem value="bom">Bom</SelectItem>
                <SelectItem value="proximo_vencimento">Próx. Vencimento</SelectItem>
                <SelectItem value="apenas_processamento">Para Processamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            {filteredItems.length} {filteredItems.length === 1 ? 'item disponível' : 'itens disponíveis'}
          </p>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  onSelect={openDetailDialog}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-2xl border border-emerald-100">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nenhum item encontrado</p>
              <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-emerald-900">
              Detalhes do Item
            </DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Detalhes e Coleta</TabsTrigger>
                <TabsTrigger value="chat">Chat com Doador</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                <div className="space-y-6">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <h3 className="font-bold text-lg text-emerald-900 mb-2">{selectedItem.title}</h3>
                    <p className="text-sm text-emerald-700 mb-3">{selectedItem.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-800">{selectedItem.quantity} {selectedItem.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-800 truncate">{selectedItem.pickup_address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-800">
                          Validade: {selectedItem.expiry_date ? format(new Date(selectedItem.expiry_date), "dd/MM/yyyy", { locale: ptBR }) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="scheduled_date">Data e Hora para Coleta *</Label>
                      <Input
                        id="scheduled_date"
                        type="datetime-local"
                        value={reserveData.scheduled_date}
                        onChange={(e) => setReserveData({...reserveData, scheduled_date: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Observações (opcional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Instruções adicionais para a coleta..."
                        value={reserveData.notes}
                        onChange={(e) => setReserveData({...reserveData, notes: e.target.value})}
                        className="mt-1 h-20"
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailDialog(false)}
                    disabled={isProcessing}
                  >
                    Fechar
                  </Button>
                  <Button
                    onClick={handleReserve}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  >
                    {isProcessing ? "Agendando..." : "Confirmar Coleta"}
                  </Button>
                </DialogFooter>
              </TabsContent>
              
              <TabsContent value="chat" className="mt-4">
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                    {messages.length > 0 ? messages.map((msg) => (
                      <ChatBubble key={msg.id} message={msg} isSender={msg.sender_id === user.id} />
                    )) : (
                      <div className="text-center text-gray-500 text-sm h-full flex items-center justify-center">
                        Inicie a conversa para tirar dúvidas sobre o item.
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      className="h-12 resize-none"
                    />
                    <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
