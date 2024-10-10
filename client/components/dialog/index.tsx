import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '../button';

interface ReusableModalProps {
  trigger: ReactNode; // Can be a button or any other trigger component
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm?: (data?: any) => void; // Optional, used for submitting data from forms
  cancelText?: string;
  children: ReactNode;
  onCancel?: () => void; // Optional cancel handler
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
  cancelText = "Cancel",
  children,
  onCancel,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {typeof trigger === 'string' ? (
          <Button text={trigger} variant="primary" />
        ) : (
          trigger
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-md">
          <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-gray-600 mt-2 mb-4">
              {description}
            </Dialog.Description>
          )}
          <div>{children}</div>
          <div className="flex justify-end gap-3 mt-4">
            <Dialog.Close asChild>
              <Button
                onClick={onCancel}
                text={cancelText}
                variant='secondary'
              />
            </Dialog.Close>
            {onConfirm && (
              <Dialog.Close asChild>
                <Button
                  onClick={onConfirm}
                  text={confirmText}
                />
              </Dialog.Close>
            )}
          </div>
          <Dialog.Close asChild>
            <Button
              className="absolute top-2 right-2"
              aria-label="Close"
              text={<Cross2Icon />}
              variant="info"
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ReusableModal;