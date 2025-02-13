"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Upload } from "lucide-react"

const Profile = () => {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl: "https://github.com/shadcn.png",
  })

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...")
    setIsLogoutConfirmOpen(false)
  }

  const handleChangePassword = (event) => {
    event.preventDefault()
    // Implement change password logic here
    console.log("Changing password...")
    setIsChangePasswordOpen(false)
  }

  const handleChangeProfilePicture = (event) => {
    event.preventDefault()
    // Implement profile picture change logic here
    const file = event.target.profilePic.files[0]
    console.log("Changing profile picture...", file)
    // In a real app, you'd upload the file and update the user's avatar URL
    // For this example, we'll just update the local state
    setUser((prevUser) => ({
      ...prevUser,
      avatarUrl: URL.createObjectURL(file),
    }))
  }

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
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Dialog>
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
          <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
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
                    <Input id="current" type="password" className="col-span-3" />
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
                    <Input id="confirm" type="password" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isLogoutConfirmOpen} onOpenChange={setIsLogoutConfirmOpen}>
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
                <Button variant="outline" onClick={() => setIsLogoutConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Profile

