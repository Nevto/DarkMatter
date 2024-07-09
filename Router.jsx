import { createBrowserRouter } from "react-router-dom"

export const darkMatterRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout />
        ),
        children: [
            {
                index: true,
                element:
                    <DarkMatter />
            },
            {
                path: "/transaction",
                element:
                    <Transaction />
            },
            {
                path: "/register",
                element:
                    <Register />
            },
            {
                path: "/blocks",
                element:
                    <GetDarkMatter />
            }
        ]
    }
])