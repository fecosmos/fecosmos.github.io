import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <div className="font-bold text-4xl">Fecosmos</div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div className="flex gap-10 items-center flex-col sm:flex-row">
            <Link
              className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/docs"
              rel="noopener noreferrer"
            >
              学习
            </Link>
            <Link
              className="rounded-md border border-solid border-foreground/70 transition-all flex items-center justify-center bg-transparent text-foreground gap-2 hover:bg-foreground/5 hover:shadow-[0_0_0_1px] hover:shadow-foreground/30 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/interview/es6"
              rel="noopener noreferrer"
            >
              刷面试题
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
