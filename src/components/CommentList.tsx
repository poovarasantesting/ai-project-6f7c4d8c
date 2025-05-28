import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

interface CommentListProps {
  postId: string;
  refreshTrigger: number;
}

export function CommentList({ postId, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use localStorage
    const storedComments = localStorage.getItem(`comments-${postId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [postId, refreshTrigger]);

  if (comments.length === 0) {
    return <p className="text-muted-foreground italic mt-4">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="space-y-4 mt-4">
      {comments.map(comment => (
        <Card key={comment.id} className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} alt={comment.author} />
              <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{comment.author}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </p>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}