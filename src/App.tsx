import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import ContactsList from "./pages/ContactsList";
import ContactDetail from "./pages/ContactDetail";
import ContactForm from "./pages/ContactForm";
import EntitiesList from "./pages/EntitiesList";
import EntityDetail from "./pages/EntityDetail";
import EntityForm from "./pages/EntityForm";
import DuplicateResolution from "./pages/DuplicateResolution";
import Analytics from "./pages/Analytics";
import MoreMenu from "./pages/MoreMenu";
import SearchPage from "./pages/Search";
import AuditLogs from "./pages/AuditLogs";
import AddRelationship from "./pages/AddRelationship";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
        <Route path="/contacts/:id/edit" element={<ContactForm />} />
        <Route path="/entities" element={<EntitiesList />} />
        <Route path="/entities/new" element={<EntityForm />} />
        <Route path="/entities/:id" element={<EntityDetail />} />
        <Route path="/entities/:id/edit" element={<EntityForm />} />
        <Route path="/duplicates" element={<DuplicateResolution />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/more" element={<MoreMenu />} />
        <Route path="/relationships/new" element={<AddRelationship />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <LayoutProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
          </BrowserRouter>
        </LayoutProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
