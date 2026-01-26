'use client'
import { useState } from "react"
import Image from "next/image"


export default function Requirement({props}) {
    // const {title, subtitle} = props
    const [index, setIndex] = useState(0)

    const Page0 = () => {
        return (
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-primary">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">01</time>
                        <div className="text-lg font-black">Mengikuti Pra Seleksi</div>
                        <ul>
                            <li>Pemeriksaan Administrasi</li>
                            <li>Melakukan tes Kesemaptaan</li>
                            <li>Melakukan Ketahanan Fisik</li>
                            <li>Mengikuti Ujian PSikotes Dasar</li>
                            <li>Belajar Bahasa dan Budaya Jepang di LPK Kizuna Nippon</li>
                        </ul>
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-primary">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end mb-10">
                    <time className="font-mono italic">02</time>
                    <div className="text-lg font-black">Mengikuti Wawancara</div>
                        Wawancara langsung dengan pihak pemberi kerja baik secara online maupun offline (orang jepang)
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-primary">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                    <time className="font-mono italic">03</time>
                    <div className="text-lg font-black">BERANGKAT</div>
                        Kandidat yang lulus akan segera diproses dokumennya untuk pengurusan Kontrak Kerja, COE,Visa
                    </div>
                    <hr />
                </li>
                </ul>
        )
    }

    const Page1 = () => {
        return (
            <ul className="">
                <li>Perawat / Kaigo</li>
                <li>Pengolahan Makanan</li>
                <li>Pertanian</li>
                <li>Peternakan</li>
                <li>Pembersihan Gedung</li>
                <li>Konstruksi</li>
                <li>Manufaktur</li>
                <li>Perhotelan</li>
                <li>Perikanan</li>
                <li>Restaurant</li>
            </ul>
        )
    }

    const DisplayData = (index) => {
        switch (index) {
            case 0 : return <Page0 />
            case 1 : return <Page1 />
        }
    }

    return (
        <section className="lg:max-w-[80rem] mx-auto py-[4rem] lg:py-[6rem]" id="tentang" >
            <div className="flex flex-col justify-center items-center">
                <div className="text-center lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em] mb-8">
                    <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        <span className="text-secondary">Pendaftaran</span> Kizuna
                    </h1>
                </div>
                <div className="flex flex-row w-[900px] h-[600px] justify-center items-center bg-white rounded-md p-8">
                    <ul className="menu menu-vertical gap-6 text-white rounded-box mr-8">
                        <li className={`${index === 0 ? "bg-primary" : "text-gray-500"} p-2 rounded-md`}><button onClick={() => {setIndex(0)}} >Bidang Pekerjaan </button></li>
                        <li className={`${index === 1 ? "bg-primary" : "text-gray-500"} p-2 rounded-md`}><button onClick={() => {setIndex(1)}} >Alur Program</button></li>
                        <li className={`${index === 2 ? "bg-primary" : "text-gray-500"} p-2 rounded-md`}><button onClick={() => {setIndex(2)}} >Syarat Pendaftaran </button></li>
                    </ul>
                    <div className="px-8 text-left lg:px-14 lg:max-w-2xl bg-white">
                        {DisplayData(index)}
                    </div>
                </div>
            </div>
        </section>
    )
}