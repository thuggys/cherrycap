import { cn } from '@/lib/utils'
import React from 'react'

function FooterSection() {
  return (
    <section className='relative h-fit border-x full-line-bottom p-4'>
         <div
                className={cn(
                  "absolute top-0 left-0 flex h-full w-8 border-r border-edge",
                  "before:absolute before:inset-0 before:-z-1",
                  "before:bg-[repeating-linear-gradient(45deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
                  "before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
                )}
              />
              <div
                className={cn(
                  "absolute top-0 right-0 flex h-full w-8 border-l border-edge",
                  "before:absolute before:inset-0 before:-z-1",
                  "before:bg-[repeating-linear-gradient(45deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
                  "before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
                )}
              />
        <p className="mb-1 text-center font-mono text-sm text-balance text-muted-foreground">Inspired by tailwindcss.com &amp;&amp; @iamncdai</p>
        <p className=" text-center font-mono text-sm text-balance text-muted-foreground">Built by <a className="font-semibold underline" href="https://mdtaquiimam.vercel.app/" target="_blank" rel="noopener">Md Taqui Imam</a>. The source code is available on {" "}<a className="font-semibold underline" href="https://github.com/taqui-786/Taqui" target="_blank" rel="noopener">GitHub</a>.</p>
    </section>
  )
}

export default FooterSection