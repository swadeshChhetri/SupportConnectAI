import { useEffect, useState } from "react";
import {
  fetchPlans,
  fetchSubscription,
  updateSubscription,
  type Plan,
  type Subscription,
} from "../billingApi";
import PlanCard from "../../../shared/components/ui/PlanCard";
// import PlanCard from "../../components/ui/PlanCard";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const [p, s] = await Promise.all([fetchPlans(), fetchSubscription()]);
    setPlans(p);
    setSub(s);
  }

  const upgrade = async (planId: string) => {
    setSaving(true);
    await updateSubscription(planId);
    setSaving(false);

    load(); // refresh
  };

  if (!sub) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Subscription</h1>

      {/* Usage Summary */}
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="font-semibold text-lg mb-2">Usage This Month</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Chats</p>
            <p className="font-medium">
              {sub.usage.chatsUsed}/{sub.usage.chatsLimit}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Documents</p>
            <p className="font-medium">
              {sub.usage.docsUsed}/{sub.usage.docsLimit}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Agents</p>
            <p className="font-medium">
              {sub.usage.agentsUsed}/{sub.usage.agentsLimit}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Renews</p>
            <p className="font-medium">
              {new Date(sub.renewsOn).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <h2 className="text-xl font-semibold mb-4">Available Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            current={plan.id === sub.planId}
            onSelect={() => upgrade(plan.id)}
          />
        ))}
      </div>

      {saving && (
        <p className="text-blue-600 mt-4">Updating subscription...</p>
      )}
    </div>
  );
}
