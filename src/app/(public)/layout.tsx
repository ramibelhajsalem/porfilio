import ContactCTA from "@/components/sections/contact-cta";
import Footer from "@/components/sections/footer";
import Testimonials from "@/components/sections/testimonials";
import { portfolio } from "@/content/portfolio";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homePage = portfolio.pages.home;
  const testimonials = portfolio.testimonials
    .filter((testimonial) => testimonial.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <main className="flex flex-col w-full p-4 gap-4">
      {children}
      <Testimonials
        heading={homePage.testimonials.heading}
        testimonials={testimonials}
      />
      <div className="w-full h-px bg-gray-200" />
      <ContactCTA content={homePage.contactCta} />
      <Footer
        email={portfolio.profile.contact.email}
        copyrightName={portfolio.profile.identity.displayName}
        footer={portfolio.site.footer}
        quickLinks={portfolio.site.navigation.footer.filter((item) => item.isActive)}
        socialLinks={portfolio.profile.socials.filter((item) => item.isActive)}
      />
    </main>
  );
}
