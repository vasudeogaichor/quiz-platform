import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogBox } from "../ui/dialog-box";
import { Bell, Lock, User, Settings, Mail } from "lucide-react";
import { useUserStore } from "@/store";
import { updateUserProfile } from "@/api/profile";
import { useToast } from "@/hooks/useToast";

interface UserSettings {
  profile: {
    name: string;
    email: string;
    grade: string;
    avatar?: string;
  };
  notifications: {
    emailNotifications: boolean;
    quizReminders: boolean;
    progressUpdates: boolean;
    newContentAlerts: boolean;
  };
  preferences: {
    difficultyLevel: string;
    language: string;
    theme: string;
    quizTimer: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const { user } = useUserStore();
  const [ profileErrors, setProfileErrors ] = useState<string | null>(null);
  // console.log('profileErrors, setProfileErrors - ', profileErrors, setProfileErrors)
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      name: user?.fullName ?? "",
      email: user?.email ?? "",
      grade: String(user?.grade) ?? "",
      // avatar: "/api/placeholder/100/100",
    },
    notifications: {
      emailNotifications: true,
      quizReminders: true,
      progressUpdates: true,
      newContentAlerts: false,
    },
    preferences: {
      difficultyLevel: "medium",
      language: "english",
      theme: "light",
      quizTimer: true,
    },
  });

  const handleSaveProfile = async (updatedProfile: UserSettings["profile"]) => {
    // console.log("calling api..........");
    // console.log("updatedProfile - ", settings.profile);
    try {
      const updatedProfileData = {
        grade: parseInt(updatedProfile.grade),
        email: updatedProfile.email,
        fullName: updatedProfile.name
      }
      const response = await updateUserProfile(updatedProfileData);
      // console.log("response - ", response);
      if (response.success) {
        toast({
          variant: "default",
          title: "Profile updated successfully",
          // description: "Something went wrong",
        });
      } else {
        if (response.errors?.length) {
            setProfileErrors(response.errors.join(", "));
        } else {
          toast({
            variant: "destructive",
            title: "Profile update failed",
            description: "Something went wrong",
          });
        }
      }
    } catch (error: any) {
      console.log('error - ', error)
      if (error?.response?.data?.errors?.length) {
        setProfileErrors(error.response.data.errors.join(", "));
      } else {
        toast({
          variant: "destructive",
          title: "Profile update failed",
          description: "Something went wrong",
        });
      }
    }
  };

  const handleProfileUpdate = (
    field: keyof UserSettings["profile"],
    value: string
  ) => {
    setProfileErrors("");
    setSettings((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const handleNotificationToggle = (
    field: keyof UserSettings["notifications"]
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  };

  const handlePreferenceUpdate = (
    field: keyof UserSettings["preferences"],
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value },
    }));
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>

          {/* TODO: Remove dialog box after implmenting below settings */}
          <DialogBox
            trigger={
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
            }
          />

          <DialogBox
            trigger={
              <TabsTrigger
                value="preferences"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" /> Preferences
              </TabsTrigger>
            }
          />

          <DialogBox
            trigger={
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Security
              </TabsTrigger>
            }
          />
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={settings.profile.avatar} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div> */}

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) =>
                      handleProfileUpdate("name", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      handleProfileUpdate("email", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    value={settings.profile.grade}
                    onValueChange={(value) =>
                      handleProfileUpdate("grade", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {[7, 8, 9, 10].map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {profileErrors && (
                  <p className="text-red-500 text-sm">{profileErrors}</p>
                )}
              <Button
                variant="default"
                onClick={() => handleSaveProfile(settings.profile)}
                className="w-2/5"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage your notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {key.split(/(?=[A-Z])/).join(" ")}
                    </Label>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={() =>
                        handleNotificationToggle(
                          key as keyof UserSettings["notifications"]
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Customize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={settings.preferences.difficultyLevel}
                    onValueChange={(value) =>
                      handlePreferenceUpdate("difficultyLevel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) =>
                      handlePreferenceUpdate("language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) =>
                      handlePreferenceUpdate("theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="quizTimer">Show Quiz Timer</Label>
                  <Switch
                    id="quizTimer"
                    checked={settings.preferences.quizTimer}
                    onCheckedChange={(checked) =>
                      handlePreferenceUpdate("quizTimer", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
