// Register
import { tokens } from "@core/CurrentUser";

export type RegisterResponse = boolean;

export interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthday: string;
  details?: string;
  city: string;
  country: string;
}

// Has phone or email
export interface HasPhoneOrEmailResponse<T extends object> {
  isEmailExists?: T extends { email: string } ? boolean : void;
  isPhoneExists?: T extends { phone: string } ? boolean : void;
}

export type HasPhoneOrEmailRequest = { phone: string; } | { email: string; } | { phone?: string; email?: string; }

// Login

export interface LoginResponse extends tokens {

}

export interface LoginRequest {
    login: string;
    password: string;
    device_id: string;
}
