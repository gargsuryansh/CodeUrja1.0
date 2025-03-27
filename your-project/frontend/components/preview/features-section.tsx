import type React from "react"
import { Zap, Star, Shield, Heart, Cpu, BarChart, Smartphone, Globe, Layers, RefreshCw } from "lucide-react"

interface FeaturesSectionProps {
  data: {
    title: string
    subtitle: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
}

export function FeaturesSection({ data }: FeaturesSectionProps) {
  // Map of icon names to components
  const iconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="h-10 w-10 text-slate-900" />,
    Star: <Star className="h-10 w-10 text-slate-900" />,
    Shield: <Shield className="h-10 w-10 text-slate-900" />,
    Heart: <Heart className="h-10 w-10 text-slate-900" />,
    Cpu: <Cpu className="h-10 w-10 text-slate-900" />,
    BarChart: <BarChart className="h-10 w-10 text-slate-900" />,
    Smartphone: <Smartphone className="h-10 w-10 text-slate-900" />,
    Globe: <Globe className="h-10 w-10 text-slate-900" />,
    Layers: <Layers className="h-10 w-10 text-slate-900" />,
    RefreshCw: <RefreshCw className="h-10 w-10 text-slate-900" />,
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{data.title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {data.subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {data.features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-white shadow-sm">
              <div className="p-2 rounded-full bg-gray-100">
                {iconMap[feature.icon] || <Zap className="h-10 w-10 text-slate-900" />}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

