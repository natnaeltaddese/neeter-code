import Image from "next/image"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

const logos = [
  { src: "/company/google-color.svg", alt: "Google", width: 80, height: 24 },
  { src: "/company/meta-color.svg", alt: "Meta", width: 80, height: 24 },
  { src: "/company/amazon-color.svg", alt: "Amazon", width: 80, height: 24 },
  { src: "/company/microsoft-color.svg", alt: "Microsoft", width: 90, height: 24 },
  { src: "/company/netflix-color.svg", alt: "Netflix", width: 80, height: 24 },
  { src: "/company/openai.svg", alt: "OpenAI", width: 80, height: 24 },
  { src: "/company/claude-color.svg", alt: "Claude", width: 80, height: 24 },
]

export default function LogoCloud() {
  return (
    <section className="overflow-hidden border-y border-border/30 py-10">
      <div className="group relative mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:border-border/40 md:pr-6">
            <p className="text-end font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground/50">
              Trusted by engineers at
            </p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {logos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`h-6 w-auto transition-opacity duration-300 hover:opacity-100 ${logo.alt === "OpenAI" ? "opacity-70 dark:invert" : "opacity-80"}`}
                />
              ))}
            </InfiniteSlider>

            <div
              aria-hidden
              className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
            />
            <div
              aria-hidden
              className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
            />
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
