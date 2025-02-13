import BlogCard from "./BlogCard";
import { Button } from "./ui/button";

function FeaturedPost() {
  return (
    <div className=" mt-11">
      <div className="flex justify-between mb-5">
        <span className="font-bold text-2xl">Featured blog posts</span>
        <Button className="text-[#578FCA] bg-[#D1F8EF] font-bold hover:bg-[#578FCA] hover:text-[#3674B5]">
          View all posts
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-16">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}

export default FeaturedPost;
