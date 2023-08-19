import { Link, useLocation } from "react-router-dom";
import Papa from 'papaparse';
import { useState } from "react";
import Swal from "sweetalert2";
import { FaArrowRight } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const StepTwoForm = () => {
    const location = useLocation();
    const stepOneFormData = location.state;

    // const [csvData, setCsvData] = useState([]);
    const [minMaxValues, setMinMaxValues] = useState({
        max_X: "",
        min_X: "",
        max_Y: "",
        min_Y: "",
        max_Z: "",
        min_Z: "",
    });
    const [processingComplete, setProcessingComplete] = useState(false);

    const [chartData, setChartData] = useState([]);
    const [kpValues, setKpValues] = useState([]);
    const [allXValue, setAllXValue] = useState([]);

    const projectName = stepOneFormData?.projectName;
    const description = stepOneFormData?.description;
    const client = stepOneFormData?.client;
    const contractor = stepOneFormData?.contractor;
    // console.log(projectName);

    const handleCSVUpload = e => {
        const uploadedFile = e.target.files[0];

        Papa.parse(uploadedFile, {
            skipEmptyLines: true,
            header: true,

            complete: result => {
                const data = result.data;
                // console.log(data);

                const newChartData = data.map(row => ({
                    kP: row.KP,
                    X: row.X,
                }));
                setChartData(newChartData);

                const kpValues = data.map(row => parseInt(row.KP));
                const xValues = data.map(row => parseFloat(row.X));
                const yValues = data.map(row => parseFloat(row.Y));
                const zValues = data.map(row => parseFloat(row.Z));
                // console.log(kpValues);

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

                const allXValue = xValues;
                setAllXValue(allXValue);
                setKpValues(kpValues);

                // setCsvData(data);
                setMinMaxValues(newMinMaxValues);

                setProcessingComplete(true);

            },
            error: error => {
                console.error('CSV Parsing Error:', error);
            }
        });
    };

    // console.log(chartData);
    // console.log(kpValues);
    // console.log(allXValue);

    return (
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-1">
            <div className="w-full max-w-xl mx-auto">
                <form className="bg-white shadow-xl border-2 rounded px-8 pt-6 pb-8 mb-4">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                            Project Name:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="projectName" type="text" name="projectName" placeholder="Project Name"
                            defaultValue={projectName}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Project Description:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" name="description" placeholder="Project Description"
                            defaultValue={description}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
                            Client:
                        </label>
                        <input className="shadow appearance-none border rounded w-full text-gray-500 font-semibold py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="client" type="text" name="client" placeholder="Client"
                            defaultValue={client}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
                            Contractor:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="contractor" type="text" placeholder="Contractor"
                            defaultValue={contractor}
                            readOnly
                        />
                    </div>

                    <div className="mb-4 mt-10">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="csv">
                            Upload CSV File:
                        </label>
                        <input
                            type="file"
                            accept=".csv"
                            className="py-2 px-4 rounded-lg mb-4 w-full border-2 shadow-sm"
                            onChange={handleCSVUpload}
                            id="csv"
                            name="csv"
                            required
                        />
                    </div>

                    {/* Max-Min Values Input Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="max-x">
                            Max_X:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="max-x" type="number" placeholder="Max_X"
                            defaultValue={minMaxValues.max_X}
                        // readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="min-x">
                            Min_X:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="min-x" type="number" placeholder="Min_X"
                            defaultValue={minMaxValues.min_X}
                        // readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="max-y">
                            Max_Y:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="max-y" type="number" placeholder="Max_Y"
                            defaultValue={minMaxValues.max_Y}
                        // readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="min-y">
                            Min_Y:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="min-y" type="number" placeholder="Min_Y"
                            defaultValue={minMaxValues.min_Y}
                        // readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="max-z">
                            Max_Z:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="max-z" type="number" placeholder="Max_Z"
                            defaultValue={minMaxValues.max_Z}
                        // readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="min-z">
                            Min_Z:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline" id="min-z" type="number" placeholder="Min_Z"
                            defaultValue={minMaxValues.min_Z}
                        // readOnly
                        />
                    </div>

                    <div className="flex items-center justify-end mt-10">
                        {
                            !processingComplete ? (
                                <button
                                    title="Please fill in the input fields"
                                    className="bg-blue-500 text-white cursor-not-allowed font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline flex items-center gap-1"
                                    onClick={() => Swal.fire('Please upload a .csv file')}
                                >
                                    View The Results <FaArrowRight />
                                </button>
                            ) : (
                                <Link to={"/result"} state={minMaxValues && { ...stepOneFormData, ...minMaxValues }}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline flex items-center gap-1" type="submit">
                                        View The Results <FaArrowRight />
                                    </button>
                                </Link>
                            )
                        }
                    </div>
                </form>
            </div>

            {/* csv values chart */}
            <div>
                {processingComplete ? (
                    <div className="mt-16">
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="kP" />
                                <YAxis dataKey="X" />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload) {
                                            const kpValue = payload.find(entry => entry.dataKey === 'kP').value;
                                            const xValue = payload.find(entry => entry.dataKey === 'X').value;

                                            return (
                                                <div className="custom-tooltip">
                                                    <p>KP: {kpValue}</p>
                                                    <p>X: {xValue}</p>
                                                </div>
                                            );
                                        }

                                        return null;
                                    }}
                                />
                                <Area type="monotone" dataKey="kP" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="X" stroke="#82ca9d" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>
                )
                    : <p className="mt-16 text-2xl font-semibold text-orange-600 italic text-center">Upload a .csv file to view the chart here.</p>
                }

            </div>
        </section>
    );
};

export default StepTwoForm;