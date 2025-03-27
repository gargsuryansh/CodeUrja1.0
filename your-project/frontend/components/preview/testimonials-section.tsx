import Image from "next/image"

interface TestimonialsSectionProps {
  data: {
    title: string
    subtitle: string
    testimonials: Array<{
      quote: string
      author: string
      role: string
      avatarUrl: string
    }>
  }
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-white shadow-sm">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatarUrl || "/placeholder.svg?height=64&width=64"}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
              <blockquote className="text-center text-gray-500 dark:text-gray-400">"{testimonial.quote}"</blockquote>
              <div className="text-center">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

