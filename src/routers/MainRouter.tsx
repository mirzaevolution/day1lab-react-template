import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {SuspanseFallBackProps} from '../models';
import { Callback, Layout } from '../pages'
import { useAppDispatch } from '../redux/hook';
import { setCurrentUser } from '../redux/slices/MainSlice';
import { userManagerConfig } from '../utils';

const ListPage = lazy(() => import("../pages/list/ListSample"));
const FormPage = lazy(() => import("../pages/form/FormSample"));
const AxiosPage = lazy(() => import("../pages/fetch/FetchSample"));
const Welcome = lazy(() => import("../pages/welcome/Welcome"));
const FetchProtectedPage = lazy(() => import("../pages/fetchProtected/FetchProtected"));
const PublicPage = lazy(() => import("../pages/publicPage/PublicPage"));
const PingPage = lazy(() => import("../pages/ping/Ping"));

const SuspanseFallBack: React.FC<SuspanseFallBackProps> = ({children}) => {
    return (
    <Suspense fallback={<>...</>}>
        {children}
    </Suspense>
);
}

export const MainRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<SuspanseFallBack children={<RequireAuth><ListPage/></RequireAuth>}/>} />
                <Route path="/list" element={<SuspanseFallBack children={<RequireAuth><ListPage/></RequireAuth>}/>} />
                <Route path="/form" element={<SuspanseFallBack children={<RequireAuth><FormPage/></RequireAuth>}/>} />
                <Route path="/fetch" element={<SuspanseFallBack children={<RequireAuth><AxiosPage/></RequireAuth>}/>} />
                <Route path="/fetch-protected" element={<SuspanseFallBack children={<RequireAuth><FetchProtectedPage/></RequireAuth>}/>} />
                <Route path="/ping" element={<SuspanseFallBack children={<PingPage/>}/>} />
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
    const dispatch = useAppDispatch()

    const storageAuthKey = `oidc.user:${userManagerConfig.authority}:${userManagerConfig.client_id}`
    const item = sessionStorage.getItem(storageAuthKey) ?? "";
    if (!item) {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }else{
        const parseToken = JSON.parse(item)
        const token = parseToken.access_token
        dispatch(setCurrentUser(token))
    }

    return children;
}
