import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = () => navigate("/");
    window.addEventListener("keydown", handleKeyPress);
    console.log(handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white text-center px-6">

      <h1 className="text-8xl font-bold mb-4 text-white/80">404</h1>
      <div className="text-xl md:text-2xl font-semibold mb-6">
        This page doesn't seem to exist.<br />
        Press ANY key or press Home Button to cancel and return to Home.

      </div>

      {/* Home Button to return */}
      <button
        onClick={() => navigate("/")}
        className="bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
      >
        Go Home
      </button>
    </div>
  );
}
