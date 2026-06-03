import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
// import AppRoutes from "./router/Approutes";
import { useAuthStore } from "./features/auth/hooks/useAuthStore";
import AppRoutes from "./app/router/router";
// import { useAuthStore } from "./admin/features/auth/hooks/useAuthStore";

const App = () => {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
