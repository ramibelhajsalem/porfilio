import { createClient } from "@/lib/supabase/server";
import MessagesClient from "./messages-client";
import { PageHeader } from "@/components/admin/form-field";
import type { ContactSubmission } from "@/lib/supabase/types";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  const messagesList = (messages ?? []) as ContactSubmission[];
  const unreadCount = messagesList.filter((message) => !message.is_read).length;

  return (
    <div className="p-8">
      <PageHeader
        title="Messages"
        description={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
      />
      <MessagesClient messages={messagesList} />
    </div>
  );
}
