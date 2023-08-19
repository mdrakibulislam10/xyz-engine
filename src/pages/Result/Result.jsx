import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const allInputData = location.state;

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        const capture = document.querySelector(".actual-receipt");
        setLoader(true);
        // console.log("Capturing element:", capture);

        html2canvas(capture)
            .then((canvas) => {
                // console.log("Canvas generated:", canvas);

                const imgData = canvas.toDataURL("image/png");
                // console.log("Image data:", imgData);

                const doc = new jsPDF("p", "mm", "a4");
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                const scale = Math.min(componentWidth / canvas.width, componentHeight / canvas.height);
                const imgWidth = canvas.width * scale;
                const imgHeight = canvas.height * scale;
                doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);


                setLoader(false);
                doc.save("receipt.pdf");
            });
    };


    return (
        <div className="mt-10 h-screen">
            <div className="flex justify-end">
                <button className="btn bg-sky-600 hover:bg-sky-700 text-white font-semibold"
                    disabled={!(loader === false)}
                    onClick={downloadPDF}
                >
                    {
                        loader ? "Downloading" : "Download"
                    }
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-sm md:table-md lg:table-lg actual-receipt">
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
                            <td>{allInputData?.projectName}</td>
                            <td>{allInputData?.description}</td>
                            <td>{allInputData?.client}</td>
                            <td>{allInputData?.contractor}</td>
                            <td>{allInputData?.max_X}</td>
                            <td>{allInputData?.min_X}</td>
                            <td>{allInputData?.max_Y}</td>
                            <td>{allInputData?.min_Y}</td>
                            <td>{allInputData?.max_Z}</td>
                            <td>{allInputData?.min_Z}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Result;
