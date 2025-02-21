
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Users, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-medical-900 mb-4">
            Welcome to HealthInsight
          </h1>
          <p className="text-xl text-medical-600 max-w-2xl mx-auto">
            Your comprehensive healthcare management platform connecting doctors and patients
            for better healthcare outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Stethoscope className="h-12 w-12 text-medical-600" />
              </div>
              <CardTitle>For Doctors</CardTitle>
              <CardDescription>
                Manage your practice, patients, and medical records efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-medical-600">
                <li>• View and manage patient records</li>
                <li>• Create medical reports and prescriptions</li>
                <li>• Schedule and manage appointments</li>
                <li>• Secure communication with patients</li>
              </ul>
              <Button 
                className="w-full bg-medical-600 hover:bg-medical-700"
                onClick={() => navigate("/login")}
              >
                Doctor Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-medical-600" />
              </div>
              <CardTitle>For Patients</CardTitle>
              <CardDescription>
                Access your health information and connect with healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-medical-600">
                <li>• View your medical history</li>
                <li>• Access prescriptions and reports</li>
                <li>• Book appointments with doctors</li>
                <li>• Get AI-powered health insights</li>
              </ul>
              <Button 
                className="w-full bg-medical-600 hover:bg-medical-700"
                onClick={() => navigate("/login")}
              >
                Patient Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-medical-600 mb-4">New to HealthInsight?</p>
          <Button 
            variant="outline"
            className="bg-white hover:bg-medical-50"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
