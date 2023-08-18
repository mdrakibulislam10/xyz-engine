import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const StepOneForm = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [client, setClient] = useState("");
    const [contractor, setContractor] = useState("");


    const stateOneFromData = {
        projectName, description, client, contractor
    };
    // console.log(stateOneFromData);

    return (
        <section className="mt-20">
            <div className="w-full max-w-xs mx-auto">
                <form className="bg-white shadow-xl border-2 rounded px-8 pt-6 pb-8 mb-4">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                            Project Name:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="projectName" type="text" required name="projectName" placeholder="Project Name"
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Project Description:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" required name="description" placeholder="Project Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
                            Client:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="client" type="text" required name="client" placeholder="Client"
                            onChange={(e) => setClient(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
                            Contractor:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="contractor" type="text" required placeholder="Contractor"
                            onChange={(e) => setContractor(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-10">
                        <Link to={"/step-two-form"} state={stateOneFromData}>
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit" value="Next" />
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default StepOneForm;