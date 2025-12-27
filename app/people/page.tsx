"use client"

import * as React from "react"
import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Mail,
  Phone,
  Award,
  Briefcase,
  MoreVertical,
  UserPlus,
  Download,
  Grid3x3,
  List,
  Star,
  Filter,
  X,
  Clock,
  Copy,
  Plus,
  Sparkles,
  Info,
  Check,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { SkillsMatrix } from "@/components/skills-matrix"

interface Person {
  id: string
  name: string
  title: string
  role: string[]
  department: string
  email: string
  phone: string
  experience: number
  skills: string[]
  certifications: Array<{
    name: string
    expires?: string
  }>
  projects: number
  bidCount: number
  winCount: number
  rating: number
  availability: "available" | "partial" | "busy"
  avatar: string
  isStarred: boolean
  updatedAt: string
  bio?: string
  tools?: string[]
  languages?: string[]
  location?: string
  recentProjects?: Array<{
    id: string
    name: string
    role: string
    contribution: string
  }>
}

interface Snippet {
  id: string
  title: string
  content: string
  tags: string[]
  updatedAt: string
}

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid")
  const [selectedPerson, setSelectedPerson] = React.useState<Person | null>(null)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = React.useState(false) // Added for "Add Member" dialog

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = React.useState<string[]>([])
  const [selectedCerts, setSelectedCerts] = React.useState<string[]>([])
  const [activeTab, setActiveTab] = React.useState<"members" | "matrix">("members")
  const [selectedSnippet, setSelectedSnippet] = useState<any>(null)
  const [isAddSnippetDialogOpen, setIsAddSnippetDialogOpen] = useState(false)
  const [snippetProject, setSnippetProject] = useState("")
  const [snippetChapter, setSnippetChapter] = useState("")

  const people: Person[] = [
    {
      id: "M001",
      name: "王建國",
      title: "資深專案經理",
      role: ["PM", "顧問"],
      department: "專案管理部",
      email: "wang.jianguo@company.com",
      phone: "0912-345-678",
      experience: 12,
      skills: ["政府標案", "RFP 撰寫", "專案管理", "利害關係人管理", "風險控管"],
      certifications: [{ name: "PMP", expires: "2025-12-31" }, { name: "ITIL v4" }, { name: "ISO27001 LA" }],
      projects: 28,
      bidCount: 45,
      winCount: 32,
      rating: 4.8,
      availability: "available",
      avatar: "王",
      isStarred: true,
      updatedAt: "2024-12-10",
      bio: "擁有12年政府專案經驗，熟悉各部會標案流程與評選重點",
      tools: ["MS Project", "Jira", "Confluence"],
      languages: ["中文", "英文"],
      location: "台北",
      recentProjects: [
        { id: "P001", name: "衛福部健保資料分析平台", role: "專案經理", contribution: "專案管理計畫、進度控管" },
        { id: "P002", name: "經濟部產業數位轉型", role: "PM", contribution: "RFP 章節撰寫、簡報製作" },
      ],
    },
    {
      id: "M002",
      name: "陳雅婷",
      title: "系統架構師",
      role: ["架構", "開發"],
      department: "技術研發部",
      email: "chen.yating@company.com",
      phone: "0923-456-789",
      experience: 10,
      skills: ["雲端架構", "微服務", "DevOps", "容器化", "CI/CD"],
      certifications: [
        { name: "AWS Solution Architect Professional" },
        { name: "Azure Solutions Architect Expert" },
        { name: "GCP Professional Cloud Architect" },
      ],
      projects: 22,
      bidCount: 30,
      winCount: 24,
      rating: 4.9,
      availability: "partial",
      avatar: "陳",
      isStarred: true,
      updatedAt: "2024-12-08",
      bio: "專精雲端原生架構設計，曾主導多個大型政府系統上雲專案",
      tools: ["Kubernetes", "Docker", "Terraform", "Jenkins"],
      languages: ["中文", "英文"],
      location: "台北",
      recentProjects: [
        { id: "P003", name: "數位發展部雲端平台", role: "架構師", contribution: "系統架構設計、技術規格書" },
      ],
    },
    {
      id: "M003",
      name: "林志明",
      title: "資安專家",
      role: ["資安", "顧問"],
      department: "資訊安全部",
      email: "lin.zhiming@company.com",
      phone: "0934-567-890",
      experience: 15,
      skills: ["資安稽核", "滲透測試", "ISO27001", "個資保護", "ISMS"],
      certifications: [
        { name: "ISO27001 LA", expires: "2025-06-30" },
        { name: "CEH" },
        { name: "CISSP" },
        { name: "個資管理師" },
      ],
      projects: 35,
      bidCount: 48,
      winCount: 38,
      rating: 4.7,
      availability: "available",
      avatar: "林",
      isStarred: false,
      updatedAt: "2024-12-12",
      bio: "15年資安實戰經驗，協助多個政府機關建置資安管理制度",
      tools: ["Nessus", "Burp Suite", "Metasploit"],
      languages: ["中文", "英文", "日文"],
      location: "新北",
      recentProjects: [
        { id: "P004", name: "教育部資安管理制度建置", role: "資安顧問", contribution: "ISMS 文件、資安章節" },
      ],
    },
    {
      id: "M004",
      name: "張美玲",
      title: "網路工程師",
      role: ["網路", "維運"],
      department: "網路維運部",
      email: "zhang.meiling@company.com",
      phone: "0945-678-901",
      experience: 8,
      skills: ["網路規劃", "防火牆", "VPN", "SD-WAN", "負載平衡"],
      certifications: [{ name: "CCNP", expires: "2025-03-15" }, { name: "CCIE Written" }, { name: "Fortinet NSE4" }],
      projects: 18,
      bidCount: 25,
      winCount: 19,
      rating: 4.6,
      availability: "busy",
      avatar: "張",
      isStarred: false,
      updatedAt: "2024-12-09",
      bio: "專長網路架構設計與維運管理，熟悉政府機關網路規範",
      tools: ["Cisco", "Fortinet", "F5"],
      languages: ["中文", "英文"],
      location: "台北",
      recentProjects: [
        { id: "P005", name: "交通部網路架構優化", role: "網路工程師", contribution: "網路架構圖、設備規格" },
      ],
    },
    {
      id: "M005",
      name: "黃俊傑",
      title: "資深開發工程師",
      role: ["開發", "架構"],
      department: "技術研發部",
      email: "huang.junjie@company.com",
      phone: "0956-789-012",
      experience: 9,
      skills: ["Java", "Spring Boot", "React", "PostgreSQL", "API 設計"],
      certifications: [{ name: "Oracle Certified Professional" }, { name: "Spring Professional" }],
      projects: 20,
      bidCount: 28,
      winCount: 22,
      rating: 4.5,
      availability: "available",
      avatar: "黃",
      isStarred: true,
      updatedAt: "2024-12-11",
      bio: "全端開發經驗豐富，擅長政府系統開發與維護",
      tools: ["IntelliJ", "VS Code", "Git", "Maven"],
      languages: ["中文", "英文"],
      location: "台北",
      recentProjects: [
        { id: "P006", name: "內政部民眾服務平台", role: "後端工程師", contribution: "API 開發、資料庫設計" },
      ],
    },
    {
      id: "M006",
      name: "劉雅文",
      title: "維運經理",
      role: ["維運", "PM"],
      department: "維運服務部",
      email: "liu.yawen@company.com",
      phone: "0967-890-123",
      experience: 11,
      skills: ["維運管理", "SLA", "ITIL", "監控告警", "問題管理"],
      certifications: [{ name: "ITIL v4 Managing Professional" }, { name: "ISO20000 LA", expires: "2025-09-30" }],
      projects: 26,
      bidCount: 35,
      winCount: 28,
      rating: 4.7,
      availability: "partial",
      avatar: "劉",
      isStarred: false,
      updatedAt: "2024-12-07",
      bio: "專精維運服務管理，熟悉政府維運標案需求",
      tools: ["Zabbix", "Grafana", "ServiceNow"],
      languages: ["中文"],
      location: "台北",
      recentProjects: [
        { id: "P007", name: "財政部系統維運服務", role: "維運經理", contribution: "維運計畫、SLA 規劃" },
      ],
    },
    {
      id: "M007",
      name: "吳承翰",
      title: "技術顧問",
      role: ["顧問", "架構"],
      department: "顧問服務部",
      email: "wu.chenghan@company.com",
      phone: "0978-901-234",
      experience: 18,
      skills: ["數位轉型", "IT 策略", "企業架構", "技術諮詢", "RFP 審查"],
      certifications: [{ name: "TOGAF 9.2" }, { name: "COBIT 5" }, { name: "CBAP" }],
      projects: 42,
      bidCount: 55,
      winCount: 44,
      rating: 4.9,
      availability: "busy",
      avatar: "吳",
      isStarred: true,
      updatedAt: "2024-12-13",
      bio: "18年技術顧問經驗，參與多項國家級數位轉型專案",
      tools: ["EA Tools", "Visio", "PowerPoint"],
      languages: ["中文", "英文", "日文"],
      location: "台北",
      recentProjects: [
        { id: "P008", name: "行政院數位治理架構", role: "技術顧問", contribution: "策略建議、架構藍圖" },
      ],
    },
    {
      id: "M008",
      name: "周欣怡",
      title: "前端工程師",
      role: ["開發"],
      department: "技術研發部",
      email: "zhou.xinyi@company.com",
      phone: "0989-012-345",
      experience: 5,
      skills: ["React", "TypeScript", "UI/UX", "響應式設計", "無障礙網頁"],
      certifications: [{ name: "Google UX Design Professional" }],
      projects: 12,
      bidCount: 15,
      winCount: 11,
      rating: 4.4,
      availability: "available",
      avatar: "周",
      isStarred: false,
      updatedAt: "2024-12-06",
      bio: "專精前端開發與使用者體驗設計，熟悉政府網站無障礙規範",
      tools: ["React", "Next.js", "Tailwind", "Figma"],
      languages: ["中文", "英文"],
      location: "台北",
      recentProjects: [
        { id: "P009", name: "文化部藝文平台前端", role: "前端工程師", contribution: "UI 開發、無障礙實作" },
      ],
    },
    {
      id: "M009",
      name: "鄭大偉",
      title: "資料科學家",
      role: ["開發", "顧問"],
      department: "數據分析部",
      email: "zheng.dawei@company.com",
      phone: "0901-123-456",
      experience: 7,
      skills: ["機器學習", "資料分析", "Python", "大數據", "視覺化"],
      certifications: [{ name: "AWS Machine Learning Specialty" }, { name: "Google Cloud Professional ML Engineer" }],
      projects: 15,
      bidCount: 20,
      winCount: 16,
      rating: 4.6,
      availability: "partial",
      avatar: "鄭",
      isStarred: false,
      updatedAt: "2024-12-05",
      bio: "資料科學與 AI 應用專家，協助政府導入智慧決策系統",
      tools: ["Python", "Jupyter", "TensorFlow", "Tableau"],
      languages: ["中文", "英文"],
      location: "新竹",
      recentProjects: [
        { id: "P010", name: "科技部研究數據分析", role: "資料科學家", contribution: "模型開發、分析報告" },
      ],
    },
    {
      id: "M010",
      name: "蔡淑芬",
      title: "品保經理",
      role: ["PM", "顧問"],
      department: "品質管理部",
      email: "cai.shufen@company.com",
      phone: "0912-234-567",
      experience: 13,
      skills: ["測試管理", "品質控管", "CMMI", "敏捷測試", "自動化測試"],
      certifications: [{ name: "ISTQB Advanced", expires: "2025-11-20" }, { name: "CSTE" }, { name: "CMMI" }],
      projects: 31,
      bidCount: 40,
      winCount: 33,
      rating: 4.8,
      availability: "available",
      avatar: "蔡",
      isStarred: true,
      updatedAt: "2024-12-14",
      bio: "13年品保與測試管理經驗，建立多個政府專案測試標準",
      tools: ["Selenium", "JMeter", "TestRail", "Jira"],
      languages: ["中文", "英文"],
      location: "台北",
      recentProjects: [
        { id: "P011", name: "勞動部資訊系統測試", role: "品保經理", contribution: "測試計畫、品質文件" },
      ],
    },
  ]

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      person.certifications.some((cert) => cert.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesRole = selectedRoles.length === 0 || person.role.some((r) => selectedRoles.includes(r))
    const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(person.availability)
    const matchesCerts =
      selectedCerts.length === 0 || person.certifications.some((cert) => selectedCerts.includes(cert.name))

    return matchesSearch && matchesRole && matchesAvailability && matchesCerts
  })

  const activeFiltersCount = selectedRoles.length + selectedAvailability.length + selectedCerts.length

  const clearFilters = () => {
    setSelectedRoles([])
    setSelectedAvailability([])
    setSelectedCerts([])
  }

  const toggleStar = (personId: string) => {
    // Mock toggle - in real app would update backend
    console.log("[v0] Toggle star for person:", personId)
  }

  const getAvailabilityBadge = (availability: Person["availability"]) => {
    const variants = {
      available: {
        label: "可投入",
        className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      },
      partial: {
        label: "部分投入",
        className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
      },
      busy: { label: "忙碌", className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" },
    }
    const variant = variants[availability]
    return (
      <Badge variant="outline" className={`rounded-full ${variant.className}`}>
        {variant.label}
      </Badge>
    )
  }

  const allRoles = ["PM", "架構", "資安", "網路", "維運", "開發", "顧問"]
  const allAvailability = ["available", "partial", "busy"]
  const allCerts = ["PMP", "ITIL v4", "ISO27001 LA", "AWS Solution Architect Professional", "CEH", "CISSP", "CCNP"]

  return (
    <AppShell breadcrumbs={[{ label: "首頁", href: "/" }, { label: "團隊履歷" }]}>
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">團隊履歷</h1>
            <p className="text-base text-muted-foreground">管理團隊成員資料與專業技能</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl bg-transparent" size="lg">
              <Download className="mr-2 h-4 w-4" />
              匯出履歷包
            </Button>
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-2xl bg-primary hover:bg-primary/90" size="lg">
                  <UserPlus className="mr-2 h-4 w-4" />
                  新增成員
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rounded-2xl">
                <DialogHeader>
                  <DialogTitle>新增團隊成員</DialogTitle>
                  <DialogDescription>填寫成員基本資料與專業背景</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="member-name">姓名</Label>
                      <Input id="member-name" placeholder="輸入姓名" className="rounded-2xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="member-role">職稱</Label>
                      <Input id="member-role" placeholder="輸入職稱" className="rounded-2xl" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">部門</Label>
                    <Select>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="選擇部門" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="pm">專案管理部</SelectItem>
                        <SelectItem value="tech">技術研發部</SelectItem>
                        <SelectItem value="security">資訊安全部</SelectItem>
                        <SelectItem value="qa">品質管理部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@company.com" className="rounded-2xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">電話</Label>
                      <Input id="phone" placeholder="0912-345-678" className="rounded-2xl" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="certifications">專業認證</Label>
                    <Input id="certifications" placeholder="例如：PMP, ITIL (以逗號分隔)" className="rounded-2xl" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">個人簡介</Label>
                    <Textarea id="bio" placeholder="描述工作經歷、專長領域等" className="rounded-2xl min-h-[100px]" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddMemberOpen(false)} className="rounded-2xl">
                    取消
                  </Button>
                  <Button onClick={() => setIsAddMemberOpen(false)} className="rounded-2xl">
                    新增成員
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "members" | "matrix")}
          className="w-full"
        >
          <TabsList className="rounded-2xl">
            <TabsTrigger value="members" className="rounded-xl">
              成員列表
            </TabsTrigger>
            <TabsTrigger value="matrix" className="rounded-xl">
              技能矩陣
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜尋姓名、專長、證照、參與專案..."
                  className="pl-10 rounded-2xl bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-2xl bg-background hover:bg-accent">
                      <Filter className="mr-2 h-4 w-4" />
                      篩選
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2 rounded-full px-1.5 min-w-5 h-5">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                    <DropdownMenuLabel>角色</DropdownMenuLabel>
                    {allRoles.map((role) => (
                      <DropdownMenuCheckboxItem
                        key={role}
                        checked={selectedRoles.includes(role)}
                        onCheckedChange={(checked) => {
                          setSelectedRoles(checked ? [...selectedRoles, role] : selectedRoles.filter((r) => r !== role))
                        }}
                      >
                        {role}
                      </DropdownMenuCheckboxItem>
                    ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>可用性</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={selectedAvailability.includes("available")}
                      onCheckedChange={(checked) => {
                        setSelectedAvailability(
                          checked
                            ? [...selectedAvailability, "available"]
                            : selectedAvailability.filter((a) => a !== "available"),
                        )
                      }}
                    >
                      可投入
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedAvailability.includes("partial")}
                      onCheckedChange={(checked) => {
                        setSelectedAvailability(
                          checked
                            ? [...selectedAvailability, "partial"]
                            : selectedAvailability.filter((a) => a !== "partial"),
                        )
                      }}
                    >
                      部分投入
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedAvailability.includes("busy")}
                      onCheckedChange={(checked) => {
                        setSelectedAvailability(
                          checked
                            ? [...selectedAvailability, "busy"]
                            : selectedAvailability.filter((a) => a !== "busy"),
                        )
                      }}
                    >
                      忙碌
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>證照</DropdownMenuLabel>
                    {allCerts.map((cert) => (
                      <DropdownMenuCheckboxItem
                        key={cert}
                        checked={selectedCerts.includes(cert)}
                        onCheckedChange={(checked) => {
                          setSelectedCerts(checked ? [...selectedCerts, cert] : selectedCerts.filter((c) => c !== cert))
                        }}
                      >
                        {cert}
                      </DropdownMenuCheckboxItem>
                    ))}

                    {activeFiltersCount > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={clearFilters}>
                          <X className="mr-2 h-4 w-4" />
                          清除篩選
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border border-border rounded-2xl p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-xl"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-xl"
                    onClick={() => setViewMode("table")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active filters display */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">已啟用篩選：</span>
                {selectedRoles.map((role) => (
                  <Badge key={role} variant="secondary" className="rounded-full">
                    {role}
                    <button
                      onClick={() => setSelectedRoles(selectedRoles.filter((r) => r !== role))}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedAvailability.map((avail) => (
                  <Badge key={avail} variant="secondary" className="rounded-full">
                    {avail === "available" ? "可投入" : avail === "partial" ? "部分投入" : "忙碌"}
                    <button
                      onClick={() => setSelectedAvailability(selectedAvailability.filter((a) => a !== avail))}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedCerts.map((cert) => (
                  <Badge key={cert} variant="secondary" className="rounded-full">
                    {cert}
                    <button
                      onClick={() => setSelectedCerts(selectedCerts.filter((c) => c !== cert))}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-full h-7">
                  清除全部
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-4">
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{filteredPeople.length}</div>
                  <div className="text-sm text-muted-foreground">團隊成員</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {filteredPeople.length > 0
                      ? Math.round(filteredPeople.reduce((sum, p) => sum + p.experience, 0) / filteredPeople.length)
                      : 0}
                    年
                  </div>
                  <div className="text-sm text-muted-foreground">平均年資</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{filteredPeople.reduce((sum, p) => sum + p.projects, 0)}</div>
                  <div className="text-sm text-muted-foreground">累計專案</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {filteredPeople.reduce((sum, p) => sum + p.certifications.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">專業認證</div>
                </CardContent>
              </Card>
            </div>

            {/* Content - Grid or Table */}
            {filteredPeople.length === 0 ? (
              <EmptyState
                icon={Users}
                title="找不到符合的成員"
                description="請嘗試調整搜尋條件或篩選器，或新增一位新成員"
                action={{
                  label: "新增成員",
                  onClick: () => setIsAddMemberOpen(true),
                }}
              />
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPeople.map((person) => (
                  <Card
                    key={person.id}
                    className="rounded-2xl shadow-sm border-2 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
                    onClick={() => setSelectedPerson(person)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                            {person.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-2xl"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStar(person.id)
                            }}
                          >
                            <Star className={`h-4 w-4 ${person.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-2xl">
                              <DropdownMenuItem>檢視履歷</DropdownMenuItem>
                              <DropdownMenuItem>編輯資料</DropdownMenuItem>
                              <DropdownMenuItem>指派到專案</DropdownMenuItem>
                              <DropdownMenuItem>下載履歷</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">移除</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <CardDescription className="text-sm">{person.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {person.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="rounded-full text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                        <div className="text-center">
                          <div className="text-lg font-semibold">{person.projects}</div>
                          <div className="text-xs text-muted-foreground">參與專案</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{person.winCount}</div>
                          <div className="text-xs text-muted-foreground">得標數</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{person.rating}</div>
                          <div className="text-xs text-muted-foreground">評分</div>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex justify-between items-center">
                        {getAvailabilityBadge(person.availability)}
                        <span className="text-xs text-muted-foreground">{person.experience} 年經驗</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-2xl bg-background hover:bg-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        履歷
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 rounded-2xl bg-primary hover:bg-primary/90"
                        onClick={(e) => e.stopPropagation()}
                      >
                        指派
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="rounded-2xl shadow-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRows.length === filteredPeople.length}
                          onCheckedChange={(checked) => {
                            setSelectedRows(checked ? filteredPeople.map((p) => p.id) : [])
                          }}
                        />
                      </TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>職稱 / 角色</TableHead>
                      <TableHead>技能標籤</TableHead>
                      <TableHead>專案數</TableHead>
                      <TableHead>年資</TableHead>
                      <TableHead>可用性</TableHead>
                      <TableHead>更新日期</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPeople.map((person) => (
                      <TableRow
                        key={person.id}
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => setSelectedPerson(person)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedRows.includes(person.id)}
                            onCheckedChange={(checked) => {
                              setSelectedRows(
                                checked ? [...selectedRows, person.id] : selectedRows.filter((id) => id !== person.id),
                              )
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {person.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {person.name}
                                {person.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                              </div>
                              <div className="text-sm text-muted-foreground">{person.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{person.title}</div>
                          <div className="flex gap-1 mt-1">
                            {person.role.map((r) => (
                              <Badge key={r} variant="outline" className="rounded-full text-xs">
                                {r}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {person.skills.slice(0, 3).map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="rounded-full text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {person.skills.length > 3 && (
                              <Badge variant="secondary" className="rounded-full text-xs">
                                +{person.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{person.projects}</div>
                          <div className="text-xs text-muted-foreground">得標 {person.winCount}</div>
                        </TableCell>
                        <TableCell>{person.experience} 年</TableCell>
                        <TableCell>{getAvailabilityBadge(person.availability)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{person.updatedAt}</TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-2xl">
                              <DropdownMenuItem>檢視履歷</DropdownMenuItem>
                              <DropdownMenuItem>編輯資料</DropdownMenuItem>
                              <DropdownMenuItem>指派到專案</DropdownMenuItem>
                              <DropdownMenuItem>下載履歷</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}

            {/* Batch Actions */}
            {selectedRows.length > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <Card className="rounded-2xl shadow-lg p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">已選取 {selectedRows.length} 位成員</span>
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" size="sm" className="rounded-2xl bg-background hover:bg-accent">
                        <Download className="mr-2 h-3 w-3" />
                        下載履歷
                      </Button>
                      <Button size="sm" className="rounded-2xl bg-primary hover:bg-primary/90">
                        <UserPlus className="mr-2 h-3 w-3" />
                        指派到專案
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setSelectedRows([])}>
                        取消
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matrix" className="mt-6">
            <SkillsMatrix />
          </TabsContent>
        </Tabs>
        {/* </CHANGE> */}
      </div>

      <Sheet open={!!selectedPerson} onOpenChange={(open) => !open && setSelectedPerson(null)}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          {selectedPerson && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`/ceholder-svg-height-80.jpg?height=80&width=80`} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                      {selectedPerson.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <SheetTitle className="text-2xl">{selectedPerson.name}</SheetTitle>
                      {selectedPerson.isStarred && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                    </div>
                    <SheetDescription className="text-base">{selectedPerson.title}</SheetDescription>
                    <div className="flex gap-2 mt-2">
                      {selectedPerson.role.map((r) => (
                        <Badge key={r} variant="outline" className="rounded-full">
                          {r}
                        </Badge>
                      ))}
                      {getAvailabilityBadge(selectedPerson.availability)}
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-2xl" size="lg" onClick={() => setIsAddProjectDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  加入到專案
                </Button>
              </SheetHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-5 rounded-2xl">
                  <TabsTrigger value="overview" className="rounded-xl">
                    概覽
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="rounded-xl">
                    經歷
                  </TabsTrigger>
                  <TabsTrigger value="certs" className="rounded-xl">
                    證照
                  </TabsTrigger>
                  <TabsTrigger value="availability" className="rounded-xl">
                    可用性
                  </TabsTrigger>
                  <TabsTrigger value="snippets" className="rounded-xl">
                    履歷片段
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Summary */}
                  {selectedPerson.bio && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">個人簡介</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedPerson.bio}</p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">聯絡資訊</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedPerson.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedPerson.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedPerson.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="rounded-2xl p-4">
                      <div className="text-2xl font-bold">{selectedPerson.projects}</div>
                      <div className="text-sm text-muted-foreground">參與專案</div>
                    </Card>
                    <Card className="rounded-2xl p-4">
                      <div className="text-2xl font-bold">{selectedPerson.winCount}</div>
                      <div className="text-sm text-muted-foreground">得標數</div>
                    </Card>
                    <Card className="rounded-2xl p-4">
                      <div className="text-2xl font-bold">{selectedPerson.rating}</div>
                      <div className="text-sm text-muted-foreground">平均評分</div>
                    </Card>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">專長技能</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerson.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="rounded-full">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tools */}
                  {selectedPerson.tools && (
                    <div className="space-y-3">
                      <h3 className="font-semibold">工具棧</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPerson.tools.map((tool, idx) => (
                          <Badge key={idx} variant="outline" className="rounded-full">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {selectedPerson.languages && (
                    <div className="space-y-3">
                      <h3 className="font-semibold">語言能力</h3>
                      <div className="flex gap-2">
                        {selectedPerson.languages.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="rounded-full">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="experience" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">參與專案</h3>
                    <p className="text-sm text-muted-foreground">
                      總計參與 {selectedPerson.projects} 個專案，得標 {selectedPerson.winCount} 件
                    </p>
                  </div>

                  {selectedPerson.recentProjects && selectedPerson.recentProjects.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPerson.recentProjects.map((project) => (
                        <Card key={project.id} className="rounded-2xl p-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{project.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">擔任：{project.role}</p>
                              </div>
                              <Badge variant="secondary" className="rounded-full">
                                {project.id}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">主要貢獻</p>
                              <p className="text-sm">{project.contribution}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <EmptyState icon={Briefcase} title="尚無專案記錄" description="此成員尚未參與任何專案" />
                  )}
                </TabsContent>

                <TabsContent value="certs" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">專業認證</h3>
                    <p className="text-sm text-muted-foreground">
                      共持有 {selectedPerson.certifications.length} 張證照
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedPerson.certifications.map((cert, idx) => (
                      <Card key={idx} className="rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-2">
                              <Award className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold">{cert.name}</div>
                              {cert.expires && (
                                <div className="text-sm text-muted-foreground">到期日：{cert.expires}</div>
                              )}
                            </div>
                          </div>
                          {cert.expires && (
                            <Badge variant="outline" className="rounded-full">
                              {new Date(cert.expires) > new Date() ? "有效" : "已過期"}
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full rounded-2xl bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      下載證照佐證文件
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">近期投入狀態</h3>
                    {getAvailabilityBadge(selectedPerson.availability)}
                  </div>

                  <Card className="rounded-2xl p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">目前狀態</span>
                        <span className="text-sm text-muted-foreground">
                          {selectedPerson.availability === "available" && "可全力投入新專案"}
                          {selectedPerson.availability === "partial" && "部分時間可投入"}
                          {selectedPerson.availability === "busy" && "專案進行中"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">預計空出時間</span>
                        <span className="text-sm text-muted-foreground">
                          {selectedPerson.availability === "available" ? "立即" : "2-3 週後"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">可配合度</span>
                        <span className="text-sm text-muted-foreground">
                          {selectedPerson.availability === "busy" ? "低" : "高"}
                        </span>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-2">
                    <Label>備註</Label>
                    <Textarea
                      placeholder="新增可用性備註..."
                      className="rounded-2xl min-h-[100px]"
                      defaultValue={
                        selectedPerson.availability === "busy"
                          ? "目前正在進行重點專案，預計下月底結案後可全力投入。"
                          : ""
                      }
                    />
                  </div>
                </TabsContent>

                <TabsContent value="snippets" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">可複用履歷片段</h3>
                    <p className="text-sm text-muted-foreground">這些片段可被 AI 系統引用，快速產生客製化提案文件</p>
                  </div>

                  <div className="space-y-4">
                    {(() => {
                      const snippets: Snippet[] = [
                        {
                          id: "1",
                          title: "個人簡介",
                          content: `${selectedPerson.name}擁有${selectedPerson.certifications.length}張專業證照，曾參與${selectedPerson.projects}個政府專案，累積豐富實務經驗。專精於${selectedPerson.skills.slice(0, 3).join("、")}等領域，能獨立負責複雜系統的規劃與執行。`,
                          tags: selectedPerson.role.slice(0, 2),
                          updatedAt: "2024-03-15",
                        },
                        {
                          id: "2",
                          title: "專長描述",
                          content: `在${selectedPerson.role[0]}領域有深厚背景，熟悉${selectedPerson.tools?.slice(0, 4).join("、") || "各式開發工具"}。曾主導多項關鍵專案，包含架構設計、技術選型與團隊協作，確保專案如期高品質交付。`,
                          tags: ["技術能力", selectedPerson.role[0]],
                          updatedAt: "2024-03-10",
                        },
                        {
                          id: "3",
                          title: "代表專案摘要",
                          content:
                            selectedPerson.recentProjects && selectedPerson.recentProjects[0]
                              ? `在「${selectedPerson.recentProjects[0].name}」專案中擔任${selectedPerson.recentProjects[0].role}，${selectedPerson.recentProjects[0].contribution}。該專案成功協助客戶提升作業效率並獲得高度評價。`
                              : `曾參與多項大型政府專案，負責核心系統開發與整合，具備完整專案生命週期經驗。`,
                          tags: ["專案經驗"],
                          updatedAt: "2024-03-08",
                        },
                        {
                          id: "4",
                          title: "資安經驗",
                          content: `具備完整資安實務經驗，熟悉 OWASP Top 10、滲透測試、弱點掃描等技術。曾協助多個政府機關建立資安防護機制，確保系統符合資安規範並通過第三方稽核。`,
                          tags: ["資安", "合規"],
                          updatedAt: "2024-02-28",
                        },
                      ]

                      return snippets.map((snippet) => (
                        <Card key={snippet.id} className="rounded-2xl p-5 hover:shadow-lg transition-shadow">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-base mb-2">{snippet.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{snippet.content}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                              {snippet.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="rounded-full text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {snippet.updatedAt}
                              </span>
                            </div>

                            <div className="flex gap-2 pt-2 border-t">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl flex-1 bg-transparent"
                                onClick={() => {
                                  navigator.clipboard.writeText(snippet.content)
                                  alert("✓ 已複製到剪貼簿")
                                }}
                              >
                                <Copy className="mr-2 h-3.5 w-3.5" />
                                複製內容
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-xl flex-1"
                                onClick={() => {
                                  setSelectedSnippet(snippet)
                                  setIsAddSnippetDialogOpen(true)
                                }}
                              >
                                <Plus className="mr-2 h-3.5 w-3.5" />
                                加入建議書
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    })()}
                  </div>

                  <Card className="rounded-2xl p-4 bg-muted/50">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-primary/10 p-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-sm">AI 自動引用</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          當使用 AutoRFP
                          功能生成提案文件時，系統會自動分析需求並引用相關的履歷片段，確保內容準確且符合招標文件要求。
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add to Project Dialog */}
      <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>加入到專案</DialogTitle>
            <DialogDescription>將 {selectedPerson?.name} 指派到專案中</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project">選擇專案</Label>
              <Select>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="選擇專案" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="p1">衛福部健保資料分析平台</SelectItem>
                  <SelectItem value="p2">經濟部產業數位轉型</SelectItem>
                  <SelectItem value="p3">數位發展部雲端平台</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">擔任角色</Label>
              <Select>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="選擇角色" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="pm">專案經理</SelectItem>
                  <SelectItem value="arch">系統架構師</SelectItem>
                  <SelectItem value="dev">開發工程師</SelectItem>
                  <SelectItem value="qa">品保工程師</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">備註</Label>
              <Textarea id="notes" placeholder="例如：負責章節、預期貢獻等" className="rounded-2xl min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectDialogOpen(false)} className="rounded-2xl">
              取消
            </Button>
            <Button
              onClick={() => {
                setIsAddProjectDialogOpen(false)
                setSelectedPerson(null)
              }}
              className="rounded-2xl"
            >
              確認加入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddSnippetDialogOpen} onOpenChange={setIsAddSnippetDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle>加入履歷片段到建議書</DialogTitle>
            <DialogDescription>選擇要加入此片段的專案與章節</DialogDescription>
          </DialogHeader>

          {selectedSnippet && (
            <div className="space-y-4">
              <Card className="rounded-2xl p-4 bg-muted/50">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{selectedSnippet.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{selectedSnippet.content}</p>
                </div>
              </Card>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>選擇專案</Label>
                  <Select value={snippetProject} onValueChange={setSnippetProject}>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="請選擇專案..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="proj-001" className="rounded-xl">
                        內政部智慧城市管理平台建置案
                      </SelectItem>
                      <SelectItem value="proj-002" className="rounded-xl">
                        教育部數位學習整合系統
                      </SelectItem>
                      <SelectItem value="proj-003" className="rounded-xl">
                        衛福部健康雲端服務平台
                      </SelectItem>
                      <SelectItem value="proj-004" className="rounded-xl">
                        交通部運輸資訊整合案
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>選擇章節</Label>
                  <Select value={snippetChapter} onValueChange={setSnippetChapter}>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="請選擇章節..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="team" className="rounded-xl">
                        第三章 - 專案團隊與組織
                      </SelectItem>
                      <SelectItem value="qual" className="rounded-xl">
                        第四章 - 資格與實績
                      </SelectItem>
                      <SelectItem value="tech" className="rounded-xl">
                        第五章 - 技術能力說明
                      </SelectItem>
                      <SelectItem value="exec" className="rounded-xl">
                        第六章 - 執行方法與品質管理
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="rounded-2xl p-3 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                      片段將以「引用塊」形式插入草稿，您可在編輯器中進一步調整內容
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSnippetDialogOpen(false)} className="rounded-2xl">
              取消
            </Button>
            <Button
              onClick={() => {
                if (!snippetProject || !snippetChapter) {
                  alert("請選擇專案與章節")
                  return
                }
                setIsAddSnippetDialogOpen(false)
                setTimeout(() => {
                  alert("✓ 已成功加入到建議書草稿")
                  setSnippetProject("")
                  setSnippetChapter("")
                  setSelectedSnippet(null)
                }, 100)
              }}
              className="rounded-2xl"
              disabled={!snippetProject || !snippetChapter}
            >
              <Check className="mr-2 h-4 w-4" />
              確認加入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
