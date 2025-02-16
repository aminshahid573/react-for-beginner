import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

function BlogCard({featuredImage, title, content,slug}) {
  const turncateString = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    } else {
      return str;
    }
  }
  return (
    <div className=" flex transform flex-col gap-3  p- transition-transform hover:scale-105">
      <figure className="relative h-52 w-full overflow-hidden bg-gray-200">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={featuredImage}
          alt="demo"
        />
      </figure>

      <Link to={`/post/${slug}`}>
        <h3 className="mb-2 text-xl font-bold roboto-800 text-black transition-colors duration-200 hover:text-blue-600">
          {title}

        </h3>
        <p className="text-gray-700 text-sm roboto-300">
          {turncateString(content, 150)}
        </p>
        <div className="mt-4 text-sm font-semibold text-gray-600 flex items-center">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="ml-3">Shahid Amin • 16 Jan 2025</span>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
