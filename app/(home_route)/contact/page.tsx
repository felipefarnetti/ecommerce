"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData["message"]);

      alert("Message successfully sent");
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  }

  function clearForm() {
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Redirect to the current page to clear the form state
    router.refresh();
  }

  return (
    <main className="flex h-auto flex-col items-center bg-blue-gray-100 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="mt-10 mb-2 w-96 max-w-screen-lg sm:w-96 bg-gradient-to-r from-blue-100 to-pink-100 border border-gray-400 p-4 rounded-lg"
      >
        <h2 className="text-center text-lg font-semibold underline underline-offset-8 mb-4">
          Contact Form
        </h2>

        <div className="mb-4 flex flex-col w-500">
          <label htmlFor="form-name">Name:</label>
          <input
            id="form-name"
            autoComplete="name"
            maxLength={50}
            size={50}
            name="name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            className="text-black bg-gray-300 rounded-lg p-2 shadow-sm"
          />

          <label htmlFor="form-email"> Email:</label>
          <input
            id="form-email"
            required
            autoComplete="email"
            maxLength={80}
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            className="text-black bg-gray-300 rounded-lg p-2 shadow-sm"
          />

          <label htmlFor="form-message"> Message: </label>
          <textarea
            id="form-message"
            required
            name="message"
            rows={5}
            value={formData.message}
            onChange={(event) =>
              setFormData({ ...formData, message: event.target.value })
            }
            className="text-black bg-gray-300 rounded-lg p-2 shadow-sm"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="rounded-lg bg-sky-400 w-20 h-10 border-black border shadow-md"
            type="submit"
          >
            Send
          </button>
          <button
            className="rounded-lg bg-sky-400 w-20 h-10 border-black border shadow-md"
            type="button"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="relative flex place-items-center mt-4 mb-10 w-20 h-10 justify-center bg-yellow-600 text-black border-black border rounded-lg shadow-md">
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
