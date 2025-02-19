
export type UserRole = "doctor" | "patient";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  specialization?: string; // For doctors
  patientId?: string; // For patients
}
