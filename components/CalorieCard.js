export default function CalorieCard({ calories }) {

    return (

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold text-white">

                    Daily Calories

                </h2>

                <span className="text-4xl">

                    🔥

                </span>

            </div>

            <p className="text-5xl font-bold text-white mt-6">

                {calories}

            </p>

            <p className="text-orange-100 mt-2">

                Recommended Intake

            </p>

        </div>

    );

}