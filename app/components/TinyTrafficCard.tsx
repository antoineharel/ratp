import { FC, useMemo } from "react";
import { cx } from "~/lib/cx";
import { LineTraffic, LineType } from "~/lib/ratp";
import { BsConeStriped, BsExclamationCircleFill } from "react-icons/bs";

interface TinyTrafficCardProps {
  traffic: LineTraffic;
  type: LineType;
}

const TinyTrafficCard: FC<TinyTrafficCardProps> = ({ traffic: { line, message, slug, title }, type }) => {
  const hasIncidents = useMemo(() => slug === "critical" || line === "5", [slug]);
  const hasWorks = useMemo(() => slug.includes("trav"), [slug]);

  const classNames = useMemo(() => {
    return cx("relative flex-shrink-0 p-1.5 sm:p-2.5 transition-shadow bg-white shadow cursor-pointer hover:shadow-lg cursor rounded-lg sm:rounded-xl", {
      "ring-2 sm:ring ring-orange-300 bg-orange-50 hover:shadow-orange-200": hasWorks,
      "ring-2 sm:ring ring-red-500 bg-red-50 hover:shadow-red-200": hasIncidents,
    });
  }, []);

  return (
    <div className={classNames}>
      <img className="w-7 sm:w-8" src={`/img/lines/${type}/${line}.svg`} alt={`Ligne ${line}`} />
    </div>
  );
};

export default TinyTrafficCard;
