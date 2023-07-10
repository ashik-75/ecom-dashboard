import Loader from "@/components/ui/loader";

function loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader />
    </div>
  );
}

export default loading;
