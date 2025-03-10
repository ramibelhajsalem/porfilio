import ContactCTA from "@/components/sections/contact-cta";
import Footer from "@/components/sections/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full p-4 gap-4">
      {/* Page content */}
      {children}

      {/* Shared ContactCTA + Footer */}
      <div className="w-full h-px bg-gray-200" />
      <ContactCTA />
      <Footer />
    </main>
  );
}
