import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  data: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    imageUrl: string
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{data.title}</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">{data.subtitle}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href={data.ctaLink}>
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
                  {data.ctaText}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={data.imageUrl || "/placeholder.svg"}
              alt="Hero Image"
              width={550}
              height={550}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

