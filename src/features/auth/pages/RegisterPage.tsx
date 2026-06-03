import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { RegisterSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";


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
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

         {/* ORG NAME */}
         <div>
          <input
            type="text"
            {...register("orgName")}
            placeholder="Organization Name"
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
          {errors.orgName && (
            <span className="text-red-500 text-xs">
              {errors.orgName.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>

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
            placeholder="Password"
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
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>

      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
