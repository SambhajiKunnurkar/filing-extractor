import { useState } from "react";
import API from "../services/api";

export default function UploadBox() {

    const [file, setFile] = useState(null);

    const uploadFile = async () => {

        if (!file) {
            alert("Select a PDF first");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await API.post(
                "/upload",
                formData
            );

            // alert(response.data.message);
            console.log(response.data);

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        }

    }

    return (

        <div>

            <input

                type="file"

                accept=".pdf"

                onChange={(e) =>
                    setFile(e.target.files[0])
                }

            />

            <button

                onClick={uploadFile}

                className="bg-blue-600 text-white px-5 py-2 rounded mt-5"

            >

                Upload PDF

            </button>

        </div>

    );

}