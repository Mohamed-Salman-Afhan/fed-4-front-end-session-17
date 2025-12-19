import { Settings, Zap } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items for admin navigation.
const items = [
  {
    title: "Solar Units",
    url: "/admin/solar-units",
    icon: <Zap className="w-8 h-8" size={32} />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="w-8 h-8" size={32} />,
  },
];

const AdminSideBarTab = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-16 mb-4">
            <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Voltaris Solar" className="h-12 w-auto" />
                <span className="text-xl font-bold text-primary">Voltaris</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => (
                <AdminSideBarTab key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
