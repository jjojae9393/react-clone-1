import {Outlet, Route, Routes, useLocation} from "react-router";
import RootLayout from "../layouts/root/RootLayout";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import MainPage from "../pages/main/MainPage";
import WorkbookPage from "../pages/workbook/WorkbookPage";

export default function RootRouter() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route element={<RootLayout/>}>
                <Route index element={<MainPage/>}/>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"workbook"} element={<Outlet/>}>
                    <Route index element={<WorkbookPage/>}/>
                    <Route path={"new"} element={<MainPage/>}/>
                </Route>
            </Route>
            <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
    );
}
