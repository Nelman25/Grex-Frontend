import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/axios";
import { UserSchema } from "@/schemas/authSchema";
import axios from "axios";
import { Form, Formik } from "formik";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { CiLock, CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import type { IUserCredentials } from "../types/auth";
import FormField from "./FormField";
import SocialButtonsContainer from "./SocialButtonsContainer";

export interface CreateAccountHandler {
  values: IUserCredentials;
}

const initialValues: IUserCredentials = {
  first_name: "",
  last_name: "",
  email: "",
  password_hash: "",
  confirm_password: "",
};

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuth();
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleAccountCreation = async (values: IUserCredentials) => {
    setIsLoading(true);

    const userCredentials = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password_hash: values.password_hash,
    };

    try {
      const response = await api.post("/auth/sign-up", userCredentials);
      setToken(response.data.access_token);
      setUser(response.data.user);
      navigate("/my-projects", { replace: true }); // TODO: Implement protected routes
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.detail || "Account creation failed.";
        setServerError(serverMessage);
      } else if (error instanceof Error) {
        setServerError(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-[#F2F2F2]/15 to-[#7E7E7E]/15 rounded-lg py-6 px-4 mt-4 lg:p-8">
      <div className="flex justify-center">
        <p className="text-dark-text block">Register with:</p>
      </div>

      <SocialButtonsContainer />

      <div className="flex space-x-4 items-center my-4">
        <div className="bg-dark-subtle/50 h-0.5 flex-1" />
        <span className="text-dark-text text-lg">Or</span>
        <div className="bg-dark-subtle/50 h-0.5 flex-1" />
      </div>

      <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={(values) => handleAccountCreation(values)}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <FormField id="first_name" name="first_name" label="First name" placeholder="Jonel" Icon={BsPersonCircle} />
                <FormField id="last_name" name="last_name" label="Last name" placeholder="Villaver" Icon={BsPersonCircle} />
              </div>
              <FormField id="email" name="email" label="Email" type="email" placeholder="jonelvillaver@gmail.com" Icon={CiMail} />
              <FormField
                id="password_hash"
                name="password_hash"
                type="password"
                label="Password"
                placeholder="Create Password (min. 8 characters)"
                Icon={CiLock}
              />
              <FormField
                id="confirm_password"
                name="confirm_password"
                type="password"
                label="Confirm Password"
                placeholder="Create Password (min. 8 characters)"
                Icon={CiLock}
              />

              {serverError && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Failed to create account</AlertTitle>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <Button
                disabled={isLoading}
                className="rounded bg-brand-primary/80 border border-brand-light border-t border-t-brand-soft text-light-text text-sm h-9 hover:bg-brand-primary/60 transition-colors outline-none! ring-0!"
                type="submit"
              >
                {isLoading && (
                  <div className="flex space-x-2 items-center justify-center">
                    <Loader2 className="animate-spin" />
                    <span>Please wait</span>
                  </div>
                )}
                {!isLoading && <span>Create Account</span>}
              </Button>

              <p className="text-dark-subtle text-center">
                By creating an account, you agree to Grex's{" "}
                <Link to="/">
                  <span className="text-dark-text font-semibold underline">Terms of Service and Privacy</span>
                </Link>
              </p>

              <p className="text-center text-dark-text">
                Already have an account?{" "}
                <Link to={"/auth/signin"}>
                  <span className="font-medium text-brand-primary">Login</span>
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
