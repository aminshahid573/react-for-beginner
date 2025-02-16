
import {  useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import databaseService from "../appwrite/databaseService";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import storageService from "../appwrite/storageService";
import parse from 'html-react-parser';


export default function BlogList() {
  // {
  //   id: 1,
  //   title: "Getting Started with React",
  //   content:
  //     "React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update and render them when the data changes. React uses a virtual DOM to optimize rendering performance...",
  //   image: "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  // },
  const {user} = useSelector(state=>state.auth)
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadAllBlogs = async () => {
      try {
        // Retrieve blogs for the logged in user
        const response = await databaseService.getBlogs([
          Query.equal("userId", user.$id),
        ]);

        // Replace featuredImage with the preview URL for each blog
        const updatedBlogs = await Promise.all(
          response.documents.map(async (blog) => {
            if (blog.featuredImage) {
              try {
                const filePreview = await storageService.getFilePreview(
                  blog.featuredImage
                );
                return { ...blog, featuredImage: filePreview.href };
              } catch (error) {
                console.error(
                  "Error getting file preview for blog:",
                  blog._id,
                  error
                );
                // Optionally, you can keep the original value or set to a default image
                return blog;
              }
            }
            return blog;
          })
        );

        console.log(updatedBlogs)
        setBlogs(updatedBlogs);
      } catch (error) {
        console.log("APPWRITE SERVICE :: loadAllBlogs :: ERROR", error);
      }
    };

    if (user && user.$id) {
      loadAllBlogs();
    }
  }, [user, setBlogs]);
  

  const handleDelete = async (id) => {
    try {
      const response = await databaseService.deleteBlog(id);
      if (response) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.$id !== id));  
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }

  }

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Editing blog with id: ${id}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Blogs</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.$id} className="flex flex-col h-full">
          <CardHeader className="p-0">
            <img
              src={blog.featuredImage || "/placeholder.svg"}
              alt={blog.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="flex-grow">
            <CardTitle className="mt-2 mb-2">{blog.title.trim()}</CardTitle>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => handleEdit(blog.$id)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.$id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
        ))}
      </div>
    </div>
  )
}

