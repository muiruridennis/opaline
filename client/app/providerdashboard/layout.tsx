import React from 'react'
import SideBar from "../../ui/providerDashboard/prviderSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100 p-8">
            <SideBar />
            <div className="flex-1 p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

