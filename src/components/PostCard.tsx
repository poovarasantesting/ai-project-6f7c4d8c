import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PostCardProps {
  post: {
    id: number;
    content: string;
    author: {
      name: string;
      username: string;
      avatar: string;
    };
    likes: number;
    comments: number;
    createdAt: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Post sharing functionality coming soon!",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.author.username} · {post.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base mb-2">{post.content}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between">
          <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
            <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current text-red-500" : ""}`} />
            {likeCount}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}