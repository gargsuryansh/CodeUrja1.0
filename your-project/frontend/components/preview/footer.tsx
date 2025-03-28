import Link from "next/link"

interface FooterProps {
  data: {
    logo: string
    tagline: string
    columns: Array<{
      title: string
      links: Array<{
        label: string
        url: string
      }>
    }>
    bottomText: string
  }
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="w-full py-12 bg-slate-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="font-bold text-xl">
              {data.logo || "Your Brand"}
            </Link>
            <p className="text-slate-400">{data.tagline || "Your company tagline goes here"}</p>
          </div>

          {data.columns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-lg">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url} className="text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-slate-400 text-sm">
          {data.bottomText || `© ${new Date().getFullYear()} Your Company. All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}

