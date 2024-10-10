import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer";
import { ApolloWrapper } from '../lib/ApolloProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "@/providers/AuthProvider";


const inter = Inter({ subsets: ["latin"] });
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})
export const metadata: Metadata = {
  title: "Opaline - Seamless Booking for Service Providers",
  description: "Opaline empowers service providers and clients by offering a streamlined platform for booking appointments, managing schedules, and staying connected with real-time notifications. Whether you're running a beauty salon, barber shop, or wellness center, Opaline ensures a seamless experience from start to finish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.variable} >
        <NavBar />
        <main className='main'>
          <ApolloWrapper>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ApolloWrapper>
          <ToastContainer
            autoClose={3000}
            theme="colored"
          />
        </main>
        <Footer />

      </body>
    </html>
  );
}
