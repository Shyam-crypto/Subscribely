import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-4 p-24 ${inter.className}`}
    >
      <h1 className={'text-xl font-semibold'}>
        Welcome to ShopNow! from <Link href={'https://www.duolearn.tech/'} target={'_blank'}>Duolearn</Link>
      </h1>
      <p className={'text-center w-[50%]'}>
        This is A Modern E-Commerce Platform built using MERN stack, Next.js, and TailwindCSS.
        You can find the complete project structure and other required docs in the GitHub ReadME file.
      </p>
    </main>
  )
}
