export default function WorkoutCard({ workout }) {

    return (

        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold text-white">

                    Today's Workout

                </h2>

                <span className="text-4xl">

                    💪

                </span>

            </div>

            <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl">

                <p className="whitespace-pre-line text-lg text-white leading-8">

                    {workout}

                </p>

            </div>

        </div>

    );

}