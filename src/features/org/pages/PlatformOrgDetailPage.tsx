import { useParams } from "react-router-dom";
import { usePlatformOrgDetail } from "../hooks/usePlatformOrgs";

export default function PlatformOrgDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = usePlatformOrgDetail(id!);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">{data.name}</h1>
      <p>Status: {data.status}</p>
      <p>Slug: {data.slug}</p>
    </div>
  );
}