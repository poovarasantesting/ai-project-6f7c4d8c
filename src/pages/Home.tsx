import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Social Posts</h1>
      <p className="text-xl mb-8">Explore posts and connect with others</p>
      
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link to="/profile">View Profile</Link>
        </Button>
      </div>
    </div>
  );
}