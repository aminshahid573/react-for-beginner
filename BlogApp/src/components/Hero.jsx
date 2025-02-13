import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button"

function Hero() {
  return (
    <div className=" mt-10">
      <div className="roboto-900">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-[#578FCA]">
              <BreadcrumbLink href="/">Resources</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-[#578FCA]'/>
            <BreadcrumbItem className="text-[#578FCA] bg-[#D1F8EF] px-3 py-1 rounded">
              <BreadcrumbLink href="/components">
                Design & Photo Graphy
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-4">
        <h1 className="roboto-900 text-4xl">Design & Photo Graphy </h1>
        <p className="text-gray-900 roboto-300 font-bold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi veniam
          porro, consequatur corporis ab iusto beatae culpa eos nemo. Mollitia
          dolores explicabo labore optio, magni ex molestiae amet distinctio
          recusandae harum rerum! Praesentium facere provident quaerat mollitia
          ab cumque nesciunt!
        </p>
      </div>

      <div className="mt-4 relative">
          <img
            src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image"
            className="rounded-md object-cover w-screen h-lvh"
          />
        
        <div className="rounded-br-sm rounded-bl-sm absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
          <div className="top ">
            <p className="text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ab
              itaque illo, nisi ducimus fuga alias, saepe dolorum in ex illum
              fugit quam suscipit minima totam neque ipsum veniam mollitia.
            </p>
          </div>
          <div className="bottom mt-5 flex justify-between">
            <div className="left flex">
              <div>
                Written By
                <span className="mt-2 flex text-center items-center ">
                  <Avatar className="mr-2 w-[30px] h-[30px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  Shahid Amin
                </span>
              </div>

              <div className="ml-10">
                Published On 
                <p className="mt-2"> 22/12/2022</p>
              </div>
            </div>
            <div className="right">
              <p className="ml-2 mb-2 ">File Under</p>
              <div className="space-x-3 t">
                <Button variant="outline" className="bg-transparen rounded-full">Design</Button>
                <Button variant="outline" className="bg-transparen rounded-full">Retail</Button>
                <Button variant="outline" className="bg-transparen rounded-full">Interview</Button>
                <Button variant="outline" className="bg-transparen rounded-full">12 Months</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
