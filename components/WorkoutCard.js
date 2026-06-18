export default function WorkoutCard({ workout }) {
  return (
    <div className="h-full min-h-[190px] rounded-[22px] bg-gradient-to-br from-blue-400 to-blue-900 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Today's Workout</h2>
        <span className="text-4xl">💪</span>
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl">
        <p className="whitespace-pre-line text-lg text-white leading-8">
          {workout}
        </p>
      </div>
    </div>
  );
}