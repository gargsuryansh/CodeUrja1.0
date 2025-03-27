import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  data: {
    title: string
    subtitle: string
    primaryButtonText: string
    primaryButtonLink: string
    secondaryButtonText: string
    secondaryButtonLink: string
    backgroundColor: string
  }
}

export function CTASection({ data }: CTASectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 text-white" style={{ backgroundColor: data.backgroundColor }}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{data.title}</h2>
            <p className="mx-auto max-w-[700px] md:text-xl">{data.subtitle}</p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href={data.primaryButtonLink}>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-200">
                {data.primaryButtonText}
              </Button>
            </Link>
            <Link href={data.secondaryButtonLink}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {data.secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

