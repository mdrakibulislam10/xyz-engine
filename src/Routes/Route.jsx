import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import StepTwoForm from "../pages/StepTwoForm/StepTwoForm";
import Result from "../pages/Result/Result";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/step-two-form",
                element: <StepTwoForm />
            },
            {
                path: "/result",
                element: <Result />
            }
        ]
    },
]);

export default router;