import { FC, useMemo, useState } from "react";
import { cx } from "~/lib/cx";
import { LineTraffic, LineType } from "~/lib/ratp";

interface TrafficCardProps {
  traffic: LineTraffic;
  type: LineType;
}
 
const TrafficCard: FC<TrafficCardProps> = ({
  traffic: { line, message, slug, title },
  type
}) => {
  const hasWorks = useMemo(() => slug.includes('trav'), [slug]);

  return (
    <div
      className={cx("px-6 py-5 space-y-2 transition-all bg-white rounded-lg shadow cursor-pointer hover:shadow-lg", {
        "ring ring-red-500": slug === 'critical',
        "ring ring-orange-300": slug === 'normal_trav',
      })}
    >
      <div className="flex items-center gap-2">
        <img
          className="w-10"
          src={`/img/lines/${type}/${line}.svg`}
          alt={`Ligne ${line}`}
        />
        {hasWorks && (
          <div className="w-3 h-3 bg-orange-300 rounded-full" />
        )}
        {slug === 'critical' && (
          <div className="w-3 h-3 bg-red-500 rounded-full" />
        )}
      </div>
      <div className="font-medium">
        {title}
      </div>
      {slug === 'critical' && (
        <div className="text-gray-600">
          {message}
        </div>
        )}
    </div>
  );
}
 
export default TrafficCard;