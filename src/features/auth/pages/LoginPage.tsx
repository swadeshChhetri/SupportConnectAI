import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { LoginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";
import { useAuthStore } from "../hooks/useAuthStore";
import { Lock, Mail, Loader2 } from "lucide-react";

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
      <div className="text-center mb-6">
        <h1 className="text-xl font-normal text-slate-800 tracking-tight mb-1">Welcome back</h1>
        <p className="text-xs font-light text-slate-400">Sign in to manage your customer support platform.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">Email address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[1.5]" />
            <input
              type="email"
              {...register("email")}
              placeholder="name@company.com"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 font-light"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">Password</label>
            <Link to="/forgot-password" className="text-xs font-light text-blue-500 hover:text-blue-600 hover:underline">Forgot?</Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[1.5]" />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 font-light"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>
          )}
          <span className="text-[11px] font-light text-slate-400 block leading-normal mt-1">
            Agents password: <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded font-mono">Temp@1234</code>
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-normal py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <p className="text-xs font-light text-center text-slate-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium hover:underline">Register</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
