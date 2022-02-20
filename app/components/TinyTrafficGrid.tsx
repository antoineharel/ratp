import { FC } from "react";

interface TinyTrafficGridProps {}

const TinyTrafficGrid: FC<TinyTrafficGridProps> = ({ children }) => {
  return <div className="flex flex-wrap gap-3">{children}</div>;
};

export default TinyTrafficGrid;
