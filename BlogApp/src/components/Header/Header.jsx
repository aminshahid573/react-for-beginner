import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import storageService from "../../appwrite/storageService";
import { useSelector } from "react-redux";
function Header() {

  const [dropDown, setDropDown] = useState("");
  const [image, setImage] = useState("");

  const { user, isAuthenticated, isLoading } = useSelector(state=>state.auth)


  const toggleDropDown = () => {
    dropDown === "hidden" ? setDropDown("") : setDropDown("hidden");
  };
 const [navLinks, setNavLinks] = useState([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
]);

useEffect(() => {
  setNavLinks((prevLinks) => {
    // Remove any existing login or profile links.
    const filteredLinks = prevLinks.filter(
      (link) => link.path !== "/login" && link.path !== "/profile"
    );

    // Conditionally add the appropriate link.
    if (isAuthenticated) {
      return [...filteredLinks, { name: "Profile", path: "/profile" }];
    } else {
      return [...filteredLinks, { name: "Login", path: "/login" }];
    }
  });
}, [isAuthenticated]);




  if(isLoading){
    return <h1>Loading...</h1>
  }

  storageService.getFilePreview(user?.prefs?.photoId).then((url)=>setImage(url.href))
    .then((data) => console.log(data.href))
  return (
    <div className="px-16 pt-3 flex justify-between">
      <div className="left text-2xl">
        <span className="bg-[#D1F8EF] text-[#3674B5] px-3 py-1 rounded">Blog</span> app
      </div>
      <div className="right">
        <ul className="flex gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
              className={({ isActive }) => (isActive ? "text-[#3674B5]" : "")}
              to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header