export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081";

export const loadRazorpayCheckout = async () => {
  if (typeof window === "undefined") {
    throw new Error("Checkout can only run in the browser.");
  }

  if ((window as Window & { Razorpay?: unknown }).Razorpay) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Unable to load the Razorpay checkout script."));
    document.body.appendChild(script);
  });
};
