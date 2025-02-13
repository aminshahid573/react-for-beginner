import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logoutUser } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { Button } from "../components/ui/button";
import storageService from "../appwrite/storageService";
import Hero from "../components/Hero";
import "../index.css"
import FeaturedPost from "../components/FeaturedPost";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authService.account.getSession("current");
        if (session) {
          await dispatch(getCurrentUser());
          
        }
      } catch (error) {
        navigate("/login");
        return;
      }
    };
    checkSession();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => navigate("/login"));
  };

  //conditional rendering
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isAuthenticated) {
    storageService.getFilePreview(user.prefs.photoId).then((url)=>setImage(url.href))
    .then((data) => console.log(data.href))
    // return (
    //   <div className="">
    //     <h1>Hey {user.name}!</h1>
    //     <img 
    //     className="rounded-full w-10 h-10 border shadow-xl"
    //     src={image}
    //     alt="" />
    //     <Button onClick={handleLogout} variant="destructive">
    //       Logout
    //     </Button>
    //   </div>
    // );

    return(
      <div className="px-16">
        <Hero/>
        <FeaturedPost />
        </div>
    )
  } else {
    navigate("/login");
    return null;
  }
}
export default Dashboard;
