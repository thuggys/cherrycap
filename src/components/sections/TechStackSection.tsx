import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Auth0Icon, BootstrapIcon, ClaudeIconIcon, CssIcon, DockerIcon, DrizzleIcon, FigmaIcon, FileTypeReactjsIcon, GithubActionsIcon, GithubTwoIcon, GitIcon, JavascriptIcon, MaterialuiIcon, MongodbIcon, MysqlDarkIcon, NestjsIcon, NextjsIcon, NodejsIconIcon, OpenaiIcon, PhpIcon, PostgresqlIcon, PrismaIcon, ReactnavigationIcon, ReactQueryIconIcon, ReactRouterIcon, RedisIcon, ReduxIcon, ShadcnuiIcon, TailwindcssIcon, TypescriptIcon } from "../Icons";
function TechStackSection() {
  const techStack = [
    { name: "JavaScript", icon: JavascriptIcon },
    { name: "TypeScript", icon: TypescriptIcon },
    { name: "Reactjs", icon: FileTypeReactjsIcon },
    { name: "Nextjs", icon: NextjsIcon },
    { name: "Nodejs", icon: NodejsIconIcon },
    { name: "NestJs", icon: NestjsIcon },

    { name: "TailwindCSS", icon: TailwindcssIcon },
    { name: "CSS", icon: CssIcon },
    { name: "Shadcn Ui", icon: ShadcnuiIcon },
    { name: "Material Ui", icon: MaterialuiIcon },
    { name: "Bootstrap", icon: BootstrapIcon },
    { name: "PHP", icon: PhpIcon },
    { name: "OAuth", icon: Auth0Icon },
    { name: "React-Query", icon: ReactQueryIconIcon },
    { name: "React-Redux", icon: ReduxIcon },
    { name: "React-Router", icon: ReactRouterIcon },
    { name: "React-Navigation", icon: ReactnavigationIcon },
    { name: "Git", icon: GitIcon },
    { name: "Github", icon: GithubTwoIcon },
    { name: "Github-Actions", icon: GithubActionsIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "My Sql", icon: MysqlDarkIcon },
    { name: "MongoDB", icon: MongodbIcon },
    { name: "Redis", icon: RedisIcon },
    { name: "Postgres", icon: PostgresqlIcon },
    { name: "Prisma ORM", icon: PrismaIcon },
    { name: "Drizzle ORM", icon: DrizzleIcon },
    { name: "Figma", icon: FigmaIcon },
    { name: "Chat GPT", icon: OpenaiIcon },
    { name: "Claude Ai", icon: ClaudeIconIcon },
  ];
  return (
    <section className=" z-10 border-x full-line-bottom relative">
      <h2 className="pl-4 text-3xl font-semibold relative full-line-bottom ">
        Tech Stack
      </h2>
      <div className="relative">
          <div className=" absolute size-full [--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center bg-zinc-950/0.75 dark:bg-white/0.75 z-10"/>
        <div className="flex flex-wrap gap-4 p-4 ">
          {techStack.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div key={index} className="w-fit z-50">
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <IconComponent />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.name}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TechStackSection;

