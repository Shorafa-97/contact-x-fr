import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutProvider } from "@/contexts/LayoutContext";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import ContactsList from "./pages/ContactsList";
import ContactDetail from "./pages/ContactDetail";
import ContactForm from "./pages/ContactForm";
import EntitiesList from "./pages/EntitiesList";
import EntityDetail from "./pages/EntityDetail";
import DuplicateResolution from "./pages/DuplicateResolution";
import Analytics from "./pages/Analytics";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import GovernanceDashboard from "./pages/GovernanceDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LayoutProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contacts" element={<ContactsList />} />
              <Route path="/contacts/new" element={<ContactForm />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
              <Route path="/contacts/:id/edit" element={<ContactForm />} />
              <Route path="/entities" element={<EntitiesList />} />
              <Route path="/entities/:id" element={<EntityDetail />} />
              <Route path="/duplicates" element={<DuplicateResolution />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/executive" element={<ExecutiveDashboard />} />
              <Route path="/governance" element={<GovernanceDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </LayoutProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
