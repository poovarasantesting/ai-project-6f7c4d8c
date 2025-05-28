import { useEffect, useState } from "react";
import { PostDetail } from "@/components/PostDetail";

// Dummy data for posts
const dummyPosts = [
  {
    id: "1",
    title: "First Post",
    content: "This is my first post on this platform. Excited to share more!",
    author: {
      name: "John Doe",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Thoughts on Modern Web Development",
    content: "React has completely changed how we build web applications. The component-based architecture makes it so much easier to create interactive UIs.\n\nWhat are your thoughts?",
    author: {
      name: "Jane Smith",
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: "3",
    title: "My Trip to the Mountains",
    content: "Just got back from an amazing hiking trip. The views were breathtaking!",
    author: {
      name: "Mike Johnson",
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use dummy data
    setPosts(dummyPosts);
  }, []);

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-8">Your Feed</h1>
      
      <div className="space-y-6">
        {posts.map(post => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}