
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Stethoscope, User } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/types/auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error("User creation failed");

      // Create profile with role and additional info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: selectedRole,
          name,
          specialization: selectedRole === 'doctor' ? specialization : null,
        })
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      // Redirect to login
      navigate("/login");
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
              Create your account
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
            {selectedRole === "doctor" ? "Doctor Registration" : "Patient Registration"}
          </h1>
          <p className="text-sm text-medical-600">
            Create your account to get started
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-medical-400" />
                <Input
                  placeholder="Full Name"
                  className="pl-10"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
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
            {selectedRole === "doctor" && (
              <div className="space-y-2">
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-2.5 h-5 w-5 text-medical-400" />
                  <Input
                    placeholder="Specialization"
                    className="pl-10"
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-medical-600 hover:bg-medical-700"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
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
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="text-medical-600 hover:text-medical-800 p-0"
                  onClick={() => navigate("/login")}
                  disabled={loading}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
