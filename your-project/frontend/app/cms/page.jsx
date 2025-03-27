import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CMSPage() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-800 p-4">
        <div className="mb-8 mt-4">
          <Link href="/" className="flex items-center gap-2 px-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-medium">Home</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Pages</h1>
          <Link href="/cms/create">
            <Button className="bg-white text-slate-900 hover:bg-gray-200">Create</Button>
          </Link>
        </div>

        {/* Page list */}
        <div className="grid gap-4">
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">testing</CardTitle>
              <CardDescription className="text-slate-400">teter</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 text-slate-400">tterst.tsafi.xyz</CardContent>
            <CardFooter className="justify-end text-slate-400">3/26/2025</CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

