"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg text-black"
    >
      <div className="mb-4">
        <label className="block mb-1 font-medium text-black">Nom</label>
        <input
          type="text"
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-[#38b6ff]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-black">Email</label>
        <input
          type="email"
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-[#38b6ff]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-black">Message</label>
        <textarea
          required
          className="w-full border border-gray-300 p-2 rounded h-32 focus:outline-none focus:border-[#38b6ff]"
        />
      </div>

      <button
        type="submit"
        className="bg-[#38b6ff] text-white px-6 py-2 rounded-xl hover:bg-[#2a9be0] transition"
      >
        Envoyer
      </button>

      {sent && (
        <p className="mt-4 text-green-600">Message envoyé avec succès !</p>
      )}
    </form>
  );
}
