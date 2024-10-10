import React, { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Referral } from '@/types/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import clsx from 'clsx'; // Utility for conditional classNames
import { ClipboardCopyIcon } from 'lucide-react';
import Button from '@/components/button';

interface ReferralProgramProps {
    referralData: Referral;
}

const ReferralProgram: React.FC<ReferralProgramProps> = ({ referralData }) => {
    const router = useRouter();
    const [isSharing, setIsSharing] = useState(false);

    const handleCopyReferralLink = async () => {
        try {
            await navigator.clipboard.writeText(referralData.referralLink);
            toast.success('Referral link copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy referral link:', error);
            toast.error('Failed to copy referral link.');
        }
    };

    const handleShareReferral = async () => {
        if (navigator.share) {
            try {
                setIsSharing(true);
                await navigator.share({
                    title: 'Join me on Opaline!',
                    text: 'Use my referral link to join Opaline and enjoy exclusive benefits.',
                    url: referralData.referralLink,
                });
                toast.success('Referral shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
                toast.error('Failed to share referral.');
            } finally {
                setIsSharing(false);
            }
        } else {
            // Fallback for browsers that do not support the Web Share API
            handleCopyReferralLink();
        }
    };

    const handleViewReferrals = () => {
        router.push('/view-referrals');
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="bg-indigo-600 text-white p-6 rounded-md shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-2">Invite Your Friends to Join Opaline!</h2>
                <p className="text-lg">
                    Earn amazing rewards for every successful referral! Start sharing your unique referral link today!
                </p>
            </div>
            <section aria-labelledby="referral-link-heading">
                <h2 id="referral-link-heading" className="text-lg font-medium text-gray-700">
                    Your Referral Link
                </h2>
                <div className="mt-2 flex items-center">
                    <input
                        type="text"
                        readOnly
                        value={referralData.referralLink}
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        aria-label="Referral Link"
                    />
                    <button
                        onClick={handleCopyReferralLink}
                        className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
                        aria-label="Copy Referral Link"
                    >
                        <ClipboardCopyIcon className="h-5 w-5" />
                    </button>
                </div>
            </section>

            {/* Referral Statistics */}
            <section aria-labelledby="referral-stats-heading" className="mt-6">
                <h3 id="referral-stats-heading" className="text-md font-semibold text-gray-600">
                    Referral Statistics
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Referrals</p>
                        <p className="mt-1 text-xl font-semibold text-gray-800">{referralData.totalReferrals}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Rewards Earned</p>
                        <p className="mt-1 text-xl font-semibold text-gray-800">${referralData.rewardsEarned.toFixed(2)}</p>
                    </div>
                </div>
            </section>

            {/* Action Buttons */}
            <section aria-labelledby="referral-actions-heading" className="mt-6">
                <h4 id="referral-actions-heading" className="sr-only">
                    Referral Actions
                </h4>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Button
                        onClick={handleShareReferral}
                        disabled={isSharing}
                        // className={clsx(
                        //   'flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition',
                        //   { 'opacity-50 cursor-not-allowed': isSharing }
                        // )}
                        text={<>
                            <ShareIcon className="h-5 w-5 mr-2" />
                            {isSharing ? 'Sharing...' : 'Share Referral'}
                        </>
                        }
                    />

                    <Button
                        onClick={handleViewReferrals}
                        className="flex items-center justify-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                        text="     View Referrals"
                    />

                </div>
            </section>
        </div>
    );
};

export default ReferralProgram;
