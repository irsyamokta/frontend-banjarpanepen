import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validator/authValidator";
import { AiOutlineLoading3Quarters, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      await login(values);
      toast.success("Berhasil login!");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(
        error.response?.data?.message || "Login gagal, periksa kembali email dan password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Masuk Admin
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label>Email <span className="text-error-500">*</span></Label>
              <Input
                placeholder="Masukan email anda"
                {...register("email")}
                error={!!errors.email}
                hint={errors.email?.message}
              />
            </div>
            <div>
              <Label>Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan password anda"
                  {...register("password")}
                  error={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="mt-1 text-sm text-error-500">{errors.password.message}</p>
              )}
            </div>

            {/* <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-normal text-brand-900 hover:underline dark:text-white">
                Lupa password?
              </Link>
            </div> */}

            <Button type="submit" variant="default" disabled={isLoading} className="w-full ">
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                  Loading...
                </>
              ) : (
                "SignIn"
              )}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}