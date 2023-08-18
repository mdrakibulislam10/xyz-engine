import { useLocation } from "react-router-dom";

const StepTwoForm = () => {
    const location = useLocation();
    const stepOneFormData = location.state;
    console.log(stepOneFormData);

    return (
        <div>
            j
        </div>
    );
};

export default StepTwoForm;