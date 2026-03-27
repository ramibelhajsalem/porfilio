"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used inside <Dialog />");
  }

  return context;
}

type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open: currentOpen, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

type DialogTriggerProps = {
  asChild?: boolean;
  children: React.ReactElement<any>;
};

function DialogTrigger({ asChild = false, children }: DialogTriggerProps) {
  const { setOpen } = useDialogContext();

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent) => {
        children.props.onClick?.(event);
        setOpen(true);
      },
    });
  }

  return React.cloneElement(children, {
    onClick: (event: React.MouseEvent) => {
      children.props.onClick?.(event);
      setOpen(true);
    },
  });
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen } = useDialogContext();

  if (!open) {
    return null;
  }

  return (
    <DialogPortal>
      <div
        data-slot="dialog-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm",
          className
        )}
        onClick={() => setOpen(false)}
        {...props}
      />
    </DialogPortal>
  );
}

type DialogContentProps = React.ComponentProps<"div"> & {
  hideClose?: boolean;
};

function DialogContent({
  className,
  children,
  hideClose = false,
  ...props
}: DialogContentProps) {
  const { open, setOpen } = useDialogContext();

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  return (
    <DialogPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          data-slot="dialog-content"
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0f172a] p-6 text-white shadow-2xl",
            className
          )}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          {!hideClose && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 rounded-xl p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
          {children}
        </div>
      </div>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("mb-6 space-y-2 pr-10", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-lg font-semibold text-white", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-sm text-white/50", className)}
      {...props}
    />
  );
}

function DialogClose({
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<any>;
}) {
  const { setOpen } = useDialogContext();

  return React.cloneElement(children, {
    onClick: (event: React.MouseEvent) => {
      children.props.onClick?.(event);
      setOpen(false);
    },
  });
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
