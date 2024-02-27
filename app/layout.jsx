import "./globals.css";
import "@/public/assets/css/custom.css";
import "../public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../public/assets/vendor/boxicons/css/boxicons.min.css";
import "../public/assets/vendor/remixicon/remixicon.css";
import "../public/assets/custom/font/myfont.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/utils/Theme";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "ThinkEpic CMS",
  description: "ThinkEpic UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </html>
  );
}
