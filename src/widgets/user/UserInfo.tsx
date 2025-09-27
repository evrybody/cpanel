import { getUserStatus } from "@/shared/api/getUserStatus";
import { getUserById } from "@/shared/api/getUserById";

export const UserInfo = async ({ id }: { id: string }) => {
  const handleStatus = (id: string) => {
    try {
      const response = getUserStatus(id);
      if (!response) return null;

      return response;
    } catch {
      return null;
    }
  };

  const status = await handleStatus(id);

  const handleInfo = (id: string) => {
    try {
      const response = getUserById(id);
      if (!response) return null;

      return response;
    } catch {
      return null;
    }
  };

  const info = await handleInfo(id);

  return (
    <main className="bg-[oklch(0.200_0_0)] mx-3 rounded p-2">
      <section className="flex flex-col text-white">
        <h3 className="font-bold">User info</h3>
        <div className="flex flex-col">
          {info && (
            <>
              <span className="text-yellow-300">User ID: {info.id}</span>
              <span className="text-yellow-300">
                VIP level: {info.vipLevel}
              </span>
              <span className="text-yellow-300">Name: {info.name}</span>
            </>
          )}
          <span>Phone: +79999999999</span>
          {status && (
            <>
              <span>Blocking reason: {status.reasone}</span>
              <span>
                Date of ending:{" "}
                <span className="text-red-900">
                  {status.data || "permanently"}
                </span>
              </span>
            </>
          )}
        </div>
      </section>
    </main>
  );
};
