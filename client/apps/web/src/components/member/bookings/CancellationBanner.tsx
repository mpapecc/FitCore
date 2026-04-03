import { Info } from 'lucide-react';

export function CancellationBanner() {
  return (
    <div className="flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-lg px-4 py-3 mb-5">
      <Info className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-warning">Cancellation Policy</p>
        <p className="text-secondary text-xs mt-0.5 leading-relaxed">
          You can cancel up to <strong>2 hours</strong> before the class starts.
          Cancellations within 2 hours of the class cannot be processed.
        </p>
      </div>
    </div>
  );
}
