import { useLocation } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const allInputData = location.state;

    console.log(allInputData);

    return (
        <div>
            result
        </div>
    );
};

export default Result;