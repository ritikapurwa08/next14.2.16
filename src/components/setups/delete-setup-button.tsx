// components/setups/delete-setup-dialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UseDeleteSetup } from "@/api/setups/delete-setup";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteSetupDialogProps {
  id: Id<"setups">;
}

const DeleteSetupDialog: React.FC<DeleteSetupDialogProps> = ({ id }) => {
  const { mutate: deleteSetup, isPending: deletingSetup } = UseDeleteSetup();

  const handleDelete = () => {
    deleteSetup(
      { id },
      {
        onSuccess: (data) => {
          console.log("Setup deleted:", data);
          // Handle success state or redirect if needed
        },
        onError: (error) => {
          console.error("Error deleting setup:", error);
          // Handle error message
        },
        onSettled: () => {
          console.log("delete operation settled.");
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={deletingSetup}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Setup</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this setup? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletingSetup}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={deletingSetup} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSetupDialog;
