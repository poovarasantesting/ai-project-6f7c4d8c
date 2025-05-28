import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  author?: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Not authenticated",
        description: "Please login to view posts",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Fetch posts
    fetchPosts();
  }, [navigate, toast]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      
      // Only take first 10 posts for demonstration
      const limitedPosts = data.slice(0, 10);
      
      // Add fake author names
      const authors = ["John Doe", "Jane Smith", "Alex Johnson", "Sam Wilson", "Taylor Swift"];
      const postsWithAuthors = limitedPosts.map((post: Post) => ({
        ...post,
        author: authors[Math.floor(Math.random() * authors.length)]
      }));
      
      setPosts(postsWithAuthors);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out",
    });
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`} />
                    <AvatarFallback>{post.author?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-4">{post.body}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}