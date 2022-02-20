import { useLoaderData } from "remix";
import { ratp } from "~/lib/ratp";

export const loader = async () => {
  const traffic = await ratp.traffic();
  return traffic;
};

type Data = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const {metros, rers, tramways} = useLoaderData<Data>();

  return (
    <>
      <div className="space-y-6">
        {metros.map(traffic => (
          <div className="p-6 bg-gray-100">
            <div>
              <img
                className="w-10"
                src={`/img/lines/metro/${traffic.line}.svg`}
                alt={`Ligne ${traffic.line}`}
              />
            </div>
            <div>
              {traffic.title}
            </div>
            {/* <div>
              {traffic.slug}
            </div> */}
            <div>
              {traffic.message}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
