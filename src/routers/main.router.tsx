import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SuspanseFallBackProps } from '../models';
import { Callback, Layout } from '../pages'
import { useAppDispatch } from '../reduxs/hook';
import { setCurrentUser } from '../reduxs/slices/main.slice';
import { EtcHelpersInit } from '../utils';

const ListPage = lazy(() => import("../pages/list/list-sample.page"));
const FormPage = lazy(() => import("../pages/form/form-sample.page"));
const Welcome = lazy(() => import("../pages/welcome/welcome.page"));
const PublicPage = lazy(() => import("../pages/public-page/public.page"));
const PingPage = lazy(() => import("../pages/ping/ping.page"));

const SuspanseFallBack: React.FC<SuspanseFallBackProps> = ({ children }) => {
    return (
        <Suspense fallback={<>...</>}>
            {children}
        </Suspense>
    );
}

export const MainRouter: React.FC = () => {
    const dispatch = useAppDispatch()
    const item = EtcHelpersInit.getUserSessionStorage();
    if (item) {
        const parseToken = JSON.parse(item)
        const token = parseToken.access_token
        dispatch(setCurrentUser(token))
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<SuspanseFallBack children={<RequireAuth><ListPage /></RequireAuth>} />} />
                <Route path="/list" element={<SuspanseFallBack children={<RequireAuth><ListPage /></RequireAuth>} />} />
                <Route path="/form" element={<SuspanseFallBack children={<RequireAuth><FormPage /></RequireAuth>} />} />
                <Route path="/ping" element={<SuspanseFallBack children={<RequireAuth><PingPage /></RequireAuth>} />} />
            </Route>
            <Route path="/signin-oidc" element={<Callback isCallbackLogout={false} />} />
            <Route path="/signout-oidc" element={<Callback isCallbackLogout={true} />} />
            <Route path="/welcome" element={<SuspanseFallBack children={<Welcome />} />} />
            <Route path="/public-page" element={<SuspanseFallBack children={<PublicPage />} />} />
        </Routes>
    )
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    const item = EtcHelpersInit.getUserSessionStorage();
    if (!item) {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }
    return children
}
