
import React, { useState, useEffect } from "react";
import { FoodItem } from "@/entities/FoodItem";
import { User } from "@/entities/User";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";

export default function MyListings() {
  const [formData, setFormData] = useState({
    title: "",
    quantity: "", // Stored as string, parsed to float before submission
    pickup_address: "",
    price: "", // Stored as string, parsed to float or null
    description: "", // Added for a more complete form example
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [foodItems, setFoodItems] = useState([]); // To display existing listings
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Mock user data for demonstration, replace with actual user context or fetching
  const [user, setUser] = useState({
    id: "mock_user_123",
    organization_name: "Minha Organização de Teste",
    full_name: "Usuário Teste",
  });

  // Example useEffect to load data or perform initial setup
  useEffect(() => {
    // In a real application, you might fetch initial food items here
    // For now, we'll just log
    console.log("MyListings component initialized.");
  }, []);

  const handleSubmit = async () => {
    // Validation
    if (!formData.title || !formData.quantity) {
      alert("Por favor, preencha o título e a quantidade.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let lat = null;
      let lng = null;
      if (formData.pickup_address) {
        try {
          const geocodeResult = await InvokeLLM({
            prompt: `Geocode the following address and return only a JSON object with "latitude" and "longitude" keys. Address: ${formData.pickup_address}`,
            add_context_from_internet: true,
            response_json_schema: {
              type: "object",
              properties: {
                latitude: { type: "number" },
                longitude: { type: "number" },
              },
            },
          });
          if (geocodeResult && geocodeResult.latitude && geocodeResult.longitude) {
            lat = geocodeResult.latitude;
            lng = geocodeResult.longitude;
          }
        } catch (geoError) {
          console.warn("Geocoding failed, proceeding without coordinates:", geoError);
          // Optionally inform the user that geocoding failed but creation continues
        }
      }

      const imageUrls = [];
      // Only upload files if selectedFiles is not empty
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const { file_url } = await UploadFile({ file });
          imageUrls.push(file_url);
        }
      }

      await FoodItem.create({
        ...formData,
        quantity: parseFloat(formData.quantity),
        price: formData.price ? parseFloat(formData.price) : null,
        image_urls: imageUrls,
        donor_id: user.id,
        donor_name: user.organization_name || user.full_name,
        status: "disponivel",
        latitude: lat,
        longitude: lng,
      });

      setShowCreateDialog(false);
      setSuccessMessage("Item de comida criado com sucesso!");
      // Reset form fields
      setFormData({
        title: "",
        quantity: "",
        pickup_address: "",
        price: "",
        description: "",
      });
      setSelectedFiles([]);
      // In a real app, you would likely refetch food items here
      // For now, we'll just add a mock item to the list
      setFoodItems(prev => [...prev, { id: Date.now(), ...formData, image_urls: imageUrls }]);

    } catch (err) {
      console.error("Erro ao criar item de comida:", err);
      setError("Falha ao criar o item. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Minhas Listagens de Comida</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Sucesso!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <Button onClick={() => setShowCreateDialog(true)} className="mb-6 w-full">
        Criar Nova Listagem
      </Button>

      {showCreateDialog && (
        <div className="border p-6 rounded-lg shadow-lg bg-white mb-6">
          <h2 className="text-2xl font-semibold mb-4">Nova Listagem de Comida</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
              <input
                id="title"
                type="text"
                placeholder="Ex: Maçãs frescas orgânicas"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantidade</label>
              <input
                id="quantity"
                type="number"
                placeholder="Ex: 5 (kg, unidades, etc.)"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700">Endereço de Retirada</label>
              <input
                id="pickup_address"
                type="text"
                placeholder="Ex: Rua Fictícia, 123, Cidade, Estado, CEP"
                value={formData.pickup_address}
                onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (opcional)</label>
              <input
                id="price"
                type="number"
                placeholder="Ex: 10.50"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição (opcional)</label>
              <textarea
                id="description"
                placeholder="Adicione uma breve descrição sobre o item..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="files" className="block text-sm font-medium text-gray-700">Imagens (opcional)</label>
              <input
                id="files"
                type="file"
                multiple
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                className="mt-1 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-600
                         hover:file:bg-indigo-100"
              />
              {selectedFiles.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">{selectedFiles.length} arquivo(s) selecionado(s)</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? "Processando..." : "Salvar Listagem"}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Minhas Listagens Atuais</h2>
        {foodItems.length === 0 ? (
          <p className="text-gray-600">Nenhuma listagem encontrada. Crie uma nova acima!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodItems.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-sm bg-white">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-700">Quantidade: {item.quantity}</p>
                {item.price && <p className="text-gray-700">Preço: R$ {item.price}</p>}
                {item.pickup_address && <p className="text-gray-600 text-sm">Endereço: {item.pickup_address}</p>}
                {item.image_urls && item.image_urls.length > 0 && (
                  <img src={item.image_urls[0]} alt={item.title} className="mt-2 w-full h-32 object-cover rounded" />
                )}
                {/* Add more details or actions like Edit/Delete here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
