import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "../hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, registerUser } from "../redux/authSlice";
import storageService from "../appwrite/storageService";
import { useEffect,useState } from "react";
import authService from "../appwrite/authService";

export function RegisterForm({ className, ...props }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast()
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (data) => {
    const { email, password, name, picture } = data
    
    dispatch(registerUser({ email, password, name}))
    .then(async (res) => {
      if (res.payload && res.type === "auth/register/fulfilled") {
        try {
          let photoId = '';
          if(picture && picture.length > 0){
            setUploading(true);
            const file = picture[0];
            const uploadRes = await storageService.uploadFile(file);
            photoId = uploadRes?.$id || "";
          }
          
          if(photoId) {
            await authService.account.updatePrefs({ photoId });
          }

          toast({
            title: "Registration Successful",
            description: "You have successfully registered!",
          });
          navigate('/');
        } catch (err) {
          toast({
            variant: "destructive",
            title: "Update Failed",
            description: err.message || "Failed to update profile picture.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } finally {
          setUploading(false);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: res.payload || "An error occurred during registration",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    })
    .catch((err) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: err.message || "An unexpected error occurred.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome </CardTitle>
          <CardDescription>
            Create with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 12.48 5.867 .307 5.387.307 12s5.56 12 12.173 12c3.573 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200 dark:after:border-gray-800">
                <span className="relative z-10 bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", {required: "Email is required",pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    },
                  })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="Shahid Amin"
                    {...register("name", {required: "Name is required",minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters"
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: "Invalid name : Only letters and spaces are allowed"
                    }
                  })}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>

                  <Input
                  id="password"
                  type="password"
                  {...register("password", {required: "Password is required",minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }})}
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword", {required: "Confirm Password is required",validate: (value) => value === watch('password') || "Passwords do not match"})}
                  />
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Profile Picture</Label>
                  <Input
                  id="picture"
                  type="file"
                  accept="image/*" 
                  {...register("picture", {required: "Profile Picture is required"})}
                  />
                  {errors.picture && <p className="text-red-500">{errors.picture.message}</p>}
                </div>
                {uploading && (
        <div>
          <progress value={progress} max="100" style={{ width: '100%' }} />
          <span>{progress}%</span>
        </div>
      )}
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{""}
                <Link to="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-gray-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gray-900  dark:text-gray-400 dark:[&_a]:hover:text-gray-50">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        {""}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
