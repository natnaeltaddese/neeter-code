import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Testimonial,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
} from "@/components/testimonial/testimonial"

const testimonials = [
  {
    name: "Amog Chandrashekar",
    company: "Google",
    logo: "/company/google-color.svg",
    avatar: "/people/amog.jpeg",
    quote:
      "I signed my offer with Google as a software engineer (L4) and you have a fair share of contribution in it.",
  },
  {
    name: "Rodrigo Ramirez",
    company: "Microsoft",
    logo: "/company/microsoft-color.svg",
    avatar: "/people/rodrigo.jpeg",
    quote:
      "I recently got an offer for Microsoft, and I will be starting next year! Thank you so much for your videos!",
  },
  {
    name: "Aiswarya Sukumar",
    company: "Amazon",
    logo: "/company/amazon-color.svg",
    avatar: "/people/aiswarya.jpeg",
    quote:
      "Got an offer from Amazon today. Thanks a lot for your videos. It really helped me during the preparation.",
  },
  {
    name: "Janvi Kalra",
    company: "OpenAI",
    logo: "/company/openai.svg",
    avatar: "/people/janvi.jpeg",
    quote: "Thank you, your videos helped.",
    logoInvert: true,
  },
  {
    name: "Thariq Shihipar",
    company: "Anthropic",
    logo: "/company/claude-color.svg",
    avatar: "/people/thariq.jpg",
    quote: "I won't train the models on your videos.",
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      {/* Section header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
          Success Stories
        </span>
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
            Real results
          </span>
          <span className="text-primary">.</span>
        </h2>
      </div>

      {/* Testimonial grid - masonry-like montage */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* First column */}
        <div className="flex flex-col gap-4">
          <TestimonialCard
            testimonial={testimonials[0]}
            className="animate-[fade-up_0.5s_ease_both]"
          />
          <TestimonialCard
            testimonial={testimonials[3]}
            className="animate-[fade-up_0.5s_ease_both] [animation-delay:150ms]"
          />
        </div>

        {/* Second column - offset for masonry effect */}
        <div className="flex flex-col gap-4 sm:pt-8">
          <TestimonialCard
            testimonial={testimonials[1]}
            className="animate-[fade-up_0.5s_ease_both] [animation-delay:100ms]"
          />
          <TestimonialCard
            testimonial={testimonials[4]}
            className="animate-[fade-up_0.5s_ease_both] [animation-delay:250ms]"
          />
        </div>

        {/* Third column */}
        <div className="flex flex-col gap-4 lg:pt-4">
          <TestimonialCard
            testimonial={testimonials[2]}
            className="animate-[fade-up_0.5s_ease_both] [animation-delay:200ms]"
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: (typeof testimonials)[number]
  className?: string
}) {
  return (
    <Testimonial
      className={cn(
        "h-auto rounded-xl border border-border/40 bg-[#f5f5f6]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "transition-[border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {/* Company logo */}
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
        <Image
          src={testimonial.logo}
          alt={testimonial.company}
          width={80}
          height={20}
          className={cn(
            "h-5 w-auto opacity-60",
            testimonial.logoInvert && "dark:invert"
          )}
        />
      </div>

      <TestimonialQuote className="text-[0.9375rem] leading-[1.6] tracking-[-0.01em]">
        &ldquo;{testimonial.quote}&rdquo;
      </TestimonialQuote>

      <TestimonialAuthor className="border-t border-border/30">
        <TestimonialAvatar>
          <TestimonialAvatarImg
            src={testimonial.avatar}
            alt={testimonial.name}
          />
          <TestimonialAvatarRing />
        </TestimonialAvatar>
        <TestimonialAuthorName>{testimonial.name}</TestimonialAuthorName>
        <TestimonialAuthorTagline>
          Software Engineer at {testimonial.company}
        </TestimonialAuthorTagline>
      </TestimonialAuthor>
    </Testimonial>
  )
}
