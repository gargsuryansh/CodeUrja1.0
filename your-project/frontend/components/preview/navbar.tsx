import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface NavbarProps {
  data: {
    logo: string
    menuItems: Array<{
      label: string
      url: string
    }>
    ctaButton?: {
      label: string
      url: string
    }
  }
}

export function Navbar({ data }: NavbarProps) {
  return (
    <header className="w-full py-4 bg-white border-b">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              {data.logo || "Your Brand"}
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {data.menuItems.map((item, index) => (
              <Link key={index} href={item.url} className="text-sm font-medium text-gray-700 hover:text-gray-900">
                {item.label}
              </Link>
            ))}

            {data.ctaButton && (
              <Link href={data.ctaButton.url}>
                <Button size="sm">{data.ctaButton.label}</Button>
              </Link>
            )}
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

