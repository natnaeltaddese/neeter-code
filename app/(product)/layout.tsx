import { ProductNavbar } from "@/components/product-navbar"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ProductNavbar />
      {children}
    </div>
  )
}
