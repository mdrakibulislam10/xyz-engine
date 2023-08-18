import { Link, useLocation } from "react-router-dom";
import Papa from 'papaparse';
import { useState } from "react";

const StepTwoForm = () => {
    const location = useLocation();
    const stepOneFormData = location.state;
    const [csvData, setCsvData] = useState([]);
    const [minMaxValues, setMinMaxValues] = useState({});

    const projectName = stepOneFormData.projectName;
    const description = stepOneFormData.description;
    const client = stepOneFormData.client;
    const contractor = stepOneFormData.contractor;
    // console.log(projectName);

    const handleCSVUpload = e => {
        const uploadedFile = e.target.files[0];

        Papa.parse(uploadedFile, {
            skipEmptyLines: true,
            header: true,

            complete: result => {
                const data = result.data;
                // console.log(data);

                const xValues = data.map(row => parseFloat(row.X));
                const yValues = data.map(row => parseFloat(row.Y));
                const zValues = data.map(row => parseFloat(row.Z));

                // console.log(xValues);
                // console.log(yValues);
                // console.log(zValues);

                if (xValues.includes(NaN) || yValues.includes(NaN) || zValues.includes(NaN)) {
                    console.error('NaN values detected in extracted data.');
                    return;
                }

                const newMinMaxValues = {
                    max_X: Math.max(...xValues),
                    min_X: Math.min(...xValues),
                    max_Y: Math.max(...yValues),
                    min_Y: Math.min(...yValues),
                    max_Z: Math.max(...zValues),
                    min_Z: Math.min(...zValues),
                };

                // console.log(newMinMaxValues);

                setCsvData(data);
                setMinMaxValues(newMinMaxValues);
            },
            error: error => {
                console.error('CSV Parsing Error:', error);
            }
        });
    };

    console.log(minMaxValues);
    return (
        <section className="mt-20">
            <div className="w-full max-w-xl mx-auto">
                <form className="bg-white shadow-xl border-2 rounded px-8 pt-6 pb-8 mb-4">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                            Project Name:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="projectName" type="text" required name="projectName" placeholder="Project Name"
                            defaultValue={projectName}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Project Description:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" required name="description" placeholder="Project Description"
                            defaultValue={description}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
                            Client:
                        </label>
                        <input className="shadow appearance-none border rounded w-full text-gray-500 font-semibold py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="client" type="text" required name="client" placeholder="Client"
                            defaultValue={client}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
                            Contractor:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="contractor" type="text" required placeholder="Contractor"
                            defaultValue={contractor}
                            readOnly
                        />
                    </div>

                    <div className="mb-4 mt-10">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
                            Upload CSV File:
                        </label>
                        <input
                            type="file"
                            accept=".csv"
                            className="py-2 px-4 rounded-lg mb-4 w-full border-2 shadow-sm"
                            onChange={handleCSVUpload}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-10">
                        <Link to={"/step-two-form"} state={"stateOneFromData"}>
                            <input className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit" value="View The Results" />
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default StepTwoForm;