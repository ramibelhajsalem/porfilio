import ContactCTA from "@/components/sections/contact-cta";
import Footer from "@/components/sections/footer";
import Testimonials from "@/components/sections/testimonials";
import { portfolio } from "@/content/portfolio";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const testimonials = portfolio.testimonials
    .filter((testimonial) => testimonial.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <main className="flex flex-col w-full p-4 gap-4">
      {children}
      <Testimonials
        heading={portfolio.homePage.testimonials.heading}
        testimonials={testimonials}
      />
      <div className="w-full h-px bg-gray-200" />
      <ContactCTA content={portfolio.homePage.contactCta} />
      <Footer
        site={portfolio.site}
        footer={portfolio.footer}
        quickLinks={portfolio.navigation.footer.filter((item) => item.isActive)}
        socialLinks={portfolio.socialLinks.filter((item) => item.isActive)}
      />
    </main>
  );
}
