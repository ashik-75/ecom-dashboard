"use client";

function Error({ error }: { error: Error }) {
  return <div>{error.message || "Something went wrong"}</div>;
}

export default Error;
