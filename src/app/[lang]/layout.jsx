'use client'
import { useEffect,useState } from 'react';
import { Livvic } from "next/font/google";
import "@/styles/globals.css"
import Head from './head';
import Loading from "./loading";

const livvic = Livvic({ 
  weight: ['100','200','300','400','500','600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
});

export default  function RootLayout({children}) {
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <html lang="id">
      <Head/>
      <body className={livvic.className}>
        {
          loading ? <Loading/> : children
        }
      </body>
    </html>
  );
}
