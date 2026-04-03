interface HydrationTrackerProps {
  consumed: number;
  target: number;
}

export function HydrationTracker({ consumed, target }: HydrationTrackerProps) {
  const percentage = Math.round((consumed / target) * 100);
  const remaining  = target - consumed;

  let motivationText: string;
  let motivationClass: string;
  if (consumed >= target) {
    motivationText  = '🎉 Daily goal reached! Great hydration today.';
    motivationClass = 'text-success';
  } else if (consumed >= target * 0.75) {
    motivationText  = `Almost there! ${remaining} more glass${remaining === 1 ? '' : 'es'} to go.`;
    motivationClass = 'text-warning';
  } else {
    motivationText  = `Stay hydrated! Aim for ${target} glasses today.`;
    motivationClass = 'text-secondary';
  }

  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-base font-semibold text-primary">💧 Daily Hydration</p>
          <p className="text-secondary text-sm mt-0.5">{consumed} of {target} glasses</p>
        </div>
        <span className="bg-blue-50 text-blue-600 border border-blue-200 text-sm font-bold px-3 py-1 rounded-full">
          {percentage}%
        </span>
      </div>

      {/* Glass grid */}
      <div className="grid grid-cols-8 gap-2 mb-4">
        {Array.from({ length: target }).map((_, i) => (
          <div
            key={i}
            className={`
              w-full aspect-square rounded-lg border-2 duration-DEFAULT
              flex items-center justify-center text-lg
              ${i < consumed
                ? 'bg-blue-100 border-blue-300'
                : 'bg-ghost border-stroke'
              }
            `}
          >
            {i < consumed ? '💧' : ''}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-ghost rounded-full mb-3">
        <div
          className="bg-blue-400 rounded-full h-2 duration-DEFAULT"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Motivation */}
      <p className={`text-sm font-medium ${motivationClass}`}>{motivationText}</p>
    </div>
  );
}
