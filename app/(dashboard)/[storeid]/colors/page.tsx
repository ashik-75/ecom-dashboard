import { sleep } from "@/lib/utils";

async function Colors() {
  const result = await sleep(5000);
  return (
    <div className="flex items-center justify-center h-full ">
      <h1 className="bg-pink-600">{JSON.stringify(result, null, 2)}</h1>
    </div>
  );
}

export default Colors;
