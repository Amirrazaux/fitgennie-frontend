export default function ProteinCard({ protein }) {
  return (
    <div className="h-full min-h-[190px] rounded-[22px] bg-gradient-to-br from-green-400 to-green-900 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Protein Intake</h2>
        <span className="text-4xl">🍗</span>
      </div>

      <div className="mt-6">
        <p className="text-5xl font-bold text-white leading-none">{protein}g</p>
        <p className="text-green-100 mt-2">Daily Target</p>
      </div>
    </div>
  );
}