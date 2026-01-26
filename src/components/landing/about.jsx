'use client'
import Image from "next/image"
export default function About({ props }) {
    const { title, subtitle1, subtitle2, subtitle3 } = props
    return (
        <section className="lg:max-w-[80rem] mx-auto py-[4rem] lg:py-[6rem]" id="tentang" >
            <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="px-8 text-center">
                    <Image src="/dokumentasi.png" width={450} height={450} alt="Kizunice Academy" className="rounded-l-3xl" />
                </div>
                <div className="px-8 text-left lg:px-14 lg:max-w-2xl lg:mt-[-4em] md:mt-[-2em]">
                    <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        {title}
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey ">
                        {subtitle1}
                    </p>
                    <p className="mx-auto my-6 w-full text-grey ">
                        {subtitle2}
                    </p>
                    <p className="mx-auto my-6 w-full text-grey ">
                        {subtitle3}
                    </p>
                </div>
            </div>
        </section>
    )
}