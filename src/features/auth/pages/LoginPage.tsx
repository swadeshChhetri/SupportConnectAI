import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { LoginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";
import { useAuthStore } from "../hooks/useAuthStore";


type LoginFormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginFormData>({
      resolver: zodResolver(LoginSchema),
    });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data);
      login(res);
      const role = res.user.role;

      if (role === "OWNER" || role === "ADMIN") {
        navigate("/company", { replace: true });
      } else if (role === "AGENT") {
        navigate("/agent", { replace: true });
      } else if (role === "SUPER_ADMIN") {
        navigate("/platform", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
  
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password (Newely added agents password: Temp@1234)"
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
