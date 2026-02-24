import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { type InsertMessage } from "@shared/schema";

export function useContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const base =
        (import.meta.env.VITE_API_BASE as string) ||
        "https://portfolio-mk-backend.up.railway.app";
      const url = base
        ? `${base.replace(/\/$/, "")}${api.contact.submit.path}`
        : api.contact.submit.path;

      const res = await fetch(url, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Some hosts (or proxies) may return empty or non-JSON error bodies.
        // Try to parse JSON, otherwise fallback to text and a generic message.
        try {
          const error = await res.json();
          throw new Error(error.message || "Failed to send message");
        } catch (e) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Failed to send message");
        }
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Encrypted & Sent",
        description: "I'll get back to you as soon as I decrypt it.",
        variant: "default",
        className: "border-primary/50 text-primary bg-black/90",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Transmission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
