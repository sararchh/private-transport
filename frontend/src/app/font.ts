import localFont from "next/font/local";

export const PublicBankSans = localFont({
  src: [
    {
      path: "./fonts/Bank_Sans_Regular.otf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-bank-sans-regular",
});

export const alllLocalFontsInClass = `${PublicBankSans.variable}`;
