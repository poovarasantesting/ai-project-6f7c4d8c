import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { useToast } from "@/components/ui/use-toast";

// Mock user data
const userData = {
  name: "Jane Smith",
  username: "@janesmith",
  bio: "Digital content creator | Photography enthusiast | Coffee lover",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  followers: 2345,
  following: 567,
  joinedDate: "January 2023"
};

// Mock posts data
const userPosts = [
  {
    id: 1,
    content: "Just finished my latest photography project. Can't wait to share it with everyone!",
    likes: 124,
    comments: 42,
    createdAt: "2h ago"
  },
  {
    id: 2,
    content: "The sunrise this morning was absolutely breathtaking. Nature's beauty never fails to inspire me.",
    likes: 89,
    comments: 16,
    createdAt: "1d ago"
  },
  {
    id: 3,
    content: "Experimenting with new editing techniques. Always learning, always growing.",
    likes: 205,
    comments: 35,
    createdAt: "3d ago"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You unfollowed ${userData.name}` : `You are now following ${userData.name}`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.username}</p>
              <p className="my-3">{userData.bio}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2 mb-4">
                <div>
                  <span className="font-bold">{userData.followers}</span> 
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{userData.following}</span> 
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Joined {userData.joinedDate}</span>
                </div>
              </div>
              
              <Button 
                variant={isFollowing ? "outline" : "default"}
                onClick={handleFollow}
                className="w-full md:w-auto"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-4">
          {userPosts.map(post => (
            <PostCard key={post.id} post={{
              id: post.id,
              content: post.content,
              author: {
                name: userData.name,
                username: userData.username,
                avatar: userData.avatar
              },
              likes: post.likes,
              comments: post.comments,
              createdAt: post.createdAt
            }} />
          ))}
        </TabsContent>
        
        <TabsContent value="media" className="text-center py-12">
          <p className="text-muted-foreground">No media posts yet</p>
        </TabsContent>
        
        <TabsContent value="likes" className="text-center py-12">
          <p className="text-muted-foreground">No liked posts yet</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}