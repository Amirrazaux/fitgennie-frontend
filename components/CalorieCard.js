export default function CalorieCard({ calories }) {
  return (
    <div className="h-full min-h-[190px] rounded-[22px] bg-gradient-to-br from-orange-400 to-red-900 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Daily Calories</h2>
        <span className="text-4xl">🔥</span>
      </div>

      <div className="mt-6">
        <p className="text-5xl font-bold text-white leading-none">{calories}</p>
        <p className="text-orange-100 mt-2">Recommended Intake</p>
      </div>
    </div>
  );
}