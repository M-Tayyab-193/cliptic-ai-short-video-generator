import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const Loader = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogTitle>Processing</AlertDialogTitle>
        <div className="flex flex-col gap-3 items-center justify-center p-8">
          <Image
            src="/progress.gif"
            alt="loading"
            width={100}
            height={100}
            className="object-cover"
          />
          <h2>Generating your video... Do not refresh the page</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Loader;
