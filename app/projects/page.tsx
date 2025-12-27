"use client"

import * as React from "react"
import { AppShell } from "@/components/app-shell"
import { StatusBadge, type StatusType } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import { FolderKanban } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import Link from "next/link"

interface Project {
  id: string
  name: string
  agency: string
  status: StatusType
  budget: string
  deadline: string
  progress: number
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const projects: Project[] = [
    {
      id: "P001",
      name: "台北市政府智慧交通系統建置案",
      agency: "台北市政府",
      status: "active",
      budget: "NT$ 25,000,000",
      deadline: "2024-03-15",
      progress: 65,
    },
    {
      id: "P002",
      name: "交通部公路局道路養護標案",
      agency: "交通部公路局",
      status: "review",
      budget: "NT$ 18,500,000",
      deadline: "2024-01-20",
      progress: 90,
    },
    {
      id: "P003",
      name: "高雄市政府環保專案管理系統",
      agency: "高雄市政府",
      status: "approved",
      budget: "NT$ 12,300,000",
      deadline: "2024-02-28",
      progress: 100,
    },
    {
      id: "P004",
      name: "台中市政府數位轉型計畫",
      agency: "台中市政府",
      status: "draft",
      budget: "NT$ 30,000,000",
      deadline: "2024-01-25",
      progress: 35,
    },
    {
      id: "P005",
      name: "新北市政府社會福利系統升級",
      agency: "新北市政府",
      status: "active",
      budget: "NT$ 15,800,000",
      deadline: "2024-04-10",
      progress: 45,
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.agency.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AppShell breadcrumbs={[{ label: "首頁", href: "/" }, { label: "投標專案" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">投標專案</h1>
            <p className="text-muted-foreground">管理所有政府機關投標專案</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                新增專案
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>新增投標專案</DialogTitle>
                <DialogDescription>填寫專案基本資訊，建立新的投標案件</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">專案名稱</Label>
                  <Input id="project-name" placeholder="輸入專案名稱" className="rounded-2xl" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="agency">機關單位</Label>
                  <Input id="agency" placeholder="輸入機關名稱" className="rounded-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="budget">預算金額</Label>
                    <Input id="budget" placeholder="NT$ 0" className="rounded-2xl" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">截止日期</Label>
                    <Input id="deadline" type="date" className="rounded-2xl" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">專案描述</Label>
                  <Textarea id="description" placeholder="輸入專案詳細描述" className="rounded-2xl min-h-[100px]" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl">
                  取消
                </Button>
                <Button onClick={() => setIsDialogOpen(false)} className="rounded-2xl">
                  建立專案
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜尋專案名稱、機關單位..."
              className="pl-10 rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-2xl">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="狀態篩選" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="all">全部狀態</SelectItem>
              <SelectItem value="draft">草稿</SelectItem>
              <SelectItem value="active">進行中</SelectItem>
              <SelectItem value="review">審核中</SelectItem>
              <SelectItem value="approved">已核准</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-2xl bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            匯出
          </Button>
        </div>

        {/* Table */}
        {filteredProjects.length > 0 ? (
          <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">專案編號</TableHead>
                  <TableHead className="font-semibold">專案名稱</TableHead>
                  <TableHead className="font-semibold">機關單位</TableHead>
                  <TableHead className="font-semibold">預算</TableHead>
                  <TableHead className="font-semibold">截止日期</TableHead>
                  <TableHead className="font-semibold">狀態</TableHead>
                  <TableHead className="font-semibold">進度</TableHead>
                  <TableHead className="text-right font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{project.id}</TableCell>
                    <TableCell className="font-medium max-w-[300px]">
                      <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                        <div className="truncate text-balance">{project.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.agency}</TableCell>
                    <TableCell className="font-medium">{project.budget}</TableCell>
                    <TableCell className="text-sm">{project.deadline}</TableCell>
                    <TableCell>
                      <StatusBadge status={project.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-10 text-right">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                          <DropdownMenuItem asChild>
                            <Link href={`/projects/${project.id}`}>檢視詳情</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>編輯專案</DropdownMenuItem>
                          <DropdownMenuItem>下載文件</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">刪除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={FolderKanban}
            title="找不到專案"
            description="目前沒有符合條件的專案，請調整篩選條件或新增專案"
            action={{ label: "新增專案", onClick: () => setIsDialogOpen(true) }}
          />
        )}

        {/* Pagination */}
        {filteredProjects.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              顯示 1 至 {filteredProjects.length} 筆，共 {projects.length} 筆
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="rounded-2xl bg-transparent">
                上一頁
              </Button>
              <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                下一頁
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
