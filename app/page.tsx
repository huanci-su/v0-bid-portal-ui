"use client"
import { AppShell } from "@/components/app-shell"
import { KPICard } from "@/components/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderKanban, FileCheck, TrendingUp, Users, ArrowRight, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DashboardPage() {
  const recentActivities = [
    {
      user: "王小明",
      action: "更新了專案",
      target: "台北市政府智慧交通系統",
      time: "10分鐘前",
      avatar: "王",
    },
    {
      user: "李美華",
      action: "上傳了模板",
      target: "技術服務建議書範本 v3.2",
      time: "1小時前",
      avatar: "李",
    },
    {
      user: "陳志強",
      action: "完成審核",
      target: "高雄市政府環保專案",
      time: "3小時前",
      avatar: "陳",
    },
    {
      user: "林雅婷",
      action: "新增資產",
      target: "2023年度專案成果報告",
      time: "昨天",
      avatar: "林",
    },
  ]

  const upcomingDeadlines = [
    { project: "交通部公路局道路養護標案", date: "2024-01-20", daysLeft: 3 },
    { project: "台中市政府數位轉型計畫", date: "2024-01-25", daysLeft: 8 },
    { project: "新北市政府社會福利系統", date: "2024-02-01", daysLeft: 15 },
  ]

  return (
    <AppShell breadcrumbs={[{ label: "首頁" }]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">儀表板</h1>
            <p className="text-muted-foreground">歡迎回來，這是您的專案概況</p>
          </div>
          <Button className="rounded-2xl" size="lg">
            <FolderKanban className="mr-2 h-4 w-4" />
            新增專案
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="進行中專案" value={12} change={{ value: "+2", trend: "up" }} icon={FolderKanban} />
          <KPICard title="本月提交" value={8} change={{ value: "+25%", trend: "up" }} icon={FileCheck} />
          <KPICard title="中標率" value="68%" change={{ value: "+5%", trend: "up" }} icon={TrendingUp} />
          <KPICard title="團隊成員" value={24} change={{ value: "0", trend: "neutral" }} icon={Users} />
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl font-semibold">最近活動</CardTitle>
              <Button variant="ghost" size="sm" className="rounded-2xl">
                查看全部
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-sm text-foreground">{activity.target}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                即將到期
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm font-medium mb-2 text-balance">{deadline.project}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{deadline.date}</span>
                      <span
                        className={`font-medium ${
                          deadline.daysLeft <= 5
                            ? "text-red-600 dark:text-red-400"
                            : "text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        剩 {deadline.daysLeft} 天
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
