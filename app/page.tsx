import { Hero } from "@/components/hero"
import LogoCloud from "@/components/logo-cloud"
import { Testimonials } from "@/components/testimonials"
import { Roadmap } from "@/components/roadmap"
import { Courses } from "@/components/courses"

export default function Page() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Testimonials />
      <Roadmap />
      <Courses />
    </>
  )
}
