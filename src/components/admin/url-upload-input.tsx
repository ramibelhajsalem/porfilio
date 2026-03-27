"use client";

import * as React from "react";
import { Link2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaPickerDialog, type MediaSectionOption } from "@/components/admin/media-picker-dialog";

type UrlUploadInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accept?: string;
  bucket?: string;
  initialSection?: string;
  sectionOptions?: MediaSectionOption[];
  dialogTitle?: string;
  dialogDescription?: string;
  alt?: string;
};

function UrlUploadInput({
  value,
  onChange,
  placeholder,
  accept = "image/*",
  bucket,
  initialSection,
  sectionOptions,
  dialogTitle = "Select a file",
  dialogDescription,
  alt,
}: UrlUploadInputProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/25" />
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          onClick={() => setOpen(true)}
        >
          <Upload />
          Upload
        </Button>
      </div>

      <MediaPickerDialog
        open={open}
        onOpenChange={setOpen}
        title={dialogTitle}
        description={dialogDescription}
        accept={accept}
        bucket={bucket}
        initialSection={initialSection}
        sectionOptions={sectionOptions}
        initialAlt={alt}
        onConfirm={({ urls }) => {
          onChange(urls[0] ?? "");
        }}
      />
    </>
  );
}

export { UrlUploadInput };
