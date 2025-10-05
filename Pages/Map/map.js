import React, { useState, useEffect } from "react";
import { FoodItem } from "@/entities/FoodItem";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultPosition = [-23.55052, -46.633308]; // São Paulo

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const availableItems = await FoodItem.filter({ status: "disponivel" });
      const itemsWithCoords = availableItems.filter(item => item.latitude && item.longitude);
      setItems(itemsWithCoords);
    } catch (error) {
      console.error("Error loading items for map:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-2">
            Mapa de Oportunidades
          </h1>
          <p className="text-gray-600">Encontre alimentos disponíveis perto de você</p>
        </div>

        <div className="h-[70vh] w-full rounded-2xl overflow-hidden shadow-xl border-2 border-emerald-200">
          {isLoading ? (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center animate-pulse">
              <p className="text-gray-500">Carregando mapa...</p>
            </div>
          ) : (
            <MapContainer center={defaultPosition} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {items.map(item => (
                <Marker key={item.id} position={[item.latitude, item.longitude]}>
                  <Popup>
                    <div className="w-64 space-y-2">
                      {item.image_urls && item.image_urls.length > 0 && (
                        <img src={item.image_urls[0]} alt={item.title} className="h-24 w-full object-cover rounded-md"/>
                      )}
                      <h3 className="font-bold text-md">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
                      <p className="text-xs text-gray-500">{item.pickup_address}</p>
                      <Link to={createPageUrl(`Marketplace?itemId=${item.id}`)} className="block w-full">
                        <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}