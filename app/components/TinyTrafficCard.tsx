import { FC, useMemo } from "react";
import { cx } from "~/lib/cx";
import { LineTraffic, LineType } from "~/lib/ratp";
import Tippy from "@tippyjs/react";
import { Link } from "remix";

import "tippy.js/dist/tippy.css";

interface TinyTrafficCardProps {
  traffic: LineTraffic;
  type: LineType;
}

const TinyTrafficCard: FC<TinyTrafficCardProps> = ({ traffic: { line, message, slug, title }, type }) => {
  const hasIncidents = useMemo(() => slug === "critical", [slug]);
  const hasWorks = useMemo(() => slug.includes("trav"), [slug]);

  const classNames = useMemo(() => {
    return cx("relative flex-shrink-0 p-1.5 sm:p-2.5 transition-shadow bg-white shadow cursor-pointer hover:shadow-lg cursor rounded-lg sm:rounded-xl", {
      "ring-2 sm:ring ring-orange-300 bg-orange-50 hover:shadow-orange-200": hasWorks,
      "ring-2 sm:ring ring-red-500 bg-red-50 hover:shadow-red-200": hasIncidents,
    });
  }, []);

  return (
    <Tippy
      duration={0}
      content={
        <div className="p-4 space-y-1 text-sm bg-white shadow-lg">
          <div
            className={cx("font-semibold", {
              "text-green-600": slug === "normal",
              "text-red-500": hasIncidents,
              "text-orange-500": hasWorks,
            })}
          >
            {title}
          </div>
          <div>{message}</div>
        </div>
      }
    >
      <Link to="/test">
        <div className={classNames} data-tip>
          <img className="w-7 sm:w-8" src={`/img/lines/${type}/${line}.svg`} alt={`Ligne ${line}`} />
        </div>
      </Link>
    </Tippy>
  );
};

export default TinyTrafficCard;
