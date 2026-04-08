import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

interface NotifyFormProps {
  onSuccess: (email: string) => void;
}

export default function NotifyForm({ onSuccess }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error(`Server returned non-JSON response: ${response.status}`);
      }

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onSuccess(email);
        }, 1000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || `Error ${response.status}: ${data.details || "Something went wrong"}`);
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message === "Failed to fetch" ? "Network error: Could not reach server." : error.message);
    }
  };

  return (
    <div className="w-full max-w-[320px] md:max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 pl-4 md:pl-6 backdrop-blur-sm transition-colors group-focus-within:border-white/20"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder:text-white/30 py-2 md:py-3 text-base md:text-sm"
            disabled={status === "loading" || status === "success"}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="flex-shrink-0 bg-white text-black h-8 md:h-10 px-4 md:px-6 rounded-full font-medium text-[10px] md:text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <>
                Notify
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-6 text-red-400 text-xs font-medium"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
