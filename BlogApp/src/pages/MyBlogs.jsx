import BlogList from "../components/BlogList"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"


export default function MyBlogs() {
  return (
    <main className="container mx-auto px-4 py-8 h-screen flex flex-col md:flex-row">
      <div className="md:w-[300px] mb-8 md:mb-0 md:mr-8">
      <Card className="w-full">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
        <Link to="/createblog">
        <Button className="w-full">Create Blog</Button>
        </Link>
      </CardContent>
    </Card>
      </div>
      <div className="flex-1 overflow-y-auto">
        <BlogList />
      </div>
    </main>
  )
}

