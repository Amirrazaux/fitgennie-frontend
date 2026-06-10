export default function ProteinCard({ protein }) {

    return (

        <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold text-white">

                    Protein Intake

                </h2>

                <span className="text-4xl">

                    🍗

                </span>

            </div>

            <p className="text-5xl font-bold text-white mt-6">

                {protein}g

            </p>

            <p className="text-green-100 mt-2">

                Daily Target

            </p>

        </div>

    );

}