import { AdminProvider } from "@/contexts/adminContext";
import "@/styles/main.scss";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps}></Component>;
}
