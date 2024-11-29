import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel
  } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
  
  type DialogProps = {
    trigger: React.ReactNode;
  };
  
  export const DialogBox: React.FC<DialogProps> = ({ trigger }) => {
    // console.log('trigger - ', trigger)
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Not Yet Implemented</AlertDialogTitle>
            <AlertDialogDescription>
              This feature is not yet implemented. Please check back later!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel><Button variant="secondary">Close</Button></AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  