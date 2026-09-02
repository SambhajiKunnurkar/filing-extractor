import UploadBox from "../components/UploadBox";

export default function Dashboard() {

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="bg-white shadow p-5">

                <h1 className="text-2xl font-bold">

                    Compliance Dashboard

                </h1>

            </div>

            <div className="max-w-4xl mx-auto mt-10">

                <div className="bg-white rounded-xl shadow p-10">

                    <h2 className="text-xl font-semibold">

                        Upload Filing

                    </h2>

                    <div className="border-2 border-dashed rounded-xl h-64 mt-6 flex items-center justify-center">

                        <UploadBox />

                    </div>

                </div>

            </div>

        </div>

    );

}