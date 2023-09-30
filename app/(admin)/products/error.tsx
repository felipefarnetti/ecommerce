"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="mt-4 mb-4">Something went wrong!</h2>
      <h2>
        Cause: <span className="text-red-400">{error.message}</span>
      </h2>
      <button
        onClick={() => reset()} // Attempt to recover by trying to re-render the segment
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  );
}
