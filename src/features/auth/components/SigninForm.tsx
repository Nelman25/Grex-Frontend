import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CiLock, CiMail } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import type { IUserCredentials } from "@/types";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router";

export default function SigninForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: "",
    password_hash: "",
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!userCredentials.email || !userCredentials.password_hash) {
        alert("Email and password is required!");
        return;
      }

      await login(userCredentials);
      navigate("/my-projects"); // TODO: Implement protected routes
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        console.error(error.message); // TODO: better error handling
      } else {
        console.error(error); // TODO: better error handling
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="w-full">
        <Label className="text-dark-text">Email Address</Label>
        <div className="relative flex items-center mt-2">
          <CiMail className="absolute text-gray-300 size-5 left-5" />
          <Input
            className="w-full pl-12 h-11 text-lg focus:ring-2 focus:ring-brand-primary outline-none text-white placeholder-red-600 bg-white/20 border border-white/30 rounded"
            name="email"
            placeholder="Email Address"
            onChange={handleInputChange}
          />
        </div>
        <p className="text-error text-sm">{error}</p>
      </div>

      <div className="w-full mt-4">
        <Label className="text-dark-text">Password</Label>
        <div className="relative flex items-center mt-2">
          <CiLock className="absolute text-gray-300 size-5 left-5" />
          <Input
            className="w-full pl-12 h-11 focus:ring-2 focus:ring-brand-primary outline-none text-white bg-white/20 border border-white/30 rounded"
            name="password_hash"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button
        disabled={isLoading}
        className="w-full rounded my-6 bg-brand-primary border border-brand-light border-t border-t-brand-soft text-light-text text-sm h-9 hover:bg-brand-dark transition-colors hover:text-dark-text hover:border-e-brand-soft"
        type="submit"
      >
        {isLoading && (
          <div className="flex space-x-2 items-center justify-center">
            <Loader2 className="animate-spin" />
            <span>Please wait</span>
          </div>
        )}
        {!isLoading && <span>Login</span>}
      </Button>
    </form>
  );
}
