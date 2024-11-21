import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ALLOWED_GRADES } from "@/constants/auth";

const Layout: React.FC = () => {
  const { user } = useAuth();
  // const [gradeUpdated, setGradeUpdated] = useState(user?.grade);
  let gradeUpdated = user?.grade;
  const [gradeError, setGradeError] = useState<string>();
  const [grade, setGrade] = useState<number>();
  console.log('grade - ', grade)

  const handleGradeUpdate = () => {
    if (!grade || !ALLOWED_GRADES.includes(grade)) {
      console.log('Please pick from allowed grades.')
      setGradeError("Please pick from allowed grades.");
      return;
    }
    
    // TODO: call profile updation api
  };

  return (
    <div className="flex h-screen w-screen">

      {/* Block everything with modal if grade is not set */}
      {!gradeUpdated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Update Your Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Please set your grade to continue using the app.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <select
                className="w-full p-2 border rounded mr-4"
                value={grade}
                onChange={(e) =>
                  setGrade(parseInt(e.target.value))
                }
              >
                <option value="">Select Grade</option>
                {[7, 8, 9, 10, 11].map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
              <Button variant="default" onClick={handleGradeUpdate}>
                Update Grade
              </Button>
            </CardFooter>
            {gradeError && (
              <p className="text-red-500 text-sm">{gradeError}</p>
            )}
          </Card>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
