import { useLocation } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const allInputData = location.state;

    return (
        <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="table table-sm md:table-md lg:table-lg">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Client</th>
                            <th>Contractor</th>
                            <th>Max_X</th>
                            <th>Min_X</th>
                            <th>Max_Y</th>
                            <th>Min_Y</th>
                            <th>Max_Z</th>
                            <th>Min_Z</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{allInputData.projectName}</td>
                            <td>{allInputData.description}</td>
                            <td>{allInputData.client}</td>
                            <td>{allInputData.contractor}</td>
                            <td>{allInputData.max_X}</td>
                            <td>{allInputData.min_X}</td>
                            <td>{allInputData.max_Y}</td>
                            <td>{allInputData.min_Y}</td>
                            <td>{allInputData.max_Z}</td>
                            <td>{allInputData.min_Z}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Result;
