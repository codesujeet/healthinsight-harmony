
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Stethoscope, User } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/types/auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check user role in profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role !== selectedRole) {
        throw new Error(`Invalid credentials for ${selectedRole} role`);
      }

      toast({
        title: "Success",
        description: "Successfully logged in",
      });

      // Redirect based on role
      if (selectedRole === "doctor") {
        navigate("/patients");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/50 backdrop-blur-lg">
          <CardHeader className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-medical-900">
              Welcome to HealthInsight
            </h1>
            <p className="text-sm text-medical-600">
              Please select your role to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="p-8 h-auto flex flex-col space-y-4 hover:bg-medical-50 hover:border-medical-200"
                onClick={() => setSelectedRole("doctor")}
              >
                <Stethoscope className="h-12 w-12 text-medical-600" />
                <div className="text-medical-800 font-semibold">Doctor</div>
              </Button>
              <Button
                variant="outline"
                className="p-8 h-auto flex flex-col space-y-4 hover:bg-medical-50 hover:border-medical-200"
                onClick={() => setSelectedRole("patient")}
              >
                <User className="h-12 w-12 text-medical-600" />
                <div className="text-medical-800 font-semibold">Patient</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/50 backdrop-blur-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            {selectedRole === "doctor" ? (
              <Stethoscope className="h-12 w-12 text-medical-600" />
            ) : (
              <User className="h-12 w-12 text-medical-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-medical-900">
            {selectedRole === "doctor" ? "Doctor Login" : "Patient Login"}
          </h1>
          <p className="text-sm text-medical-600">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-medical-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-medical-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-medical-600 hover:bg-medical-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-sm text-center space-y-2">
              <Button
                variant="link"
                className="text-medical-600 hover:text-medical-800 p-0"
                onClick={() => setSelectedRole(null)}
                disabled={loading}
              >
                Switch role
              </Button>
              <div className="text-medical-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-medical-600 hover:text-medical-800 p-0"
                  onClick={() => navigate("/register")}
                  disabled={loading}
                >
                  Register
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
