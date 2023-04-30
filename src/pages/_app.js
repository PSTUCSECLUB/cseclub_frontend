import { AdminProvider } from "@/contexts/adminContext";
import "@/styles/main.scss";

export default function App({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps}></Component>
    </AdminProvider>
  );
}
