"use client";

import * as React from "react";
import {
  CloudUpload,
  ExternalLink,
  FileText,
  ImageIcon,
  Link2,
  Upload,
  X,
} from "lucide-react";

import { uploadAssets } from "@/lib/supabase/actions";
import type { PortfolioImage } from "@/lib/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type MediaSectionOption = {
  value: string;
  label: string;
};

type MediaPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  bucket?: string;
  initialSection?: string;
  sectionOptions?: MediaSectionOption[];
  initialAlt?: string;
  onConfirm: (result: {
    urls: string[];
    assets: PortfolioImage[];
    section: string;
  }) => void | Promise<void>;
};

function splitUrls(value: string) {
  return value
    .split(/[\n,]/)
    .map((url) => url.trim())
    .filter(Boolean);
}

function MediaPickerDialog({
  open,
  onOpenChange,
  title = "Select files",
  description = "Drop files here, browse from your computer, or paste one or more URLs.",
  accept = "*/*",
  multiple = false,
  bucket = "portfolio-images",
  initialSection = "general",
  sectionOptions,
  initialAlt = "",
  onConfirm,
}: MediaPickerDialogProps) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [section, setSection] = React.useState(initialSection);
  const [alt, setAlt] = React.useState(initialAlt);
  const [urlsText, setUrlsText] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setFiles([]);
      setUrlsText("");
      setBusy(false);
      setDragActive(false);
      setSection(initialSection);
      setAlt(initialAlt);
    }
  }, [initialAlt, initialSection, open]);

  function normalizeFiles(list: FileList | null) {
    if (!list?.length) {
      return;
    }

    const nextFiles = Array.from(list);
    setFiles(multiple ? nextFiles : [nextFiles[0]]);
  }

  async function handleConfirm() {
    const manualUrls = splitUrls(urlsText);

    if (!files.length && !manualUrls.length) {
      toast({
        title: "Nothing selected",
        description: "Choose at least one file or paste a URL to continue.",
        variant: "destructive",
      });
      return;
    }

    setBusy(true);

    try {
      let assets: PortfolioImage[] = [];
      let uploadedUrls: string[] = [];

      if (files.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        formData.append("section", section);
        formData.append("bucket", bucket);
        formData.append("alt", alt);

        const result = await uploadAssets(formData);
        if (result.error) {
          throw new Error(result.error);
        }

        assets = result.assets ?? [];
        uploadedUrls = assets.map((asset) => asset.url);
      }

      const urls = multiple
        ? [...manualUrls, ...uploadedUrls]
        : [manualUrls[0] ?? uploadedUrls[0]].filter(Boolean);

      await onConfirm({ urls, assets, section });

      toast({
        title: files.length ? "Upload complete" : "URL selected",
        description: files.length
          ? `${files.length} file${files.length > 1 ? "s" : ""} ready to use.`
          : "The URL was added to the field.",
        variant: "success",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while processing the selection.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div
            className={cn(
              "rounded-3xl border-2 border-dashed p-8 text-center transition",
              dragActive
                ? "border-teal-400 bg-teal-500/8"
                : "border-white/10 bg-white/4 hover:border-white/20 hover:bg-white/6"
            )}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragActive(false);
              normalizeFiles(event.dataTransfer.files);
            }}
          >
            <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-300">
                <CloudUpload className="size-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">
                  Drop {multiple ? "files" : "a file"} here or browse manually
                </p>
                <p className="text-sm text-white/45">
                  Accepted types: <span className="text-white/70">{accept}</span>
                </p>
              </div>
              <Button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="h-11 rounded-xl bg-teal-700 px-5 text-white hover:bg-teal-600"
              >
                <Upload />
                Browse Files
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(event) => normalizeFiles(event.target.files)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Paste URL{multiple ? "s" : ""}
              </label>
              <Textarea
                rows={4}
                value={urlsText}
                onChange={(event) => setUrlsText(event.target.value)}
                placeholder={
                  multiple
                    ? "https://... one URL per line"
                    : "https://example.com/file.png"
                }
              />
            </div>

            <div className="space-y-4">
              {sectionOptions?.length ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                    Section
                  </label>
                  <select
                    value={section}
                    onChange={(event) => setSection(event.target.value)}
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
                  >
                    {sectionOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#0f172a]"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Alt / Label
                </label>
                <Input
                  value={alt}
                  onChange={(event) => setAlt(event.target.value)}
                  placeholder="Helpful label or alt text"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Selected Files
                </label>
                <div className="space-y-2 rounded-2xl border border-white/8 bg-white/4 p-3">
                  {files.length ? (
                    files.map((file) => {
                      const isImage = file.type.startsWith("image/");

                      return (
                        <div
                          key={`${file.name}-${file.size}`}
                          className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2"
                        >
                          <div className="flex size-9 items-center justify-center rounded-xl bg-white/5 text-white/60">
                            {isImage ? (
                              <ImageIcon className="size-4" />
                            ) : (
                              <FileText className="size-4" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-white">{file.name}</p>
                            <p className="text-xs text-white/40">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFiles((current) =>
                                current.filter(
                                  (entry) =>
                                    entry.name !== file.name || entry.size !== file.size
                                )
                              )
                            }
                            className="rounded-lg p-1 text-white/35 transition hover:bg-white/5 hover:text-white"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl border border-white/8 border-dashed px-3 py-4 text-sm text-white/35">
                      <Link2 className="size-4" />
                      No local files selected yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {urlsText.trim() ? (
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                URL Preview
              </p>
              <div className="space-y-2">
                {splitUrls(urlsText).slice(0, multiple ? undefined : 1).map((url) => (
                  <div
                    key={url}
                    className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm"
                  >
                    <ExternalLink className="size-4 shrink-0 text-white/40" />
                    <span className="truncate text-white/75">{url}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={busy}
            className="bg-teal-700 text-white hover:bg-teal-600"
            onClick={handleConfirm}
          >
            {busy ? "Processing..." : "Confirm Selection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { MediaPickerDialog };
