import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  imageUrl?: string;
}

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const [showComments, setShowComments] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);
  
  // Get comment count from localStorage
  const getCommentCount = () => {
    const comments = localStorage.getItem(`comments-${post.id}`);
    return comments ? JSON.parse(comments).length : 0;
  };
  
  const [commentCount, setCommentCount] = useState(getCommentCount());
  
  const handleCommentAdded = () => {
    setRefreshComments(prev => prev + 1);
    setCommentCount(getCommentCount() + 1);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.name}`} />
          <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-muted-foreground">
            {post.author.name} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="whitespace-pre-line">{post.content}</p>
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto rounded-md mt-4 max-h-[400px] object-cover"
          />
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-stretch">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 self-start mb-4"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare size={18} />
          <span>{commentCount} Comments</span>
        </Button>
        
        {showComments && (
          <div className="w-full">
            <CommentList postId={post.id} refreshTrigger={refreshComments} />
            <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}