import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { RegisterSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";
import { User, Mail, Lock, Building, Loader2 } from "lucide-react";

type RegisterFormData = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<RegisterFormData>({
      resolver: zodResolver(RegisterSchema),
    });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-xl font-normal text-slate-800 tracking-tight mb-1">Create account</h1>
        <p className="text-xs font-light text-slate-400">Get started with a 14-day free trial.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Organization Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">Organization Name</label>
          <div className="relative flex items-center">
            <Building className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[1.5]" />
            <input
              type="text"
              {...register("orgName")}
              placeholder="e.g. Acme Corp"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 font-light"
            />
          </div>
          {errors.orgName && (
            <span className="text-red-500 text-xs mt-1 block">{errors.orgName.message}</span>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">Full Name</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[1.5]" />
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 font-light"
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">Email address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[1.5]" />
            <input
              type="email"
              {...register("email")}
              placeholder="you@company.com"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 font-light"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">Password</label>
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
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-normal py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <p className="text-xs font-light text-center text-slate-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
