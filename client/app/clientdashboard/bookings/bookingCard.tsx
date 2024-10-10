import React, { useState } from 'react';
import { EyeIcon, TrashIcon } from 'lucide-react';
import { getStatusStyle } from '@/utils/getStatusStyle';
import ReusableAlertDialog from '@/components/alertDialogue';
import { BookingStatus } from '@/utils/statusStyles';
import Button from '@/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';


interface Booking {
    id: string;
    service: string;
    provider: string;
    date: string;
    time: string;
    status: BookingStatus;
}

interface BookingCardProps {
    booking: Booking;
    onViewDetails: (booking: Booking) => void;
    onCancelBooking: (bookingId: string) => void;
    onCancelDelete: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onViewDetails, onCancelBooking, onCancelDelete }) => {
    const { icon: StatusIcon } = getStatusStyle(booking.status);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleRebook = (id: string) => {
        // Logic to pre-fill booking details for a new booking
        // You could redirect to the booking page with the past booking details or open a modal with a form
    };
    const handleRescheduleBooking = (id: string) => {
        // Logic to pre-fill booking details for a new booking
        // You could redirect to the booking page with the past booking details or open a modal with a form
    };
    return (
        <div key={booking.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{booking.service}</h2>
                <span className={`flex items-center px-2 py-1 rounded-full ${getStatusStyle(booking.status).bg}`}>
                    <StatusIcon className="h-5 w-5 mr-1" />
                    <span className="font-medium">{booking.status}</span>
                </span>
            </div>

            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Provider:</span> {booking.provider}
            </p>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Date:</span> {booking.date}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-semibold">Time:</span> {booking.time}
            </p>

            <div className="mt-4 flex space-x-3">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            text={
                                <>
                                    <EyeIcon className="h-6 w-6 mr-2" />
                                    View Details
                                </>
                            }
                            size='small'
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>

                        </DialogHeader>
                        <DialogDescription className="text-gray-700 mt-2">
                            <p className="mb-2"><strong>Provider:</strong> {booking.provider}</p>
                            <p className="mb-2"><strong>Date:</strong> {booking.date}</p>
                            <p className="mb-2"><strong>Time:</strong> {booking.time}</p>
                            <p className="mb-4">
                                <strong>Status:</strong>
                                <span className={`font-semibold text-${getStatusStyle(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </p>
                            {/* <p className="mt-4"><strong>Description:</strong> {booking.description || 'No additional description.'}</p>
                            <p><strong>Location:</strong> {booking.location || 'No location information provided.'}</p> */}
                        </DialogDescription>
                        <div className={`mt-4 ${booking.status === "Completed" ? "flex space-x-3" : ""}`}>
                            <Button
                                text="Reschedule Booking"
                                onClick={() => handleRescheduleBooking(booking.id)}
                                className={booking.status === "Completed" ? "flex-1" : "w-full"}
                            />
                            {booking.status === "Completed" && (
                                <Button
                                    text="Rebook"
                                    onClick={() => handleRebook(booking.id)}
                                    className="flex-1"
                                />
                            )}
                        </div>

                        <DialogFooter>
                            <DialogClose>
                                <Button
                                    text="Cancel"
                                    variant='secondary'
                                />
                            </DialogClose>
                            <Button
                                type="submit"
                                text="jkhjjh"
                            />
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <ReusableAlertDialog
                    triggerText={
                        <>
                            <TrashIcon className="h-6 w-6 mr-2" />
                            Cancel Booking
                        </>
                    }
                    title="Cancel Booking"
                    description="Are you sure you want to cancel this booking? This action cannot be undone."
                    cancelText="No, keep booking"
                    confirmText="Yes, cancel it"
                    onConfirm={() => onCancelBooking(booking.id)}
                    onCancel={onCancelDelete}
                    size="small"
                    variant="warning"
                />
            </div>
        </div >
    );
};

export default BookingCard;
