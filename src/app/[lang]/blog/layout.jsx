import { Livvic } from "next/font/google";
import "@/styles/globals.css"
import Head from '@/app/[lang]/blog/head'
import { getDictionary } from "../../dictionaries";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

const livvic = Livvic({ 
  weight: ['100','200','300','400','500','600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
});


export default async function BlogLayout({params, children}) {
  const {header, footer } = await getDictionary(params.lang); 
  return (
    <html lang="id">
      <Head/>
      <body className={livvic.className}>
        <Header props={header}/>
          <div className="container">
            {children}
          </div>
        <Footer props={footer}/>
      </body>
   </html>
  )
}
