"use client"

import { Info, ExternalLink, Github, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function PortfolioInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer" >
          <Info className="h-4 w-4" />
          <span className="sr-only">Portfolio Info</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Extra Information
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 font-mono">
          {/* Visitor Stats */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 " />
              <span className="text-sm font-medium">Total Visitors</span>
            </div>
            <span className="text-lg font-bold">12,847</span>
          </div>

          <Separator />

          {/* Links Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Quick Links</h4>

            {/* Source Code Link */}
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="https://github.com/taqui-786/Taqui" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Source Code
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>
            </Button>

            {/* Another Portfolio Link */}
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="https://mdtaquiimam.vercel.app/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Check Out My Other Portfolio
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>
            </Button>
          </div>

          {/* Tech Stack Info */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground text-center">Built with Next.js • Tailwind CSS • TypeScript</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
