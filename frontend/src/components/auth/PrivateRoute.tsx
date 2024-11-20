import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const PrivateRoute: React.FC = () => {
    // Use a custom auth hook to check authentication status
    const { isAuthenticated, isLoading } = useAuth();
    // console.log('isAuthenticated - ', isAuthenticated)

    // If still loading, show a loading spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    // If not authenticated, redirect to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute