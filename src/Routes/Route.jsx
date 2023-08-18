import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import StepTwoForm from "../pages/StepTwoForm/StepTwoForm";

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
            }
        ]
    },
]);

export default router;