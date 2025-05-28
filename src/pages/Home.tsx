import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome to our platform</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Join our community and discover amazing content shared by users around the world.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {isLoggedIn ? (
            <Button onClick={() => navigate("/posts")}>
              View Posts
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}