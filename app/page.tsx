import { Hero } from "@/components/hero"
import LogoCloud from "@/components/logo-cloud"
import { Testimonials } from "@/components/testimonials"
import { Roadmap } from "@/components/roadmap"
import { Courses } from "@/components/courses"
import { CTA } from "@/components/cta"
import { Story } from "@/components/story"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Testimonials />
      <Roadmap />
      <Courses />
      <CTA />
      <Story />
      <Footer />
    </>
  )
}
