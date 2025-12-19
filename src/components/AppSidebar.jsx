import { ChartLine, LayoutDashboard, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
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
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-8 h-8" size={32} />,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: <ChartLine className="w-8 h-8" size={32} />, 
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomalies",
    icon: <TriangleAlert className="w-8 h-8" size={32} />,
  },
];

const SideBarTab = ({ item }) => {
  let location = useLocation();
  let isActive = location.pathname === item.url;

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          to={item.url}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
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
            <SidebarMenu className="mt-4 text">
              <SignedIn>
                {items.map((item) => (
                  <SideBarTab key={item.url} item={item} />
                ))}
              </SignedIn>
              <SignedOut>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to="/sign-in">Sign In</Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
              </SignedOut>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
