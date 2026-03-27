"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AlertDialog = Dialog;
const AlertDialogTrigger = DialogTrigger;
const AlertDialogOverlay = DialogOverlay;

function AlertDialogContent(props: React.ComponentProps<typeof DialogContent>) {
  return <DialogContent hideClose {...props} />;
}

const AlertDialogHeader = DialogHeader;
const AlertDialogFooter = DialogFooter;
const AlertDialogTitle = DialogTitle;
const AlertDialogDescription = DialogDescription;

function AlertDialogCancel({
  children = "Cancel",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose asChild>
      <Button variant="outline" {...props}>
        {children}
      </Button>
    </DialogClose>
  );
}

function AlertDialogAction(props: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose asChild>
      <Button {...props} />
    </DialogClose>
  );
}

export {
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
};
