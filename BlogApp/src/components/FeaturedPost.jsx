import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Button } from "./ui/button";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";

function FeaturedPost() {
const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const loadAllBlogs = async () => {
      try {
        // Retrieve blogs for the logged in user
        const response = await databaseService.getBlogs();

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
                  blog.$id,
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

      loadAllBlogs();
    
  }, [setBlogs]);

  const parseHtmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }; 
  
  

  return (
    <div className=" mt-11">
      <div className="flex justify-between mb-5">
        <span className="font-bold text-2xl">Featured blog posts</span>
        <Button className="text-[#578FCA] bg-[#D1F8EF] font-bold hover:bg-[#578FCA] hover:text-[#3674B5]">
          View all posts
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-16">
        {blogs.map(blog=>(
          <BlogCard slug={blog.slug} key={blog.$id} title={blog.title} content={parseHtmlToText(blog.content)} featuredImage={blog.featuredImage} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedPost;


