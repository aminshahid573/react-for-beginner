import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Mail } from "lucide-react"
import { useParams } from "react-router-dom"
import databaseService from "../appwrite/databaseService"
import storageService from "../appwrite/storageService"
import authService from "../appwrite/authService"
import ReactHtmlParser from 'react-html-parser';
import HtmlParser from "react-html-parser"


export default function POst() {
  const {slug} = useParams();

  const [blogPost, setBlogPost] = useState(null)

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await databaseService.getBlog(slug);
        console.log(response.featuredImage);
        const filePreview = await storageService.getFilePreview(response.featuredImage);
        setBlogPost({...response, featuredImage: filePreview.href});
        
        try{
          const userDetails = await authService.account.get(response.userId);
          console.log(userDetails)
        } catch (error) {
          console.log("APPWRITE SERVICE :: getUserDetailsById :: ERROR", error);
        }
      } catch (error) {
        console.log("APPWRITE SERVICE :: getBlogs :: ERROR ", error);
      }
    } 
    loadBlog() 
  }, []);

  

  if (!blogPost) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <img
          src={blogPost.featuredImage || "https://placehold.co/600x400"}
          alt="Featured"
          className="w-full h-64 object-cover rounded-t-lg mb-4"
        />
        <CardTitle className="text-3xl font-bold">{blogPost.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} /> */}
        <div className="prose max-w-none">
          {HtmlParser(blogPost.content)}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={blogPost.featuredImage} alt={blogPost.title} />
            <AvatarFallback>
              {blogPost.title
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{blogPost.title}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-4 w-4" />
              {blogPost.title}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="mr-1 h-4 w-4" />
            Created: {new Date(blogPost.$createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center mt-1">
            <CalendarDays className="mr-1 h-4 w-4" />
            Updated: {new Date(blogPost.$updatedAt).toLocaleDateString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

