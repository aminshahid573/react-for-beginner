import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "../hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"

import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from "react-redux"
import { loginUser, resetError } from "../redux/authSlice"
import { useEffect } from "react"



export function LoginForm({
  className,
  ...props
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { error } = useSelector((state) => state.auth); // Get the error from Redux


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast()

  const onSubmit = (data) => {
    const {email,password} = data
    dispatch(loginUser({email,password}))
    .then((res) => {
      console.log(res)
      // Check if the login was actually successful
      if (res.payload && res.type !== "auth/login/rejected") {
        // If login was successful, show the success toast
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
        });
        navigate('/')
      } else {
        // If login failed (e.g., invalid credentials), show the error toast
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error || "Invalid credentials.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    })
    .catch((err) => {
      // Handle errors during the dispatch process
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error || "An unexpected error occurred.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    });
  }

  // Clear the error when the component mounts or the form is submitted
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (

    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 12.48 5.867 .307 5.387.307 12s5.56 12 12.173 12c3.573 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200 dark:after:border-gray-800">
                <span
                  className="relative z-10 bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="m@example.com"  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required", minLength: "8" })} 
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{""}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-gray-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gray-900  dark:text-gray-400 dark:[&_a]:hover:text-gray-50">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{""}
        and <a href="#">Privacy Policy</a>.
      </div>
     
    </div>)
  );
}
