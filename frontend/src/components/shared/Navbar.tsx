import React from 'react'
// import { BellRing, User } from 'lucide-react'
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuLabel, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu'
// import { Button } from '@/components/ui/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-end items-center">
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        {/* <Button variant="outline" size="icon">
          <BellRing className="h-5 w-5" />
        </Button> */}

        {/* User Profile Dropdown */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </nav>
  )
}

export default Navbar;