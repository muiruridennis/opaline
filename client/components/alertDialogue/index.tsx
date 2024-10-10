import React, { ReactNode } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Button from '../button';

interface ReusableAlertDialogProps {
    triggerText?: ReactNode;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'disabled' | 'info' | 'warning' | 'text';
    size?: 'small' | 'medium' | 'large';
}

const ReusableAlertDialog: React.FC<ReusableAlertDialogProps> = ({
    triggerText = "Open Dialog",
    title = "Are you absolutely sure?",
    description = "This action cannot be undone.",
    cancelText = "Cancel",
    confirmText = "Yes, confirm",
    onConfirm,
    onCancel,
    variant = "info",
    size="medium"
}) => (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <Button
                size={size}
                variant={variant}
                type="button"
                text={triggerText}
            />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    {title}
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                    {description}
                </AlertDialog.Description>
                <div className="flex justify-end gap-[25px]">
                    <AlertDialog.Cancel asChild>
                        <Button
                            variant='secondary'
                            type='button'
                            onClick={onCancel}
                            text={cancelText}
                        />
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <Button
                            onClick={onConfirm}
                            type='button'
                            variant='warning'
                            className=" hover:bg-red5 focus:shadow-red7 outline-none focus:shadow-[0_0_0_2px]"
                            text={confirmText}
                        />
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default ReusableAlertDialog;
