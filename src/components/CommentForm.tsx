import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // Simulating an API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get existing comments from localStorage or initialize empty array
      const existingComments = JSON.parse(localStorage.getItem(`comments-${postId}`) || "[]");
      
      // Add new comment
      const newComment = {
        id: Date.now().toString(),
        postId,
        content: comment,
        author: "Current User",
        createdAt: new Date().toISOString()
      };
      
      const updatedComments = [...existingComments, newComment];
      localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
      
      setComment("");
      onCommentAdded();
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add your comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <Textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting || !comment.trim()}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}