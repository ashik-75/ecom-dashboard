import Spinner from "@/components/Spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner />
    </div>
  );
}

export default Loading;
