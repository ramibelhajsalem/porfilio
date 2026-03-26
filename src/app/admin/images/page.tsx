import { createClient } from "@/lib/supabase/server";
import ImagesClient from "./images-client";
import { PageHeader } from "@/components/admin/form-field";

export default async function ImagesPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <PageHeader
        title="Images"
        description="Upload and manage all images used across your portfolio."
      />
      <ImagesClient images={images ?? []} />
    </div>
  );
}
