"use client"

import * as React from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Search,
  Filter,
  Download,
  Archive,
  FolderInput,
  FileText,
  Presentation,
  HelpCircle,
  File,
  Eye,
  X,
  ExternalLink,
  Clock,
  User,
  Tag,
} from "lucide-react"

interface AssetLibraryItem {
  id: string
  name: string
  type: "rfp" | "proposal" | "presentation" | "qa" | "evidence"
  project: string
  projectId: string
  version: string
  updatedBy: string
  updatedDate: string
  permission: "public" | "team" | "private"
  tags: string[]
  size: string
  source?: {
    generatedBy?: string
    sourceFiles?: string[]
    generatedDate?: string
  }
}

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<string>("all")
  const [selectedAssets, setSelectedAssets] = React.useState<string[]>([])
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedAsset, setSelectedAsset] = React.useState<AssetLibraryItem | null>(null)

  const assets: AssetLibraryItem[] = [
    {
      id: "AST001",
      name: "台北市智慧交通系統_RFP文件_v1.2",
      type: "rfp",
      project: "台北市政府智慧交通系統",
      projectId: "P001",
      version: "1.2",
      updatedBy: "王小明",
      updatedDate: "2024-01-15",
      permission: "team",
      tags: ["交通", "智慧城市", "政府標案"],
      size: "2.5 MB",
      source: {
        sourceFiles: ["原始招標文件.pdf", "補充說明.docx"],
      },
    },
    {
      id: "AST002",
      name: "智慧交通系統技術建議書_完整版",
      type: "proposal",
      project: "台北市政府智慧交通系統",
      projectId: "P001",
      version: "3.0",
      updatedBy: "李美華",
      updatedDate: "2024-01-14",
      permission: "private",
      tags: ["技術提案", "AI生成", "完整版"],
      size: "8.7 MB",
      source: {
        generatedBy: "AI Generator v2.1",
        sourceFiles: ["RFP_v1.2", "歷史案例庫", "技術規範模板"],
        generatedDate: "2024-01-14 14:30",
      },
    },
    {
      id: "AST003",
      name: "交通系統簡報_評選會用",
      type: "presentation",
      project: "台北市政府智慧交通系統",
      projectId: "P001",
      version: "2.1",
      updatedBy: "陳志強",
      updatedDate: "2024-01-13",
      permission: "team",
      tags: ["簡報", "評選會", "視覺化"],
      size: "15.3 MB",
      source: {
        generatedBy: "Slide Generator",
        generatedDate: "2024-01-13 09:15",
      },
    },
    {
      id: "AST004",
      name: "Q&A問答集_評選委員可能提問",
      type: "qa",
      project: "台北市政府智慧交通系統",
      projectId: "P001",
      version: "1.0",
      updatedBy: "林雅婷",
      updatedDate: "2024-01-12",
      permission: "team",
      tags: ["Q&A", "評選準備", "AI生成"],
      size: "1.2 MB",
      source: {
        generatedBy: "QA Generator",
        sourceFiles: ["RFP分析", "歷史Q&A庫"],
        generatedDate: "2024-01-12 16:45",
      },
    },
    {
      id: "AST005",
      name: "公司資格證明文件_ISO27001",
      type: "evidence",
      project: "台北市政府智慧交通系統",
      projectId: "P001",
      version: "1.0",
      updatedBy: "黃志明",
      updatedDate: "2024-01-10",
      permission: "public",
      tags: ["資格證明", "ISO", "公司文件"],
      size: "3.4 MB",
    },
    {
      id: "AST006",
      name: "道路養護標案_需求規格書",
      type: "rfp",
      project: "交通部公路局道路養護標案",
      projectId: "P002",
      version: "1.0",
      updatedBy: "王小明",
      updatedDate: "2024-01-08",
      permission: "team",
      tags: ["道路", "養護", "RFP"],
      size: "1.8 MB",
    },
    {
      id: "AST007",
      name: "環保專案技術建議書_初稿",
      type: "proposal",
      project: "高雄市政府環保專案",
      projectId: "P003",
      version: "1.5",
      updatedBy: "李美華",
      updatedDate: "2024-01-05",
      permission: "private",
      tags: ["環保", "草稿", "待審核"],
      size: "6.2 MB",
      source: {
        generatedBy: "AI Generator v2.1",
        generatedDate: "2024-01-05 11:20",
      },
    },
    {
      id: "AST008",
      name: "過往得標案例_參考簡報",
      type: "presentation",
      project: "台中市政府數位轉型",
      projectId: "P004",
      version: "1.0",
      updatedBy: "陳志強",
      updatedDate: "2024-01-03",
      permission: "public",
      tags: ["案例", "參考", "成功案例"],
      size: "22.5 MB",
    },
  ]

  const assetTypeConfig = {
    rfp: { label: "RFP", icon: FileText, color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
    proposal: {
      label: "建議書",
      icon: File,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
    presentation: {
      label: "簡報",
      icon: Presentation,
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    qa: {
      label: "Q&A",
      icon: HelpCircle,
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    },
    evidence: {
      label: "佐證",
      icon: FileText,
      color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
  }

  const permissionConfig = {
    public: { label: "公開", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
    team: { label: "團隊", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
    private: { label: "私密", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || asset.type === typeFilter
    return matchesSearch && matchesType
  })

  const toggleAssetSelection = (id: string) => {
    setSelectedAssets((prev) => (prev.includes(id) ? prev.filter((assetId) => assetId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([])
    } else {
      setSelectedAssets(filteredAssets.map((a) => a.id))
    }
  }

  const openAssetDrawer = (asset: AssetLibraryItem) => {
    setSelectedAsset(asset)
    setDrawerOpen(true)
  }

  return (
    <AppShell breadcrumbs={[{ label: "首頁", href: "/" }, { label: "歷年資料庫" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">歷年資料庫</h1>
            <p className="text-muted-foreground">集中管理所有專案產出文件與佐證資料</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜尋檔案名稱、專案、標籤..."
              className="pl-10 rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-[200px] rounded-2xl">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="檔案類型" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">全部類型</SelectItem>
                <SelectItem value="rfp">RFP</SelectItem>
                <SelectItem value="proposal">建議書</SelectItem>
                <SelectItem value="presentation">簡報</SelectItem>
                <SelectItem value="qa">Q&A</SelectItem>
                <SelectItem value="evidence">佐證</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedAssets.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl bg-primary/10 dark:bg-primary/20 p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">已選取 {selectedAssets.length} 項</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAssets([])} className="h-8 rounded-xl">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                下載
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                <FolderInput className="mr-2 h-4 w-4" />
                移動
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                <Archive className="mr-2 h-4 w-4" />
                封存
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-2xl border bg-card shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedAssets.length === filteredAssets.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>名稱</TableHead>
                <TableHead>類型</TableHead>
                <TableHead>專案</TableHead>
                <TableHead>版本</TableHead>
                <TableHead>更新者</TableHead>
                <TableHead>更新日期</TableHead>
                <TableHead>權限</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => {
                const TypeIcon = assetTypeConfig[asset.type].icon
                return (
                  <TableRow key={asset.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedAssets.includes(asset.id)}
                        onCheckedChange={() => toggleAssetSelection(asset.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`rounded-xl p-2 ${assetTypeConfig[asset.type].color}`}>
                          <TypeIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`rounded-full ${assetTypeConfig[asset.type].color}`}>
                        {assetTypeConfig[asset.type].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-[200px] truncate" title={asset.project}>
                        {asset.project}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full font-mono text-xs">
                        v{asset.version}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{asset.updatedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {asset.updatedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`rounded-full text-xs ${permissionConfig[asset.permission].color}`}>
                        {permissionConfig[asset.permission].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl"
                          onClick={() => openAssetDrawer(asset)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Summary stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">總資產數</div>
            <div className="text-2xl font-bold">{assets.length}</div>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">本月新增</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">儲存空間</div>
            <div className="text-2xl font-bold">68.7 GB</div>
          </div>
        </div>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          {selectedAsset && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{selectedAsset.name}</SheetTitle>
                <SheetDescription>資產詳細資訊與引用來源</SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                {/* Basic info */}
                <div className="rounded-2xl border bg-card p-5 space-y-4">
                  <h3 className="font-semibold text-lg mb-3">基本資訊</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">檔案類型</div>
                      <Badge className={`rounded-full ${assetTypeConfig[selectedAsset.type].color}`}>
                        {assetTypeConfig[selectedAsset.type].label}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">版本</div>
                      <Badge variant="outline" className="rounded-full font-mono">
                        v{selectedAsset.version}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">檔案大小</div>
                      <div className="text-sm font-medium">{selectedAsset.size}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">權限</div>
                      <Badge className={`rounded-full ${permissionConfig[selectedAsset.permission].color}`}>
                        {permissionConfig[selectedAsset.permission].label}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">關聯專案</div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {selectedAsset.project}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">標籤</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAsset.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="rounded-full">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Update history */}
                <div className="rounded-2xl border bg-card p-5 space-y-3">
                  <h3 className="font-semibold text-lg">更新記錄</h3>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{selectedAsset.updatedBy}</div>
                      <div className="text-xs text-muted-foreground">最後更新於 {selectedAsset.updatedDate}</div>
                    </div>
                  </div>
                </div>

                {/* Source information */}
                {selectedAsset.source && (
                  <div className="rounded-2xl border bg-card p-5 space-y-4">
                    <h3 className="font-semibold text-lg">引用來源</h3>

                    {selectedAsset.source.generatedBy && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">生成工具</div>
                        <Badge variant="outline" className="rounded-full">
                          {selectedAsset.source.generatedBy}
                        </Badge>
                      </div>
                    )}

                    {selectedAsset.source.generatedDate && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">生成時間</div>
                        <div className="text-sm font-medium">{selectedAsset.source.generatedDate}</div>
                      </div>
                    )}

                    {selectedAsset.source.sourceFiles && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-3">來源檔案</div>
                        <div className="space-y-2">
                          {selectedAsset.source.sourceFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 rounded-xl border bg-background p-3 hover:bg-muted/50 transition-colors"
                            >
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm flex-1">{file}</span>
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 rounded-2xl">
                    <Eye className="mr-2 h-4 w-4" />
                    預覽檔案
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-2xl bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    下載
                  </Button>
                  <Button variant="outline" className="rounded-2xl bg-transparent">
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  )
}
