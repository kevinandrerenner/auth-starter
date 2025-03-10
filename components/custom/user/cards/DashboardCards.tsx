import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart,
  DollarSign,
  User,
  Users,
} from "lucide-react";
import React from "react";
import { getUserStats } from "@/server/actions/users";

// Map string to icon component
const iconMap = {
  Users: Users,
  User: User,
  BarChart: BarChart,
  DollarSign: DollarSign,
};

// Inside your component:
const stats = await getUserStats();

const cards = [
  {
    title: "Total Users",
    value: stats.totalUsers,
    change: stats.totalUsersChange,
    icon: "Users",
    percentage: false,
  },
  {
    title: "Active Users",
    value: stats.activeUsers,
    change: stats.activeUsersChange,
    icon: "Users",
    percentage: false,
  },
  {
    title: "Total Posts",
    icon: "BarChart",
    value: 567,
    unit: "",
    change: 8,
    percentage: true,
  },
  {
    title: "Revenue",
    icon: "DollarSign",
    value: 45231,
    unit: "$",
    change: -3,
    percentage: true,
  },
];
export default async function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = iconMap[card.icon as keyof typeof iconMap];
        const isPositive = card.change >= 0;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-md">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {card.unit}
                {card.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {isPositive ? "+" : ""}
                  {card.change}
                  {card.percentage ? "%" : ""}{" "}
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
