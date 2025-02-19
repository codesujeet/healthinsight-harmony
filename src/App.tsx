
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <Layout role="patient" userName="John Doe">
                <div className="text-center">Dashboard Coming Soon</div>
              </Layout>
            }
          />
          <Route
            path="/records"
            element={
              <Layout role="patient" userName="John Doe">
                <div className="text-center">Records Coming Soon</div>
              </Layout>
            }
          />
          <Route
            path="/patients"
            element={
              <Layout role="doctor" userName="Dr. Smith">
                <div className="text-center">Patients Coming Soon</div>
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
