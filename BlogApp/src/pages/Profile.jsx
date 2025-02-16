import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Upload } from "lucide-react";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../redux/authSlice";
import storageService from "../appwrite/storageService";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const photoId = user?.prefs?.photoId || "";
  const [photoUrl, setPhotoUrl] = useState("");

  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authService.account.getSession("current");
        if (session) {
          await dispatch(getCurrentUser());
        }
      } catch (error) {
        navigate("/login");
      }
    };
    checkSession();
  }, [dispatch, navigate]);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
      setIsLogoutConfirmOpen(false);
    });
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (event.target.new.value !== event.target.confirm.value) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Passwords do not match",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    authService
      .updatePassword({
        currentPassword: event.target.current.value,
        newPassword: event.target.new.value,
      })
      .then((res) => {
        setIsChangePasswordOpen(false);
        toast({
          title: "Update Sucessful",
          description: "Password Updated Scessfully",
        })
      });
  };


  const handleChangeProfilePicture = async (event) => {
    event.preventDefault();
    const file = event.target.profilePic.files[0];

    if (!file) return;

    try{
      const uploadResponse = await storageService.uploadFile(file);
      await authService.account.updatePrefs({ photoId: uploadResponse.$id } );

      //update photoUrl immediately after succeful upload
      setPhotoUrl(await storageService.getFilePreview(uploadResponse.$id));

      toast({
        title: "Update Successful",
        description: "Profile updated successfully",
      });

      setIsProfileUpdateOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: err.message || "Failed to update profile picture.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

    
  useEffect(() => {
    const fetchPhotoUrl = async () => {
      if (photoId) {
        const res = await storageService.getFilePreview(photoId);
        setPhotoUrl(res);
      }
    };
    
    fetchPhotoUrl();
  }, [photoId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative group">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={photoUrl.href} alt={user.name} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Dialog
                  open={isProfileUpdateOpen}
                  onOpenChange={setIsProfileUpdateOpen}
                >
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Pencil className="text-white" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Profile Picture</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleChangeProfilePicture}>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="profilePic">Picture</Label>
                        <Input id="profilePic" type="file" accept="image/*" />
                      </div>
                      <DialogFooter className="mt-4">
                        <Button type="submit">
                          <Upload className="mr-2 h-4 w-4" /> Upload
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-center">{user.name}</h2>
              <p className="text-muted-foreground text-center">{user.email}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Dialog
              open={isChangePasswordOpen}
              onOpenChange={setIsChangePasswordOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full">Change Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleChangePassword}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="current" className="text-right">
                        Current
                      </Label>
                      <Input
                        id="current"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new" className="text-right">
                        New
                      </Label>
                      <Input id="new" type="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirm" className="text-right">
                        Confirm
                      </Label>
                      <Input
                        id="confirm"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isLogoutConfirmOpen}
              onOpenChange={setIsLogoutConfirmOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to logout?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsLogoutConfirmOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    );
  }
};

export default Profile;
