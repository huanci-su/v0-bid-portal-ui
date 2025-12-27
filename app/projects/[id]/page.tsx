"use client"
import { AppShell } from "@/components/app-shell"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Calendar,
  DollarSign,
  Target,
  FileText,
  Sparkles,
  Download,
  Eye,
  Archive,
  Clock,
} from "lucide-react"
import { GeneratePanel } from "@/components/generate-panel"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectData = {
    id: params.id,
    name: "台北市政府智慧交通系統建置案",
    agency: "台北市政府交通局",
    status: "active" as const,
    budget: "NT$ 25,000,000",
    budgetRange: "2000萬-3000萬",
    deadline: "2024-03-15",
    evaluationPoints: ["技術能力 (30%)", "過往實績 (25%)", "專案規劃 (25%)", "價格合理性 (20%)"],
    description:
      "建置台北市智慧交通管理系統，包含即時路況監控、AI 交通流量分析、停車位管理整合、公車動態資訊系統等功能。",
    rfpUrl: "/documents/rfp-001.pdf",
  }

  return (
    <AppShell
      breadcrumbs={[
        { label: "首頁", href: "/" },
        { label: "投標專案", href: "/projects" },
        { label: projectData.name },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Project Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 text-balance leading-tight">{projectData.name}</CardTitle>
                  <StatusBadge status={projectData.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">機關單位</p>
                    <p className="text-sm font-medium text-balance">{projectData.agency}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">截止日期</p>
                    <p className="text-sm font-medium">{projectData.deadline}</p>
                    <Badge className="mt-1 rounded-full" variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      剩餘 15 天
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">預算級距</p>
                    <p className="text-sm font-medium">{projectData.budgetRange}</p>
                    <p className="text-xs text-muted-foreground mt-1">預估金額: {projectData.budget}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">評選重點</p>
                    <ul className="space-y-1.5">
                      {projectData.evaluationPoints.map((point, index) => (
                        <li key={index} className="text-xs flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="text-balance leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-sm">專案描述</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed text-balance">{projectData.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-5 rounded-2xl h-auto p-1">
              <TabsTrigger value="rfp" className="rounded-xl py-2.5">
                <FileText className="h-4 w-4 mr-2" />
                RFP
              </TabsTrigger>
              <TabsTrigger value="generate" className="rounded-xl py-2.5">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="assets" className="rounded-xl py-2.5">
                <Download className="h-4 w-4 mr-2" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="qa" className="rounded-xl py-2.5">
                <Target className="h-4 w-4 mr-2" />
                QA
              </TabsTrigger>
              <TabsTrigger value="archive" className="rounded-xl py-2.5">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rfp" className="mt-6 space-y-4">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>招標文件 (RFP)</CardTitle>
                  <CardDescription>檢視原始招標需求文件</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium mb-1">台北市政府智慧交通系統建置案_RFP.pdf</p>
                    <p className="text-xs text-muted-foreground mb-4">檔案大小: 2.4 MB • 上傳日期: 2024-01-05</p>
                    <div className="flex gap-2 justify-center">
                      <Button className="rounded-2xl">
                        <Eye className="h-4 w-4 mr-2" />
                        預覽文件
                      </Button>
                      <Button variant="outline" className="rounded-2xl bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        下載
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generate" className="mt-6">
              <GeneratePanel projectId={params.id} />
            </TabsContent>

            <TabsContent value="assets" className="mt-6 space-y-4">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>專案資產</CardTitle>
                  <CardDescription>管理專案相關文件與生成資產</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">尚無資產檔案</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qa" className="mt-6 space-y-4">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>問答管理</CardTitle>
                  <CardDescription>管理投標疑義澄清與問答</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">尚無問答記錄</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archive" className="mt-6 space-y-4">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>封存記錄</CardTitle>
                  <CardDescription>檢視已封存的歷史版本</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Archive className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">尚無封存記錄</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
