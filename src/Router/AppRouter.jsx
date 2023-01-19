import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from '../Auth/routes/AuthRoutes';
import { JournalRoutes } from '../Journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useCheckout } from '../hooks/useCheckout';

export const AppRouter = () => {

    const { status } = useCheckout()

    if (status === "checking") {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                status === "authenticated"
                    ? <Route path='/*' element={<JournalRoutes />} />
                    : <Route path='/auth/*' element={<AuthRoutes />} />
            }
            <Route path='/*' element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
