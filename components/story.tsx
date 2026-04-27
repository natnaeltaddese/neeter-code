import Image from "next/image"
import { cn } from "@/lib/utils"

const previousCompanies = [
  { name: "Google", logo: "/company/google-color.svg" },
  { name: "Amazon", logo: "/company/amazon-color.svg" },
  { name: "Capital One", logo: "/company/Capital_One_logo.svg.png" },
]

export function Story() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: Image */}
        <div className="relative mx-auto w-full max-w-[320px] md:mx-0 md:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/people/navi.png"
              alt="Navi - Creator of NeetCode"
              fill
              className="object-cover object-top"
            />
            {/* Gradient fade at bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex flex-col">
          <h2
            className={cn(
              "font-heading font-bold",
              "text-[2rem] leading-[0.95] tracking-[-0.03em]",
              "sm:text-[2.5rem]",
              "lg:text-[3rem] lg:tracking-[-0.04em]"
            )}
          >
            <span
              className={cn(
                "bg-clip-text text-transparent",
                "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
              )}
            >
              Hi, I&apos;m Navi
            </span>
          </h2>

          <div className="mt-6 space-y-4">
            <p className="text-[0.9375rem] leading-[1.65] tracking-[-0.01em] text-muted-foreground sm:text-[1rem]">
              I created NeetCode in 2020 when I was unemployed and couldn&apos;t find
              a job.
            </p>
            <p className="text-[0.9375rem] leading-[1.65] tracking-[-0.01em] text-muted-foreground sm:text-[1rem]">
              While I was struggling myself, it was still rewarding for me to
              make videos.
            </p>
            <p className="text-[0.9375rem] leading-[1.65] tracking-[-0.01em] text-muted-foreground sm:text-[1rem]">
              I received so many messages from others who got jobs after
              studying with my videos. It felt so gratifying and kept me
              motivated.
            </p>
            <p className="text-[0.9375rem] leading-[1.65] tracking-[-0.01em] text-muted-foreground sm:text-[1rem]">
              About a year later I managed to get a job at Google.
            </p>
          </div>

          {/* Previously at */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[0.8125rem] tracking-[-0.01em] text-muted-foreground/60">
              Previously at
            </span>
            <div className="flex items-center gap-4">
              {previousCompanies.map((company) => (
                <Image
                  key={company.name}
                  src={company.logo}
                  alt={company.name}
                  width={80}
                  height={24}
                  className="h-5 w-auto opacity-70 transition-opacity hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
