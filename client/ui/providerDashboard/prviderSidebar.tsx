"use client";
import { Avatar } from '@/components/avatar';
import {
    HomeIcon, UserIcon,
    BellIcon, CalendarDateRangeIcon, CogIcon, ArrowRightStartOnRectangleIcon,
    BriefcaseIcon, CurrencyDollarIcon, ClockIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/spinner';
import { useAuth } from '@/providers/AuthProvider';

interface NavItem {
    name: string;
    icon: React.ElementType;
    path: string;
}

const navItems: NavItem[] = [
    { name: 'Overview', icon: HomeIcon, path: '/providerdashboard' },
    { name: 'Bookings', icon: ClockIcon, path: '/providerdashboard/bookings' },
    { name: 'Earnings', icon: CurrencyDollarIcon, path: '/providerdashboard/earnings' },
    { name: 'Services', icon: BriefcaseIcon, path: '/providerdashboard/services' },
    { name: 'Notifications', icon: BellIcon, path: '/providerdashboard/notifications' },
    { name: 'Calendar', icon: CalendarDateRangeIcon, path: '/providerdashboard/calendar' },
    { name: 'Profile Settings', icon: UserIcon, path: '/providerdashboard/profile-settings' },
    { name: 'Account Settings', icon: CogIcon, path: '/providerdashboard/account-settings' },
];

const ProviderSideBar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, error, signout } = useAuth();

    const handleLogout = async () => {
        try {
            await signout();
            toast.success("Successfully logged out");
            router.push('/');
        } catch (error) {
            console.error('Logout Error:', error);
            toast.error('An error occurred during logout.');
        }
    };

    if (error) {
    toast.error(error.message);
    }

    return (
        <div className="w-auto bg-white shadow-md h-full">
            <div className="p-6 flex items-center space-x-4">
                {loading ? (
                    <Spinner />
                ) : !user ? (
                    <p className="text-center">No user data available.</p>
                ) : (
                    <>
                        <Avatar
                            // src='/assets/Abigail.jpg' 
                            alt='Provider Profile Photo'
                            size='medium' 
                            name={user.name}
                            placeholder='AB'
                        />
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </>
                )}
            </div>
            <nav className="mt-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`block py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-300 hover:text-black'}`}
                        >
                            <item.icon className="w-5 h-5 inline-block mr-2" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-8">
                <button
                    onClick={handleLogout}
                    className="flex items-center py-2.5 px-4 w-full text-left rounded transition duration-200"
                >
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 inline-block mr-2 text-red-500" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProviderSideBar;
