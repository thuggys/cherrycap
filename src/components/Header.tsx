import React from "react";
import { buttonVariants } from "./ui/button";
import { GithubIcon } from "./Icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeaderClientWrapper } from "./HeaderWrapper";
import ToggleThemeBtn from "./ToggleThemeBtn";
import PortfolioInfoDialog from "./InfoDailog";

function Header() {
  return (
    <HeaderClientWrapper
      className="h-12 sticky top-2 bg-transparent full-line-top full-line-bottom z-40 data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]/80 
    transition-shadow duration-300  flex items-center justify-center data-[affix=true]:bg-background px-2 md:px-0 overflow-x-hidden md:overflow-x-visible"
    >
      <div className=" max-w-full md:max-w-3xl border-x flex items-center justify-between h-full w-full px-2 ">
        <div className="flex gap-4">
          <h1 className="text-sm font-medium transition-all duration-300 text-foreground font-mono">
            Portfolio
          </h1>
       
        </div>
        <div className="flex gap-3 items-center justify-center">
          {/* <Link href={""}>
            <h3 className="text-sm font-medium transition-all duration-300 text-muted-foreground">
              Blogs
            </h3>
          </Link>
          <Link href={""}>
            <h3 className="text-sm font-medium transition-all duration-300 text-muted-foreground">
              Experiments
            </h3>
          </Link>
          <Link href={""}>
            <h3 className="text-sm font-medium transition-all duration-300 text-muted-foreground">
              Another
            </h3>
          </Link> */}
         <PortfolioInfoDialog/>
          <Link
            href={"https://github.com/taqui-786"}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full"
            )}
          >
            <GithubIcon />
          </Link>
          <ToggleThemeBtn />
        </div>
      </div>
    </HeaderClientWrapper>
  );
}

export default Header;
