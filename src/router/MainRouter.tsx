import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {SuspanseFallBackProps} from '../models';
import { Layout } from '../pages'

const ListPage = lazy(() => import("../pages/list/ListSample"));
const FormPage = lazy(() => import("../pages/form/FormSample"));
const AxiosPage = lazy(() => import("../pages/fetch/FetchSample"));

const SuspanseFallBack: React.FC<SuspanseFallBackProps> = ({children}) => {
    return (
    <Suspense fallback={<>...</>}>
        {children}
    </Suspense>
);
}

const MainRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<SuspanseFallBack children={<ListPage/>}/>} />
                <Route path="/list" element={<SuspanseFallBack children={<ListPage/>}/>} />
                <Route path="/form" element={<SuspanseFallBack children={<FormPage/>}/>} />
                <Route path="/fetch" element={<SuspanseFallBack children={<AxiosPage/>}/>} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>}></Route>
        </Routes>
    )
}

export default MainRouter