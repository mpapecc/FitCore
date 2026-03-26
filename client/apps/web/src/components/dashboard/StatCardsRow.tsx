import { Users, BadgeCheck, DollarSign, UserPlus } from "lucide-react";
import { StatCard } from "./StatCard";

const STAT_CARDS = [
  {
    title: "Total Members",
    value: 247,
    trend: 12,
    trendLabel: "vs last month",
    icon: <Users size={18} />,
  },
  {
    title: "Active Memberships",
    value: 189,
    trend: 4,
    trendLabel: "vs last month",
    icon: <BadgeCheck size={18} />,
  },
  {
    title: "Monthly Revenue",
    value: "$8,240",
    trend: 8,
    trendLabel: "vs last month",
    icon: <DollarSign size={18} />,
  },
  {
    title: "New Members This Month",
    value: 23,
    trend: -3,
    trendLabel: "vs last month",
    icon: <UserPlus size={18} />,
  },
];

export function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {STAT_CARDS.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
