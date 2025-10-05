
import React from 'react';
import { createPageUrl } from "@/utils";
import { LayoutDashboard, ShoppingBag, Calendar, TrendingUp, BookOpen, User, Menu, Leaf, MessageSquare, Map as MapIcon } from "lucide-react";
import {
  Sidebar,
  SidebarItem,
  SidebarMenuGroup,
} from "@/components/Sidebar";
import { User as UserEntity } from "@/entities/User";

const navigationItems = [
  { title: "Dashboard", url: "Dashboard", icon: LayoutDashboard },
  { title: "Marketplace", url: "Marketplace", icon: ShoppingBag },
  { title: "Mapa", url: "Map", icon: MapIcon },
  { title: "Minhas Publicações", url: "MyListings", icon: Calendar },
  { title: "Mensagens", url: "MyMessages", icon: MessageSquare },
  { title: "Impacto", url: "Impact", icon: TrendingUp },
  { title: "Educação", url: "Education", icon: BookOpen },
  { title: "Perfil", url: "Profile", icon: User },
];

export default function Layout({ children, currentPageName }) {
  // Placeholder for user data - in a real app, this would come from context, props, or a state management solution.
  const currentUser: UserEntity | null = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
    // Add other properties of UserEntity as needed
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentUser={currentUser}>
        <SidebarMenuGroup>
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.url}
              icon={item.icon}
              label={item.title}
              href={createPageUrl(item.url)}
              isActive={currentPageName === item.url}
            />
          ))}
        </SidebarMenuGroup>

        {/* Example of a bottom section in the sidebar */}
        <SidebarMenuGroup className="mt-auto">
          <SidebarItem
            icon={Menu} // Using Menu icon as an example for settings/options
            label="Configurações"
            href={createPageUrl("Settings")}
            isActive={currentPageName === "Settings"}
          />
          <SidebarItem
            icon={Leaf} // Using Leaf icon as an example for impact details or logout
            label="Sair"
            href={createPageUrl("Logout")} // Assuming a logout route
            onClick={() => {
              // Handle logout logic here
              console.log("User logged out");
            }}
          />
        </SidebarMenuGroup>
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
