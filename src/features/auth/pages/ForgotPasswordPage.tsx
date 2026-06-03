import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../api/authApi";
// import { requestPasswordReset } from "../../../api/authApi";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await requestPasswordReset(data.email);
      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center mb-6">
        Forgot Password
      </h1>

      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your email and we’ll send you a password reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* EMAIL */}
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Remember your password?{" "}
        <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
