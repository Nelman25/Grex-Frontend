import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import type { IUserCredentials } from "@/types";
import axios from "axios";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
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
      navigate("/dashboard", { replace: true }); // TODO: Implement protected routes
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        console.error(error.message); // TODO: better error handling
      } else {
        setError("The password you've entered is incorrect.");
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
          <CiMail className="absolute text-white size-5 left-5" />
          <Input
            className="w-full pl-12 pr-6 h-11 text-sm sm:text-base focus:ring-1! focus:ring-brand-primary! outline-none text-white placeholder-red-600 bg-white/20 border border-white/30 rounded"
            name="email"
            placeholder="Email Address"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Label className="text-dark-text">Password</Label>
        <div className="relative flex items-center mt-2">
          <CiLock className="absolute text-white size-5 left-5" />
          <Input
            className="w-full pl-12 pr-6 h-11 text-sm sm:text-base focus:ring-1! focus:ring-brand-primary! outline-none text-white bg-white/20 border border-white/30 rounded"
            name="password_hash"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
        </div>

        {error && (
          <Alert variant="destructive" className="mt-2 bg-black/40">
            <AlertCircleIcon />
            <AlertTitle>Login failed.</AlertTitle>
            <AlertDescription>
              <p>{error ?? "The password you’ve entered is incorrect."}</p>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Button
        disabled={isLoading}
        className="w-full rounded my-6 bg-brand-primary/80 border border-brand-light border-t border-t-brand-soft text-light-text text-sm h-9 hover:bg-brand-primary/60 transition-colors outline-none! ring-0!"
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
