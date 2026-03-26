import ContactCTA from "@/components/sections/contact-cta";
import Footer from "@/components/sections/footer";
import Testimonials from "@/components/sections/testimonials";
import { getTestimonials } from "@/lib/supabase/queries";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const testimonials = await getTestimonials();

  return (
    <main className="flex flex-col w-full p-4 gap-4">
      {/* Page content */}
      {children}

      {/* Testimonials — data from Supabase */}
      <Testimonials testimonials={testimonials} />

      {/* Shared ContactCTA + Footer */}
      <div className="w-full h-px bg-gray-200" />
      <ContactCTA />
      <Footer />
    </main>
  );
}
