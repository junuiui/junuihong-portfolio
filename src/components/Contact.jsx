import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export default function Contact() {
  const form = useRef();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current
    ).then(
      () => {
        setIsSending(false);
        setIsSent(true);
      },
      (error) => {
        setIsSending(false);
        alert("Failed to send: " + error.text);
      }
    );
  };

  const handleSuccessConfirm = () => {
    setIsSent(false); // hide the popup
    navigate("/"); // redirect to home
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white px-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-white pb-2 tracking-wider">
        CONTACT
      </h1>

      {/* Description */}
      <p className="text-center text-gray-300 mb-8 max-w-md text-sm md:text-base">
        Feel free to reach out! <br /> I'll get back to you soon.
      </p>

      {/* Contact Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-md flex flex-col gap-4 text-sm md:text-base"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-3 rounded-lg bg-transparent border border-white focus:outline-none focus:border-gray-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-3 rounded-lg bg-transparent border border-white focus:outline-none focus:border-gray-300"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="p-3 rounded-lg bg-transparent border border-white focus:outline-none focus:border-gray-300 h-40 resize-none"
          required
        />
        <button
          type="submit"
          disabled={isSending}
          className={`bg-white text-primary font-bold py-2 rounded-lg hover:bg-gray-200 transition-all ${isSending ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
          {isSending ? "Submitting..." : "Send Message"}
        </button>
      </form>

      {/* Success Popup */}
      {isSent && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-primary p-6 rounded-lg shadow-lg text-center border border-white">
            <p className="text-green-400 text-lg font-bold mb-4">
              Message sent successfully!
            </p>
            <button
              onClick={handleSuccessConfirm}
              className="bg-white text-primary font-bold py-2 px-6 rounded hover:bg-gray-200 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
