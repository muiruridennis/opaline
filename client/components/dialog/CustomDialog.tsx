import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Cross2Icon } from '@radix-ui/react-icons';

interface CustomDialogProps {
    trigger: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    children: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
    trigger,
    open,
    onOpenChange,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    children,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg">
                <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
                {description && <Dialog.Description className="mt-2 text-sm">{description}</Dialog.Description>}
                <div className="mt-4">{children}</div>
                <div className="mt-4 flex justify-end">
                    <Dialog.Close asChild>
                        <button onClick={() => onOpenChange(false)} className="mr-2 text-gray-500">{cancelText}</button>
                    </Dialog.Close>
                    <button
                        onClick={() => {
                            if (onConfirm) {
                                onConfirm();
                                onOpenChange(false);
                            }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {confirmText}
                    </button>
                    <Dialog.Close asChild>
                        <button className="absolute top-2 right-2" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog>
    );
};

export default CustomDialog;
