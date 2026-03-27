"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteImage } from "@/lib/supabase/actions";
import type { PortfolioImage } from "@/lib/supabase/types";
import Image from "next/image";
import {
  Trash2,
  Copy,
  Check,
  ImageIcon,
  Plus,
} from "lucide-react";
import { Card } from "@/components/admin/form-field";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MediaPickerDialog } from "@/components/admin/media-picker-dialog";
import { useToast } from "@/hooks/use-toast";
import { MEDIA_SECTION_OPTIONS } from "@/lib/media";

export default function ImagesClient({ images: initial }: { images: PortfolioImage[] }) {
  const [images, setImages] = useState(initial);
  const [, startTransition] = useTransition();
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [pickerOpen, setPickerOpen] = useState(false);
  const { toast } = useToast();

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "URL copied",
      description: "The asset URL is ready to paste anywhere in the admin.",
      variant: "success",
    });
  }

  function handleDelete(id: string, storagePath: string | null) {
    startTransition(async () => {
      const previous = images;
      setImages((prev) => prev.filter((img) => img.id !== id));
      const result = await deleteImage(id, storagePath);

      if (result?.error) {
        setImages(previous);
        toast({
          title: "Delete failed",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Asset deleted",
        description: "The file was removed from storage and the media library.",
        variant: "success",
      });
    });
  }

  const filtered = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.section === filter)),
    [filter, images]
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Asset Library</h2>
            <p className="mt-1 text-sm text-white/40">
              Upload one file or many, drag them in, or paste URLs and keep everything in Supabase.
            </p>
          </div>
          <Button
            type="button"
            className="bg-teal-700 text-white hover:bg-teal-600"
            onClick={() => setPickerOpen(true)}
          >
            <Plus />
            Upload Assets
          </Button>
        </div>
      </Card>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs rounded-xl transition ${
            filter === "all"
              ? "bg-teal-700 text-white"
              : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
          }`}
        >
          All ({images.length})
        </button>
        {MEDIA_SECTION_OPTIONS.map((s) => {
          const count = images.filter((img) => img.section === s.value).length;
          if (!count) return null;
          return (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`px-3 py-1.5 text-xs rounded-xl transition ${
                filter === s.value
                  ? "bg-teal-700 text-white"
                  : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              {s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative bg-white/5 border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition"
            >
              {/* Image */}
              <div className="relative aspect-square bg-white/5">
                <Image
                  src={img.url}
                  alt={img.alt ?? img.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-white text-xs font-medium truncate mb-0.5">
                  {img.name}
                </p>
                <p className="text-white/30 text-[10px] truncate">{img.alt}</p>
                {img.section && (
                  <span className="mt-1.5 inline-block px-2 py-0.5 text-[10px] bg-teal-500/10 text-teal-400/80 rounded-full">
                    {img.section}
                  </span>
                )}
              </div>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(img.url)}
                  title="Copy URL"
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition"
                >
                  {copied === img.url ? (
                    <Check className="w-4 h-4 text-teal-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      title="Delete"
                      className="p-2.5 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogOverlay />
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete asset?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This removes the file from storage and the media library. You cannot undo this.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-500"
                        onClick={() => handleDelete(img.id, img.storage_path)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        title="Upload assets"
        description="Drop one file or many, or paste remote URLs. Confirming will upload to Supabase and add the files to this library."
        accept="image/*,.pdf,.doc,.docx,.txt,.md,.json,.csv,.zip"
        multiple
        sectionOptions={[...MEDIA_SECTION_OPTIONS]}
        onConfirm={({ assets }) => {
          if (assets.length) {
            setImages((prev) => [...assets, ...prev]);
          }
        }}
      />
    </div>
  );
}
