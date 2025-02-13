import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function BlogCard() {
  return (
    <div className=" flex transform flex-col gap-3  p- transition-transform hover:scale-105">
      <figure className="relative h-52 w-full overflow-hidden bg-gray-200">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
          alt="demo"
        />
      </figure>

      <a href="#">
        <h3 className="mb-2 text-xl font-bold roboto-800 text-black transition-colors duration-200 hover:text-blue-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.

        </h3>
        <p className="text-gray-700 text-sm roboto-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          autem, labore laudantium odit ratione minima cupiditate, voluptates
          accusantium{" "}
        </p>
        <div className="mt-4 text-sm font-semibold text-gray-600 flex items-center">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="ml-3">Shahid Amin • 16 Jan 2025</span>
        </div>
      </a>
    </div>
  );
}

export default BlogCard;
