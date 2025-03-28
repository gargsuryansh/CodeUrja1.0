import type React from "react"
import { Star, Shield, Award, Zap, Heart, Cpu, BarChart, Smartphone, Globe, Layers, RefreshCw } from "lucide-react"

interface WhyChooseUsSectionProps {
  data: {
    title: string
    subtitle: string
    reasons: Array<{
      title: string
      description: string
      icon: string
    }>
  }
}

export function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  // Map of icon names to components
  const iconMap: Record<string, React.ReactNode> = {
    Star: <Star className="h-10 w-10 text-primary" />,
    Shield: <Shield className="h-10 w-10 text-primary" />,
    Award: <Award className="h-10 w-10 text-primary" />,
    Zap: <Zap className="h-10 w-10 text-primary" />,
    Heart: <Heart className="h-10 w-10 text-primary" />,
    Cpu: <Cpu className="h-10 w-10 text-primary" />,
    BarChart: <BarChart className="h-10 w-10 text-primary" />,
    Smartphone: <Smartphone className="h-10 w-10 text-primary" />,
    Globe: <Globe className="h-10 w-10 text-primary" />,
    Layers: <Layers className="h-10 w-10 text-primary" />,
    RefreshCw: <RefreshCw className="h-10 w-10 text-primary" />,
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{data.title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {data.reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-white shadow-sm">
              <div className="p-2 rounded-full bg-primary/10">
                {iconMap[reason.icon] || <Star className="h-10 w-10 text-primary" />}
              </div>
              <h3 className="text-xl font-bold">{reason.title}</h3>
              <p className="text-gray-500 text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

