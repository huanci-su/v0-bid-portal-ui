"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  FileCheck,
  FileText,
  Clock,
  User,
  Tag,
  Shield,
  History,
  GitCompare,
  RotateCcw,
  Search,
  CheckCircle2,
  Users,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

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
  permissions?: {
    viewers: string[]
    editors: string[]
    owner: string
  }
}

interface TemplateDetailDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: Template | null
}

// Mock 專案資料
const mockProjects = [
  { id: "1", name: "衛福部醫療資訊系統建置案", code: "MOHW-2024-IT-001" },
  { id: "2", name: "交通部智慧運輸平台開發", code: "MOTC-2024-DEV-023" },
  { id: "3", name: "內政部戶政系統升級維護", code: "MOI-2024-SYS-045" },
  { id: "4", name: "經濟部工業局數位轉型專案", code: "IDB-2024-DX-012" },
  { id: "5", name: "教育部校園雲端服務建置", code: "MOE-2024-CLD-008" },
]

export function TemplateDetailDrawer({ open, onOpenChange, template }: TemplateDetailDrawerProps) {
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [compareDialogOpen, setCompareDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState("")
  const [applyMethod, setApplyMethod] = useState("copy")
  const [selectedVersion, setSelectedVersion] = useState("latest")
  const [projectSearch, setProjectSearch] = useState("")
  const [compareVersions, setCompareVersions] = useState<{
    v1: string
    v2: string
  }>({ v1: "", v2: "" })
  const { toast } = useToast()

  if (!template) return null

  const statusColors = {
    草稿: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    已發布: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    已封存: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  }

  const handleApply = () => {
    const project = mockProjects.find((p) => p.id === selectedProject)
    if (!project) return

    toast({
      title: "套用成功",
      description: `模板「${template.name}」已成功套用到專案「${project.name}」`,
    })
    setApplyDialogOpen(false)
    setSelectedProject("")
    setApplyMethod("copy")
    setSelectedVersion("latest")
  }

  const handleDownloadVersion = (version: string) => {
    toast({
      title: "下載開始",
      description: `正在下載版本 ${version}`,
    })
  }

  const handleRevertVersion = (version: string) => {
    toast({
      title: "回復確認",
      description: `版本 ${version} 已回復為最新版本`,
    })
  }

  const handleCompare = (v1: string, v2: string) => {
    setCompareVersions({ v1, v2 })
    setCompareDialogOpen(true)
  }

  const filteredProjects = mockProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(projectSearch.toLowerCase()),
  )

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <SheetTitle className="text-2xl leading-tight">{template.name}</SheetTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    v{template.version}
                  </Badge>
                  <Badge className={cn("rounded-full", statusColors[template.status])}>{template.status}</Badge>
                  <Badge variant="secondary" className="rounded-full">
                    {template.format}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setApplyDialogOpen(true)} className="flex-1">
                <FileCheck className="mr-2 h-4 w-4" />
                套用到專案
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast({
                    title: "下載開始",
                    description: `正在下載「${template.name}」`,
                  })
                }
              >
                <Download className="mr-2 h-4 w-4" />
                下載
              </Button>
            </div>
          </SheetHeader>

          <Separator className="my-6" />

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">概覽</TabsTrigger>
              <TabsTrigger value="preview">預覽</TabsTrigger>
              <TabsTrigger value="versions">版本</TabsTrigger>
              <TabsTrigger value="permissions">權限</TabsTrigger>
            </TabsList>

            {/* 概覽 Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    描述
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">分類：</span>
                      <span className="font-medium">{template.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">更新：</span>
                      <span className="font-medium">{template.updatedAt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">更新者：</span>
                      <span className="font-medium">{template.updatedBy}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">下載數：</span>
                      <span className="font-medium">{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">套用數：</span>
                      <span className="font-medium">{template.appliedCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">可見範圍：</span>
                      <span className="font-medium">{template.visibility}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    標籤
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">適用情境</h3>
                  <ul className="space-y-1">
                    {template.scenario.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* 預覽 Tab */}
            <TabsContent value="preview" className="space-y-6">
              {template.content ? (
                <>
                  <div>
                    <h3 className="text-sm font-semibold mb-3">章節大綱</h3>
                    <div className="space-y-2">
                      {template.content.sections.map((section, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                            {i + 1}
                          </div>
                          <span className="text-sm">{section}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-3">建議對應 RFP 條款</h3>
                    <div className="space-y-2">
                      {template.content.rfpClauses.map((clause, i) => (
                        <div key={i} className="p-3 rounded-xl border bg-muted/50 text-sm">
                          {clause}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">暫無預覽內容</p>
                </div>
              )}
            </TabsContent>

            {/* 版本 Tab */}
            <TabsContent value="versions" className="space-y-4">
              {template.versions && template.versions.length > 0 ? (
                <div className="border rounded-2xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>版本</TableHead>
                        <TableHead>更新日期</TableHead>
                        <TableHead>更新者</TableHead>
                        <TableHead>變更摘要</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {template.versions.map((v, idx) => (
                        <TableRow key={v.version}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant={idx === 0 ? "default" : "outline"} className="rounded-full">
                                v{v.version}
                              </Badge>
                              {idx === 0 && (
                                <Badge variant="secondary" className="rounded-full text-xs">
                                  最新
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{v.date}</TableCell>
                          <TableCell className="text-sm">{v.author}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{v.changes}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleDownloadVersion(v.version)}>
                                <Download className="h-4 w-4" />
                              </Button>
                              {idx > 0 && (
                                <>
                                  <Button variant="ghost" size="sm" onClick={() => handleRevertVersion(v.version)}>
                                    <RotateCcw className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCompare(template.versions![0].version, v.version)}
                                  >
                                    <GitCompare className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <History className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">暫無版本記錄</p>
                </div>
              )}
            </TabsContent>

            {/* 權限 Tab */}
            <TabsContent value="permissions" className="space-y-6">
              {template.permissions ? (
                <>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      擁有者
                    </h3>
                    <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{template.permissions.owner}</p>
                        <p className="text-xs text-muted-foreground">完整控制權限</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      可編輯（{template.permissions.editors.length}）
                    </h3>
                    <div className="space-y-2">
                      {template.permissions.editors.map((editor) => (
                        <div key={editor} className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{editor}</p>
                            <p className="text-xs text-muted-foreground">可編輯和套用模板</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      可檢視（{template.permissions.viewers.length}）
                    </h3>
                    <div className="space-y-2">
                      {template.permissions.viewers.map((viewer) => (
                        <div key={viewer} className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{viewer}</p>
                            <p className="text-xs text-muted-foreground">僅可檢視和下載</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">暫無權限資訊</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* 套用到專案 Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>套用模板到專案</DialogTitle>
            <DialogDescription>將「{template.name}」套用到您的專案中</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label>選擇專案</Label>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋專案名稱或代碼..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="請選擇專案" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{project.name}</span>
                            <span className="text-xs text-muted-foreground">{project.code}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-sm text-muted-foreground text-center">找不到符合的專案</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>套用方式</Label>
              <RadioGroup value={applyMethod} onValueChange={setApplyMethod}>
                <div className="flex items-start space-x-3 p-3 rounded-xl border bg-card hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="copy" id="copy" className="mt-0.5" />
                  <Label htmlFor="copy" className="flex-1 cursor-pointer">
                    <div className="font-medium">建立副本</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      在專案中建立模板的獨立副本，後續修改不影響原模板
                    </p>
                  </Label>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-xl border bg-card hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="reference" id="reference" className="mt-0.5" />
                  <Label htmlFor="reference" className="flex-1 cursor-pointer">
                    <div className="font-medium">直接引用</div>
                    <p className="text-xs text-muted-foreground mt-1">引用原模板，模板更新時專案內容也會同步更新</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>選擇版本</Label>
              <RadioGroup value={selectedVersion} onValueChange={setSelectedVersion}>
                <div className="flex items-center space-x-3 p-3 rounded-xl border bg-card">
                  <RadioGroupItem value="latest" id="latest" />
                  <Label htmlFor="latest" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">最新版本</span>
                      <Badge variant="secondary" className="rounded-full">
                        v{template.version}
                      </Badge>
                    </div>
                  </Label>
                </div>
                {template.versions && template.versions.length > 1 && (
                  <div className="flex items-center space-x-3 p-3 rounded-xl border bg-card">
                    <RadioGroupItem value="specific" id="specific" />
                    <Label htmlFor="specific" className="flex-1 cursor-pointer">
                      <span className="font-medium">指定版本</span>
                    </Label>
                  </div>
                )}
              </RadioGroup>
              {selectedVersion === "specific" && template.versions && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇版本" />
                  </SelectTrigger>
                  <SelectContent>
                    {template.versions.map((v) => (
                      <SelectItem key={v.version} value={v.version}>
                        v{v.version} - {v.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleApply} disabled={!selectedProject}>
              確認套用
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 版本比較 Dialog */}
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>版本比較</DialogTitle>
            <DialogDescription>
              比較版本 v{compareVersions.v1} 與 v{compareVersions.v2} 的差異
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-2 gap-4">
              {/* 左側：新版本 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Badge className="rounded-full">v{compareVersions.v1}</Badge>
                  <span className="text-sm font-medium">較新版本</span>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                    <h4 className="text-sm font-semibold mb-2 text-green-900 dark:text-green-100">新增章節</h4>
                    <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                      <li>+ 5.4 資安防護機制說明</li>
                      <li>+ 6.2 緊急應變流程</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                    <h4 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">修改內容</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>~ 3.1 系統架構圖更新為最新版</li>
                      <li>~ 4.3 測試計畫增加效能測試項目</li>
                      <li>~ 附件一：公司簡介更新為 2024 版</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-muted border">
                    <h4 className="text-sm font-semibold mb-2">維持不變</h4>
                    <p className="text-sm text-muted-foreground">其餘 18 個章節內容維持相同</p>
                  </div>
                </div>
              </div>

              {/* 右側：舊版本 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Badge variant="outline" className="rounded-full">
                    v{compareVersions.v2}
                  </Badge>
                  <span className="text-sm font-medium">較舊版本</span>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                    <h4 className="text-sm font-semibold mb-2 text-red-900 dark:text-red-100">移除章節</h4>
                    <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
                      <li>- 4.5 舊版測試流程（已整併）</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                    <h4 className="text-sm font-semibold mb-2 text-amber-900 dark:text-amber-100">過時內容</h4>
                    <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
                      <li>○ 3.1 系統架構圖（2023 版）</li>
                      <li>○ 附件一：公司簡介（2023 版）</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-muted border">
                    <h4 className="text-sm font-semibold mb-2">統計資訊</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">總章節數</span>
                        <span className="font-medium">21 個</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">文件頁數</span>
                        <span className="font-medium">45 頁</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">最後更新</span>
                        <span className="font-medium">2024-01-15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">變更摘要</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">2</div>
                  <div className="text-xs text-green-700 dark:text-green-300 mt-1">新增</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">修改</div>
                </div>
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">1</div>
                  <div className="text-xs text-red-700 dark:text-red-300 mt-1">刪除</div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCompareDialogOpen(false)}>
              關閉
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
