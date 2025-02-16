import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus, Upload } from "lucide-react"
import { Editor } from "@tinymce/tinymce-react"
import databaseService from "../appwrite/databaseService"
import { useSelector } from "react-redux"
import storageService from "../appwrite/storageService"
import { useToast } from "../hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Query } from "appwrite"

export default function BlogUpload() {
  const [title, setTitle] = useState("")
  const [featuredImage, setFeaturedImage] = useState(null)
  const [featuredImageId, setFeaturedImageId] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const editorRef = useRef(null);

  const {user} = useSelector(state=>state.auth)
  const {toast} = useToast()

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsImageUploading(true);
      setFeaturedImage(file)
      try{
        const uploadResponse = await storageService.uploadFile(file)
        setFeaturedImageId(uploadResponse);
        setIsImageUploading(false);
        console.log(uploadResponse)
        toast({
          variant: "default",
          title: "Image uploaded successfully",
          description: "Your image has been uploaded successfully.",
        })
      } catch (error) {
        setIsImageUploading(false);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error.message || "Failed to Upload featured image.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      
    }
  }

  const handleUpload = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      if(!title || !content){
        alert("Please fill all the fields")
        return
      }
      if(isImageUploading){
        toast({
          variant: "destructive",
          title: "Oops!",
          description: "Image is still uploading.",
        })
        return
      }
      try{
        databaseService.createBlog({
          title,
          slug: await generateSlug(title),
          content,
          featuredImage: featuredImageId ? featuredImageId?.$id : "" ,
          status:"active",
          userId:user.$id})

          toast({
            variant: "default",
            title: "Blog uploaded successfully",
            description: "Your blog has been uploaded successfully.",
          })

        setTitle("");
        editorRef.current.setContent("");
        setFeaturedImage(null);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error.message || "Failed to create blog.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
  }

  const isSlugExists = async (slug) => {
    try {
      const response = await databaseService.getBlogs([Query.equal("slug", slug)]);
      return response.documents.length > 0;
    } catch (error) {
      console.error("Error checking slug:", error);
      return false;
    }
  }
  const generateSlug = async () => {
    //sanitize the title first
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    //check if same title as slug already exists using databaseService.getBlogs([required query]) if yes then add 1 to the slug  using while loop
    let slug = sanitizedTitle;
    let counter = 1;
    while (await isSlugExists(slug)) {
      slug = `${sanitizedTitle}-${counter}`;
      counter++;
    }
    return slug;
  }
  return (
    <Card className="w-full max-w-4xl mt-11 mx-auto">
      <CardHeader>
        <CardTitle>Upload a New Blog Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Blog Content</Label>
          <Editor
            apiKey="75eqfstvemz1gt9mb0lcfikutsuq1e3vzwnicdss7ggj5o43" // Replace with your actual TinyMCE API key
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Featured Image</Label>
          <div className="flex items-center space-x-2">
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <Label
              htmlFor="image"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
            >
              {featuredImage ? (
                <img
                  src={URL.createObjectURL(featuredImage) || "/placeholder.svg"}
                  alt="Featured"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Add Featured Image</span>
                </div>
              )}
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} className="w-full">
          <Upload className="mr-2 h-4 w-4" /> Upload Blog Post
        </Button>
      </CardFooter>
    </Card>
  )
}

