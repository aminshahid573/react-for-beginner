import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../components/login-form"

export default function Login() {
  return (
    (<div
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gray-100 p-6 md:p-10 dark:bg-gray-800">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Blog App.
        </a>
        <LoginForm />
      </div>
    </div>)
  );
}
