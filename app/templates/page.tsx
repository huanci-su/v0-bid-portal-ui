"use client"

import * as React from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, FileText, Download, Star, Copy, MoreVertical, FileCheck, Upload, FileEdit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/empty-state"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { TemplateDetailDrawer } from "@/components/template-detail-drawer"

interface Template {
  id: string
  name: string
  description: string
  category: "技術類" | "工程類" | "維運類" | "資安類" | "管理類" | "簡報類"
  format: "DOCX" | "PPTX" | "章節片段"
  tags: string[]
  version: string
  downloads: number
  appliedCount: number
  updatedAt: string
  updatedBy: string
  status: "草稿" | "已發布" | "已封存"
  visibility: "全團隊" | "僅專案" | "私有"
  isStarred: boolean
  scenario: string[]
  content?: {
    sections: string[]
    rfpClauses: string[]
  }
  versions?: Array<{
    version: string
    date: string
    changes: string
    author: string
  }>
}

const mockTemplates: Template[] = [
  {
    id: "T001",
    name: "雲端服務技術建議書範本",
    description: "適用於雲端基礎設施、IaaS/PaaS 服務採購案的技術建議書標準格式，包含技術架構、資安防護、SLA 保證等章節",
    category: "技術類",
    format: "DOCX",
    tags: ["雲端", "IaaS", "PaaS", "資安"],
    version: "v4.2",
    downloads: 234,
    appliedCount: 18,
    updatedAt: "2024-01-15",
    updatedBy: "張承翰",
    status: "已發布",
    visibility: "全團隊",
    isStarred: true,
    scenario: ["新建置", "雲"],
    content: {
      sections: ["技術架構設計", "資安防護機制", "服務水準協議", "災難復原計畫", "成本效益分析"],
      rfpClauses: ["技術規範", "資安要求", "SLA條款", "維運計畫"],
    },
    versions: [
      { version: "v4.2", date: "2024-01-15", changes: "新增 AI 服務整合章節", author: "張承翰" },
      { version: "v4.1", date: "2023-12-10", changes: "更新資安規範至 ISO 27001:2022", author: "王美玲" },
      { version: "v4.0", date: "2023-11-01", changes: "重構技術架構章節", author: "張承翰" },
    ],
  },
  {
    id: "T002",
    name: "網路設備維運服務建議書",
    description: "網路交換器、路由器、防火牆等設備維運服務標準建議書，含 24x7 支援、定期巡檢、緊急派工等服務項目",
    category: "維運類",
    format: "DOCX",
    tags: ["網路", "維運", "SLA", "24x7"],
    version: "v3.8",
    downloads: 189,
    appliedCount: 24,
    updatedAt: "2024-01-12",
    updatedBy: "李建志",
    status: "已發布",
    visibility: "全團隊",
    isStarred: true,
    scenario: ["維運", "網路"],
    content: {
      sections: ["服務範圍", "服務時間", "應變機制", "人力配置", "報價明細"],
      rfpClauses: ["服務水準", "應變時效", "維運項目", "備品管理"],
    },
    versions: [
      { version: "v3.8", date: "2024-01-12", changes: "調整 SLA 回應時效說明", author: "李建志" },
      { version: "v3.7", date: "2023-12-20", changes: "新增備品管理章節", author: "陳怡君" },
    ],
  },
  {
    id: "T003",
    name: "資安檢測服務技術簡報",
    description: "滲透測試、弱點掃描、社交工程演練等資安檢測服務的標準簡報範本，適用於評選簡報與技術交流",
    category: "資安類",
    format: "PPTX",
    tags: ["資安", "滲透測試", "弱點掃描", "簡報"],
    version: "v2.5",
    downloads: 156,
    appliedCount: 12,
    updatedAt: "2024-01-10",
    updatedBy: "黃志明",
    status: "已發布",
    visibility: "全團隊",
    isStarred: false,
    scenario: ["資安"],
    content: {
      sections: ["服務概述", "檢測方法", "工具與技術", "案例分享", "團隊介紹", "報價說明"],
      rfpClauses: ["資安檢測項目", "檢測標準", "報告格式"],
    },
    versions: [
      { version: "v2.5", date: "2024-01-10", changes: "更新案例為 2024 最新實績", author: "黃志明" },
      { version: "v2.4", date: "2023-11-15", changes: "新增 AI 資安威脅分析", author: "黃志明" },
    ],
  },
  {
    id: "T004",
    name: "專案管理計畫書標準格式",
    description: "依循 PMI PMBOK 標準的專案管理計畫書範本，包含範疇、時程、成本、品質、溝通、風險等十大知識領域",
    category: "管理類",
    format: "DOCX",
    tags: ["專案管理", "PMBOK", "PMP", "管理"],
    version: "v5.1",
    downloads: 298,
    appliedCount: 31,
    updatedAt: "2024-01-08",
    updatedBy: "林淑芬",
    status: "已發布",
    visibility: "全團隊",
    isStarred: true,
    scenario: ["新建置", "維運"],
    content: {
      sections: ["專案章程", "範疇管理", "時程管理", "成本管理", "品質管理", "風險管理", "溝通管理"],
      rfpClauses: ["專案管理要求", "品質管理計畫", "風險管理計畫"],
    },
    versions: [
      { version: "v5.1", date: "2024-01-08", changes: "對齊 PMBOK 第七版", author: "林淑芬" },
      { version: "v5.0", date: "2023-10-20", changes: "全面改版為敏捷混合式管理", author: "王大明" },
    ],
  },
  {
    id: "T005",
    name: "系統整合 SLA 條款片段",
    description: "系統整合專案常用的服務水準協議（SLA）條款集合，包含可用性、回應時效、罰則計算等標準文字",
    category: "技術類",
    format: "章節片段",
    tags: ["SLA", "服務水準", "系統整合"],
    version: "v2.2",
    downloads: 167,
    appliedCount: 43,
    updatedAt: "2024-01-14",
    updatedBy: "陳怡君",
    status: "已發布",
    visibility: "全團隊",
    isStarred: false,
    scenario: ["新建置"],
    content: {
      sections: ["系統可用性定義", "回應時效標準", "服務時間區間", "罰則計算公式", "例外事項說明"],
      rfpClauses: ["服務水準協議", "驗收標準"],
    },
    versions: [
      { version: "v2.2", date: "2024-01-14", changes: "調整罰則計算上限", author: "陳怡君" },
      { version: "v2.1", date: "2023-12-05", changes: "新增雲端服務 SLA 條款", author: "張承翰" },
    ],
  },
  {
    id: "T006",
    name: "機房建置工程建議書",
    description: "資料中心機房建置工程標準建議書，含空調、消防、監控、佈線等子系統設計與施工規範",
    category: "工程類",
    format: "DOCX",
    tags: ["機房", "工程", "建置", "基礎設施"],
    version: "v3.4",
    downloads: 142,
    appliedCount: 9,
    updatedAt: "2024-01-11",
    updatedBy: "劉俊傑",
    status: "已發布",
    visibility: "僅專案",
    isStarred: false,
    scenario: ["新建置"],
    content: {
      sections: ["機房等級規劃", "電力系統設計", "空調系統設計", "消防系統規劃", "監控系統整合", "施工時程"],
      rfpClauses: ["工程規範", "設備等級", "施工品質"],
    },
    versions: [
      { version: "v3.4", date: "2024-01-11", changes: "新增綠能節電設計章節", author: "劉俊傑" },
      { version: "v3.3", date: "2023-11-28", changes: "更新消防法規標準", author: "劉俊傑" },
    ],
  },
  {
    id: "T007",
    name: "教育訓練計畫書範本",
    description: "系統導入教育訓練計畫書標準格式，含課程規劃、講師資歷、教材內容、評量方式、訓練時數等",
    category: "管理類",
    format: "DOCX",
    tags: ["教育訓練", "導入", "課程"],
    version: "v2.9",
    downloads: 201,
    appliedCount: 27,
    updatedAt: "2024-01-09",
    updatedBy: "王美玲",
    status: "已發布",
    visibility: "全團隊",
    isStarred: true,
    scenario: ["新建置"],
    content: {
      sections: ["訓練需求分析", "課程規劃表", "講師資歷說明", "教材大綱", "評量機制", "訓練成效追蹤"],
      rfpClauses: ["教育訓練要求", "課程時數", "講師資格"],
    },
    versions: [
      { version: "v2.9", date: "2024-01-09", changes: "新增線上課程規劃", author: "王美玲" },
      { version: "v2.8", date: "2023-12-15", changes: "調整評量標準", author: "林淑芬" },
    ],
  },
  {
    id: "T008",
    name: "資安事件應變計畫",
    description: "資訊安全事件緊急應變計畫標準格式，含事件分級、通報流程、應變小組、復原程序等",
    category: "資安類",
    format: "DOCX",
    tags: ["資安", "應變", "ISMS", "事件處理"],
    version: "v1.7",
    downloads: 128,
    appliedCount: 15,
    updatedAt: "2024-01-13",
    updatedBy: "黃志明",
    status: "已發布",
    visibility: "全團隊",
    isStarred: false,
    scenario: ["資安"],
    content: {
      sections: ["事件分級標準", "通報機制", "應變小組組織", "處理流程", "復原程序", "事後檢討"],
      rfpClauses: ["資安應變要求", "事件處理時效", "通報機制"],
    },
    versions: [
      { version: "v1.7", date: "2024-01-13", changes: "對齊 ISO 27035 標準", author: "黃志明" },
      { version: "v1.6", date: "2023-11-10", changes: "新增勒索軟體應變程序", author: "黃志明" },
    ],
  },
  {
    id: "T009",
    name: "評選簡報標準模板",
    description: "政府標案評選簡報標準格式，含公司介紹、技術方案、團隊陣容、實績案例、報價說明等標準章節",
    category: "簡報類",
    format: "PPTX",
    tags: ["簡報", "評選", "提案"],
    version: "v4.0",
    downloads: 312,
    appliedCount: 38,
    updatedAt: "2024-01-07",
    updatedBy: "李建志",
    status: "已發布",
    visibility: "全團隊",
    isStarred: true,
    scenario: ["新建置", "維運", "資安"],
    content: {
      sections: ["公司簡介", "技術方案說明", "團隊組織架構", "專案實績", "時程規劃", "報價明細"],
      rfpClauses: ["評選項目"],
    },
    versions: [
      { version: "v4.0", date: "2024-01-07", changes: "全新設計風格改版", author: "李建志" },
      { version: "v3.9", date: "2023-12-01", changes: "調整實績展示方式", author: "陳怡君" },
    ],
  },
  {
    id: "T010",
    name: "DevOps 自動化建置方案",
    description: "CI/CD 流程、容器化部署、自動化測試等 DevOps 技術方案建議書，適用於系統現代化轉型專案",
    category: "技術類",
    format: "DOCX",
    tags: ["DevOps", "CI/CD", "容器", "自動化"],
    version: "v1.3",
    downloads: 94,
    appliedCount: 7,
    updatedAt: "2024-01-06",
    updatedBy: "張承翰",
    status: "草稿",
    visibility: "私有",
    isStarred: false,
    scenario: ["新建置", "雲"],
    content: {
      sections: ["DevOps 概念說明", "CI/CD 流程設計", "容器化策略", "自動化測試框架", "監控與日誌"],
      rfpClauses: ["技術架構", "自動化要求"],
    },
    versions: [
      { version: "v1.3", date: "2024-01-06", changes: "新增 Kubernetes 部署章節", author: "張承翰" },
      { version: "v1.2", date: "2023-12-22", changes: "初版建立", author: "張承翰" },
    ],
  },
  {
    id: "T011",
    name: "個資保護管理制度",
    description: "個人資料保護法遵循管理制度標準文件，含個資盤點、風險評估、安全措施、稽核機制等",
    category: "管理類",
    format: "DOCX",
    tags: ["個資", "PDPA", "法遵", "隱私"],
    version: "v2.1",
    downloads: 176,
    appliedCount: 19,
    updatedAt: "2024-01-05",
    updatedBy: "王美玲",
    status: "已發布",
    visibility: "全團隊",
    isStarred: false,
    scenario: ["資安"],
    content: {
      sections: ["個資盤點清冊", "風險評估報告", "安全管理措施", "事故應變程序", "教育訓練計畫", "稽核機制"],
      rfpClauses: ["個資保護要求", "法遵事項"],
    },
    versions: [
      { version: "v2.1", date: "2024-01-05", changes: "更新至最新個資法規", author: "王美玲" },
      { version: "v2.0", date: "2023-10-15", changes: "對齊 GDPR 標準", author: "黃志明" },
    ],
  },
  {
    id: "T012",
    name: "系統驗收測試計畫",
    description: "資訊系統驗收測試標準計畫書，含測試範圍、測試案例、驗收標準、測試環境、缺陷管理等",
    category: "技術類",
    format: "DOCX",
    tags: ["測試", "驗收", "UAT", "品質"],
    version: "v3.6",
    downloads: 223,
    appliedCount: 29,
    updatedAt: "2024-01-04",
    updatedBy: "陳怡君",
    status: "已發布",
    visibility: "全團隊",
    isStarred: true,
    scenario: ["新建置"],
    content: {
      sections: ["測試策略", "測試範圍", "測試案例設計", "驗收標準", "測試環境需求", "缺陷追蹤流程"],
      rfpClauses: ["驗收標準", "測試要求", "品質標準"],
    },
    versions: [
      { version: "v3.6", date: "2024-01-04", changes: "新增自動化測試章節", author: "陳怡君" },
      { version: "v3.5", date: "2023-11-18", changes: "調整驗收標準說明", author: "林淑芬" },
    ],
  },
]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [selectedFormat, setSelectedFormat] = React.useState<string>("all")
  const [selectedScenario, setSelectedScenario] = React.useState<string>("all")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<string>("updated")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [dialogStep, setDialogStep] = React.useState(1)
  const [sourceMethod, setSourceMethod] = React.useState("upload")
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [templates, setTemplates] = React.useState<Template[]>(mockTemplates)
  const { toast } = useToast()

  const filteredTemplates = React.useMemo(() => {
    const filtered = templates.filter((template) => {
      const matchesSearch =
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      const matchesFormat = selectedFormat === "all" || template.format === selectedFormat
      const matchesScenario = selectedScenario === "all" || template.scenario.includes(selectedScenario)
      const matchesStatus = selectedStatus === "all" || template.status === selectedStatus

      return matchesSearch && matchesCategory && matchesFormat && matchesScenario && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "downloads":
          return b.downloads - a.downloads
        case "applied":
          return b.appliedCount - a.appliedCount
        default:
          return 0
      }
    })

    return filtered
  }, [templates, searchQuery, selectedCategory, selectedFormat, selectedScenario, selectedStatus, sortBy])

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsDrawerOpen(true)
  }

  const handleStarToggle = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTemplates((prev) => prev.map((t) => (t.id === templateId ? { ...t, isStarred: !t.isStarred } : t)))
  }

  const handleNextStep = () => {
    if (dialogStep < 3) setDialogStep(dialogStep + 1)
  }

  const handlePrevStep = () => {
    if (dialogStep > 1) setDialogStep(dialogStep - 1)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setDialogStep(1)
  }

  return (
    <AppShell breadcrumbs={[{ label: "首頁", href: "/" }, { label: "模板庫" }]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">模板庫</h1>
            <p className="text-base text-muted-foreground">可重複使用的文件範本與標準格式</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl bg-primary hover:bg-primary/90" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                新增模板
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>新增模板 - 步驟 {dialogStep}/3</DialogTitle>
                <DialogDescription>
                  {dialogStep === 1 && "設定模板基本資料"}
                  {dialogStep === 2 && "選擇內容來源"}
                  {dialogStep === 3 && "發布設定"}
                </DialogDescription>
              </DialogHeader>

              {/* Step 1: Basic Info */}
              {dialogStep === 1 && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="template-name">模板名稱</Label>
                    <Input id="template-name" placeholder="輸入模板名稱" className="rounded-2xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">分類</Label>
                      <Select>
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue placeholder="選擇分類" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="tech">技術類</SelectItem>
                          <SelectItem value="engineering">工程類</SelectItem>
                          <SelectItem value="operations">維運類</SelectItem>
                          <SelectItem value="security">資安類</SelectItem>
                          <SelectItem value="management">管理類</SelectItem>
                          <SelectItem value="presentation">簡報類</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="format">格式</Label>
                      <Select>
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue placeholder="選擇格式" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="docx">DOCX</SelectItem>
                          <SelectItem value="pptx">PPTX</SelectItem>
                          <SelectItem value="section">章節片段</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">標籤</Label>
                    <Input id="tags" placeholder="輸入標籤，以逗號分隔" className="rounded-2xl" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">描述</Label>
                    <Textarea
                      id="description"
                      placeholder="輸入模板描述與適用情境"
                      className="rounded-2xl min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Content Source */}
              {dialogStep === 2 && (
                <div className="grid gap-4 py-4">
                  <RadioGroup defaultValue={sourceMethod} onValueChange={setSourceMethod} className="grid gap-4">
                    <Card className="rounded-2xl cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <RadioGroupItem value="upload" id="upload" className="sr-only" />
                        <label htmlFor="upload" className="flex items-center gap-4 w-full">
                          <Upload className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-base">上傳檔案</CardTitle>
                            <CardDescription>從本機上傳 DOCX 或 PPTX 檔案</CardDescription>
                          </div>
                        </label>
                      </CardHeader>
                    </Card>
                    <Card className="rounded-2xl cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <RadioGroupItem value="copy" id="copy" className="sr-only" />
                        <label htmlFor="copy" className="flex items-center gap-4 w-full">
                          <Copy className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-base">從既有模板複製</CardTitle>
                            <CardDescription>選擇現有模板作為起點進行修改</CardDescription>
                          </div>
                        </label>
                      </CardHeader>
                    </Card>
                    <Card className="rounded-2xl cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <RadioGroupItem value="create" id="create" className="sr-only" />
                        <label htmlFor="create" className="flex items-center gap-4 w-full">
                          <FileEdit className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-base">從空白建立</CardTitle>
                            <CardDescription>使用線上編輯器建立新模板</CardDescription>
                          </div>
                        </label>
                      </CardHeader>
                    </Card>
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Publish Settings */}
              {dialogStep === 3 && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">狀態</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="draft">草稿</SelectItem>
                        <SelectItem value="published">已發布</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="visibility">可見範圍</Label>
                    <Select defaultValue="team">
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="team">全團隊</SelectItem>
                        <SelectItem value="project">僅專案</SelectItem>
                        <SelectItem value="private">私有</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify" />
                    <Label htmlFor="notify" className="text-sm font-normal">
                      通知團隊成員新模板已發布
                    </Label>
                  </div>
                </div>
              )}

              <DialogFooter>
                {dialogStep > 1 && (
                  <Button variant="outline" onClick={handlePrevStep} className="rounded-2xl bg-transparent">
                    上一步
                  </Button>
                )}
                {dialogStep < 3 ? (
                  <Button onClick={handleNextStep} className="rounded-2xl">
                    下一步
                  </Button>
                ) : (
                  <Button onClick={handleDialogClose} className="rounded-2xl">
                    建立模板
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜尋模板名稱、描述..."
              className="pl-10 rounded-2xl bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 rounded-2xl bg-background border-input">
                <SelectValue placeholder="分類" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">所有分類</SelectItem>
                <SelectItem value="技術類">技術類</SelectItem>
                <SelectItem value="工程類">工程類</SelectItem>
                <SelectItem value="維運類">維運類</SelectItem>
                <SelectItem value="資安類">資安類</SelectItem>
                <SelectItem value="管理類">管理類</SelectItem>
                <SelectItem value="簡報類">簡報類</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-40 rounded-2xl bg-background border-input">
                <SelectValue placeholder="格式" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">所有格式</SelectItem>
                <SelectItem value="DOCX">DOCX</SelectItem>
                <SelectItem value="PPTX">PPTX</SelectItem>
                <SelectItem value="章節片段">章節片段</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="w-40 rounded-2xl bg-background border-input">
                <SelectValue placeholder="適用情境" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">所有情境</SelectItem>
                <SelectItem value="新建置">新建置</SelectItem>
                <SelectItem value="維運">維運</SelectItem>
                <SelectItem value="資安">資安</SelectItem>
                <SelectItem value="雲">雲</SelectItem>
                <SelectItem value="網路">網路</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 rounded-2xl bg-background border-input">
                <SelectValue placeholder="狀態" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">所有狀態</SelectItem>
                <SelectItem value="草稿">草稿</SelectItem>
                <SelectItem value="已發布">已發布</SelectItem>
                <SelectItem value="已封存">已封存</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 rounded-2xl bg-background border-input">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="updated">最新更新</SelectItem>
                <SelectItem value="downloads">最多下載</SelectItem>
                <SelectItem value="applied">最常套用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>共 {filteredTemplates.length} 個模板</span>
            {(selectedCategory !== "all" ||
              selectedFormat !== "all" ||
              selectedScenario !== "all" ||
              selectedStatus !== "all" ||
              searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedFormat("all")
                  setSelectedScenario("all")
                  setSelectedStatus("all")
                  setSearchQuery("")
                }}
                className="rounded-2xl"
              >
                清除篩選
              </Button>
            )}
          </div>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <Skeleton className="h-12 w-12 rounded-2xl mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 flex-1 rounded-2xl" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="找不到符合的模板"
            description="請嘗試調整搜尋條件或篩選器，或建立一個新的模板"
            action={{
              label: "新增模板",
              onClick: () => setIsDialogOpen(true),
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="rounded-2xl shadow-sm border-2 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
                onClick={() => handleTemplateClick(template)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="rounded-2xl bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl">
                        <DropdownMenuItem>查看詳情</DropdownMenuItem>
                        <DropdownMenuItem>套用到專案</DropdownMenuItem>
                        <DropdownMenuItem>管理版本</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>複製模板</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">封存</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg leading-tight text-balance">{template.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 text-balance">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="rounded-full">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="rounded-full font-mono text-xs">
                      {template.version}
                    </Badge>
                    {template.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{template.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileCheck className="h-3 w-3" />
                        <span>{template.appliedCount}</span>
                      </div>
                    </div>
                    <span>{template.updatedAt}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-2xl bg-background hover:bg-accent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Copy className="mr-2 h-3 w-3" />
                    複製
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 rounded-2xl bg-primary hover:bg-primary/90"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    下載
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-2xl ${template.isStarred ? "text-yellow-500" : ""}`}
                    onClick={(e) => handleStarToggle(template.id, e)}
                  >
                    <Star className={`h-4 w-4 ${template.isStarred ? "fill-current" : ""}`} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <TemplateDetailDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} template={selectedTemplate} />
    </AppShell>
  )
}
