import { useLoaderData } from "remix";
import TrafficCard from "~/components/TrafficCard";
import { ratp } from "~/lib/ratp";

export const loader = async () => {
  const traffic = await ratp.traffic();
  return traffic;
};

type Data = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const {metros, rers, tramways} = useLoaderData<Data>();
  console.log(metros)
  return (
    <>
      <div className="grid gap-4 p-10 bg-gray-100 sm:grid-cols-2 lg:grid-cols-3">
        {metros.map(traffic => (
          <TrafficCard
            key={`metro-${traffic.line}`}
            type="metro"
            traffic={traffic}
          />
        ))}
        {rers.map(traffic => (
          <TrafficCard
            key={`rer-${traffic.line}`}
            type="rer"
            traffic={traffic}
          />
        ))}
        {tramways.map(traffic => (
          <TrafficCard
            key={`tramways-${traffic.line}`}
            type="tramway"
            traffic={traffic}
          />
        ))}
      </div>
    </>
  );
}
