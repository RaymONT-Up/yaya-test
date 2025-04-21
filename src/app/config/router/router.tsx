import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { createBrowserRouter, Outlet } from "react-router-dom";

// type AuthGuardProps = {
//   mustBe: 'authorized' | 'unauthorized'
//   children: ReactElement
// }

// const AuthGuard: FC<AuthGuardProps> = ({ mustBe, children }) => {
//   const token = useAppSelector((state) => state.user.token)
//   const isAuthorized = Boolean(token)

//   if (mustBe === 'authorized') return isAuthorized ? children : <Navigate to="/login" />

//   return isAuthorized ? <Navigate to="/" /> : children
// }

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/login",
    // добавить AuthWrapper для страниц подобных логину / регистрации
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ]
  }
]);
