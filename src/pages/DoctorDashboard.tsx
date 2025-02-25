
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Users,
  TrendingUp,
  DollarSign,
  Heart,
  UserCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data - replace with real data later
const patientData = [
  { name: "Male", value: 65 },
  { name: "Female", value: 45 },
  { name: "Other", value: 2 },
];

const expensesData = [
  { month: "Jan", amount: 4500 },
  { month: "Feb", amount: 3800 },
  { month: "Mar", amount: 5200 },
  { month: "Apr", amount: 4900 },
  
  { month: "Jun", amount: 5600 },
];

const patientStatuses = [
  { name: "Critical", value: 8 },
  { name: "Stable", value: 45 },
  { name: "Recovering", value: 32 },
  { name: "Healthy", value: 15 },
];

const DoctorDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Patients
                </p>
                <h3 className="text-2xl font-bold">112</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Cases
                </p>
                <h3 className="text-2xl font-bold">28</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Treatment Cost
                </p>
                <h3 className="text-2xl font-bold">$2,840</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Critical Cases
                </p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
            <CardDescription>Distribution by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
            <CardDescription>Treatment costs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expensesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
          <CardDescription>Latest patient updates and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Sarah Johnson",
                age: 45,
                condition: "Hypertension",
                status: "Stable",
                lastVisit: "2024-02-15",
              },
              {
                name: "Michael Chen",
                age: 32,
                condition: "Diabetes Type 2",
                status: "Monitoring",
                lastVisit: "2024-02-14",
              },
              {
                name: "Emily Davis",
                age: 28,
                condition: "Pregnancy",
                status: "Regular Checkup",
                lastVisit: "2024-02-13",
              },
            ].map((patient) => (
              <div
                key={patient.name}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <UserCheck className="h-8 w-8 text-medical-600" />
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age} | Condition: {patient.condition}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{patient.status}</p>
                  <p className="text-sm text-muted-foreground">
                    Last Visit: {patient.lastVisit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
