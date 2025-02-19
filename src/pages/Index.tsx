
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Shield,
  Stethoscope,
  FileText,
  ChevronRight,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-medical-900">
            HealthInsight
          </h1>
          <p className="text-xl text-medical-600 max-w-2xl mx-auto">
            Advanced patient record analysis and monitoring system powered by
            artificial intelligence
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-medical-500" />}
            title="AI-Powered Analysis"
            description="Intelligent analysis of medical records for better insights"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-medical-500" />}
            title="Secure & Private"
            description="Advanced encryption and privacy protection measures"
          />
          <FeatureCard
            icon={<Stethoscope className="h-8 w-8 text-medical-500" />}
            title="Doctor Dashboard"
            description="Comprehensive view of patient health records"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-medical-500" />}
            title="Digital Records"
            description="Efficient digital storage and management of medical data"
          />
        </div>

        <div className="mt-16 text-center space-y-6 animate-slideUp">
          <h2 className="text-2xl font-semibold text-medical-800">
            Ready to get started?
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-medical-600 hover:bg-medical-700"
              onClick={() => navigate("/login")}
            >
              Login
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-medical-600 text-medical-600 hover:bg-medical-50"
              onClick={() => navigate("/register")}
            >
              Register
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-medical-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
    <div className="space-y-4">
      {icon}
      <h3 className="text-lg font-semibold text-medical-800">{title}</h3>
      <p className="text-medical-600">{description}</p>
    </div>
  </div>
);

export default Index;
