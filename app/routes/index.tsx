import { useLoaderData } from "remix";
import TinyTrafficCard from "~/components/TinyTrafficCard";
import TinyTrafficGrid from "~/components/TinyTrafficGrid";
import { ratp } from "~/lib/ratp";

export const loader = async () => {
  const traffic = await ratp.traffic();
  return traffic;
};

type Data = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const { metros, rers, tramways } = useLoaderData<Data>();

  return (
    <div className="flex items-center justify-center h-screen m-auto">
      <div className="sm:w-[640px] p-10 mx-auto space-y-8 md:space-y-10">
        <h1 className="flex items-center gap-4 text-2xl font-bold text-center text-gray-600 sm:text-3xl">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="flex-shrink-0">État du trafic</span>
          <div className="w-full h-px bg-gray-300"></div>
        </h1>
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-1 sm:gap-1.5 text-xl font-semibold sm:text-xl md:text-2xl">
            <img className="w-6 sm:w-7 md:w-8" src="/img/metro.svg" />
            Métros
          </h2>
          <TinyTrafficGrid>
            {metros.map((traffic) => (
              <TinyTrafficCard key={`metro-${traffic.line}`} type="metro" traffic={traffic} />
            ))}
          </TinyTrafficGrid>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-1 sm:gap-1.5 text-xl font-semibold sm:text-xl md:text-2xl">
            <img className="w-6 sm:w-7 md:w-8" src="/img/rer.svg" />
            RER
          </h2>
          <TinyTrafficGrid>
            {rers.map((traffic) => (
              <TinyTrafficCard key={`rer-${traffic.line}`} type="rer" traffic={traffic} />
            ))}
          </TinyTrafficGrid>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-1 sm:gap-1.5 text-xl font-semibold sm:text-xl md:text-2xl">
            <img className="w-6 sm:w-7 md:w-8" src="/img/tramway.svg" />
            Tramway
          </h2>
          <TinyTrafficGrid>
            {tramways.map((traffic) => (
              <TinyTrafficCard key={`tramways-${traffic.line}`} type="tramway" traffic={traffic} />
            ))}
          </TinyTrafficGrid>
        </div>
      </div>
    </div>
  );
}
