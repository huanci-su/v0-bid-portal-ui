"use client"

import * as React from "react"
import { Search, UserCheck, Filter, ArrowUpDown, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SkillLevel {
  level: 0 | 1 | 2 | 3
  experience?: string
  projects?: string[]
}

interface PersonSkills {
  id: string
  name: string
  availability: "available" | "partial" | "busy"
  avatar: string
  skills: Record<string, SkillLevel>
}

const skillCategories = {
  資安: ["資安稽核", "滲透測試", "ISO27001", "個資保護", "ISMS", "防火牆管理"],
  網路: ["網路規劃", "路由交換", "VPN", "SD-WAN", "負載平衡", "無線網路"],
  雲端: ["AWS", "Azure", "GCP", "容器化", "Kubernetes", "DevOps"],
  專案管理: ["專案管理", "RFP 撰寫", "風險控管", "利害關係人", "預算控管", "採購流程"],
  維運: ["維運管理", "SLA", "ITIL", "監控告警", "問題管理", "變更管理"],
  文件產製: ["技術文件", "投標文件", "簡報製作", "使用手冊", "測試報告", "架構圖"],
}

const mockPeopleSkills: PersonSkills[] = [
  {
    id: "M001",
    name: "王建國",
    availability: "available",
    avatar: "王",
    skills: {
      專案管理: { level: 3, experience: "12 年專案管理經驗", projects: ["衛福部健保平台", "經濟部數位轉型"] },
      "RFP 撰寫": { level: 3, experience: "撰寫超過 45 件政府標案", projects: ["衛福部健保平台"] },
      風險控管: { level: 3, experience: "擅長政府專案風險評估", projects: ["衛福部健保平台", "經濟部數位轉型"] },
      利害關係人: { level: 3, experience: "熟悉部會溝通協調", projects: ["衛福部健保平台"] },
      投標文件: { level: 3, experience: "主導超過 30 件投標文件", projects: ["經濟部數位轉型"] },
      簡報製作: { level: 2, experience: "製作評選簡報", projects: ["經濟部數位轉型"] },
    },
  },
  {
    id: "M002",
    name: "陳雅婷",
    availability: "partial",
    avatar: "陳",
    skills: {
      AWS: { level: 3, experience: "AWS 專業架構師認證", projects: ["數位發展部雲端平台"] },
      Azure: { level: 3, experience: "Azure 解決方案架構師", projects: ["數位發展部雲端平台"] },
      GCP: { level: 2, experience: "GCP 專業雲端架構師", projects: [] },
      容器化: { level: 3, experience: "Kubernetes + Docker 實戰", projects: ["數位發展部雲端平台"] },
      Kubernetes: { level: 3, experience: "多個 K8s 生產環境經驗", projects: ["數位發展部雲端平台"] },
      DevOps: { level: 3, experience: "CI/CD 流程建置專家", projects: ["數位發展部雲端平台"] },
      技術文件: { level: 2, experience: "撰寫技術規格書", projects: ["數位發展部雲端平台"] },
      架構圖: { level: 3, experience: "系統架構設計與圖繪製", projects: ["數位發展部雲端平台"] },
    },
  },
  {
    id: "M003",
    name: "林志明",
    availability: "available",
    avatar: "林",
    skills: {
      資安稽核: { level: 3, experience: "15 年資安稽核經驗", projects: ["教育部 ISMS"] },
      滲透測試: { level: 3, experience: "CEH + CISSP 持證", projects: ["教育部 ISMS"] },
      ISO27001: { level: 3, experience: "ISO27001 主導稽核員", projects: ["教育部 ISMS"] },
      個資保護: { level: 3, experience: "個資管理師認證", projects: ["教育部 ISMS"] },
      ISMS: { level: 3, experience: "建置多個政府 ISMS", projects: ["教育部 ISMS"] },
      防火牆管理: { level: 2, experience: "防火牆規則審查", projects: [] },
      技術文件: { level: 3, experience: "ISMS 文件撰寫", projects: ["教育部 ISMS"] },
      投標文件: { level: 2, experience: "資安章節撰寫", projects: ["教育部 ISMS"] },
    },
  },
  {
    id: "M004",
    name: "張美玲",
    availability: "busy",
    avatar: "張",
    skills: {
      網路規劃: { level: 3, experience: "8 年網路架構設計", projects: ["交通部網路優化"] },
      路由交換: { level: 3, experience: "CCNP 認證", projects: ["交通部網路優化"] },
      VPN: { level: 2, experience: "Site-to-Site VPN 建置", projects: ["交通部網路優化"] },
      "SD-WAN": { level: 2, experience: "SD-WAN 導入經驗", projects: [] },
      負載平衡: { level: 2, experience: "F5 負載平衡器", projects: ["交通部網路優化"] },
      防火牆管理: { level: 3, experience: "Fortinet 專家", projects: ["交通部網路優化"] },
      技術文件: { level: 2, experience: "網路架構文件", projects: ["交通部網路優化"] },
      架構圖: { level: 3, experience: "網路拓樸圖繪製", projects: ["交通部網路優化"] },
    },
  },
  {
    id: "M005",
    name: "黃俊傑",
    availability: "available",
    avatar: "黃",
    skills: {
      AWS: { level: 2, experience: "AWS 服務整合", projects: ["內政部民眾平台"] },
      容器化: { level: 2, experience: "Docker 容器化應用", projects: [] },
      DevOps: { level: 2, experience: "CI/CD 流程實作", projects: [] },
      技術文件: { level: 2, experience: "API 文件撰寫", projects: ["內政部民眾平台"] },
      使用手冊: { level: 1, experience: "系統操作手冊", projects: [] },
    },
  },
  {
    id: "M006",
    name: "劉雅文",
    availability: "partial",
    avatar: "劉",
    skills: {
      維運管理: { level: 3, experience: "11 年維運服務經驗", projects: ["財政部維運服務"] },
      SLA: { level: 3, experience: "SLA 規劃與管理", projects: ["財政部維運服務"] },
      ITIL: { level: 3, experience: "ITIL v4 MP 認證", projects: ["財政部維運服務"] },
      監控告警: { level: 3, experience: "Zabbix + Grafana", projects: ["財政部維運服務"] },
      問題管理: { level: 3, experience: "問題管理流程專家", projects: ["財政部維運服務"] },
      變更管理: { level: 2, experience: "變更管理流程", projects: [] },
      技術文件: { level: 3, experience: "維運計畫撰寫", projects: ["財政部維運服務"] },
      投標文件: { level: 2, experience: "維運標案文件", projects: [] },
    },
  },
  {
    id: "M007",
    name: "吳承翰",
    availability: "busy",
    avatar: "吳",
    skills: {
      專案管理: { level: 3, experience: "18 年技術顧問", projects: ["行政院數位治理"] },
      "RFP 撰寫": { level: 3, experience: "RFP 審查專家", projects: ["行政院數位治理"] },
      風險控管: { level: 3, experience: "企業風險管理", projects: [] },
      技術文件: { level: 3, experience: "策略文件撰寫", projects: ["行政院數位治理"] },
      投標文件: { level: 3, experience: "主導國家級專案投標", projects: ["行政院數位治理"] },
      簡報製作: { level: 3, experience: "高階簡報製作", projects: ["行政院數位治理"] },
      架構圖: { level: 3, experience: "企業架構藍圖", projects: ["行政院數位治理"] },
    },
  },
  {
    id: "M008",
    name: "周欣怡",
    availability: "available",
    avatar: "周",
    skills: {
      技術文件: { level: 2, experience: "前端技術文件", projects: ["文化部藝文平台"] },
      使用手冊: { level: 2, experience: "使用者操作手冊", projects: ["文化部藝文平台"] },
      簡報製作: { level: 1, experience: "UI/UX 簡報", projects: [] },
    },
  },
  {
    id: "M009",
    name: "鄭大偉",
    availability: "partial",
    avatar: "鄭",
    skills: {
      AWS: { level: 2, experience: "AWS ML 服務", projects: ["科技部數據分析"] },
      GCP: { level: 2, experience: "GCP ML Engine", projects: [] },
      技術文件: { level: 3, experience: "模型文件與分析報告", projects: ["科技部數據分析"] },
      測試報告: { level: 2, experience: "模型測試報告", projects: [] },
    },
  },
  {
    id: "M010",
    name: "蔡淑芬",
    availability: "available",
    avatar: "蔡",
    skills: {
      專案管理: { level: 2, experience: "測試專案管理", projects: ["勞動部測試"] },
      技術文件: { level: 3, experience: "測試計畫撰寫", projects: ["勞動部測試"] },
      測試報告: { level: 3, experience: "13 年測試報告經驗", projects: ["勞動部測試"] },
      投標文件: { level: 2, experience: "品質文件撰寫", projects: [] },
    },
  },
]

export function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("資安")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedAvailability, setSelectedAvailability] = React.useState<string[]>([])
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc")
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])
  const [isRecommendDialogOpen, setIsRecommendDialogOpen] = React.useState(false)

  const currentSkills = skillCategories[selectedCategory as keyof typeof skillCategories] || []

  const filteredPeople = mockPeopleSkills.filter((person) => {
    const matchesSearch = searchQuery === "" || person.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(person.availability)
    return matchesSearch && matchesAvailability
  })

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    const aMax = Math.max(...currentSkills.map((skill) => a.skills[skill]?.level || 0))
    const bMax = Math.max(...currentSkills.map((skill) => b.skills[skill]?.level || 0))
    return sortOrder === "desc" ? bMax - aMax : aMax - bMax
  })

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex items-center justify-center gap-0.5">
        {[1, 2, 3].map((dot) => (
          <div key={dot} className={`h-2 w-2 rounded-full ${dot <= level ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    )
  }

  const getRecommendedPeople = () => {
    if (selectedSkills.length === 0) return []

    return mockPeopleSkills
      .map((person) => {
        const matchedSkills = selectedSkills.filter((skill) => (person.skills[skill]?.level || 0) >= 2)
        const avgLevel =
          selectedSkills.reduce((sum, skill) => sum + (person.skills[skill]?.level || 0), 0) / selectedSkills.length
        return {
          ...person,
          matchedSkills,
          matchCount: matchedSkills.length,
          avgLevel,
        }
      })
      .filter((p) => p.matchCount > 0)
      .sort((a, b) => {
        if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount
        return b.avgLevel - a.avgLevel
      })
      .slice(0, 5)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">技能矩陣</CardTitle>
              <CardDescription className="mt-1.5">團隊成員技能熟練度與可用性分析</CardDescription>
            </div>
            <Dialog open={isRecommendDialogOpen} onOpenChange={setIsRecommendDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-2xl" size="lg">
                  <UserCheck className="mr-2 h-4 w-4" />
                  一鍵找人
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rounded-2xl">
                <DialogHeader>
                  <DialogTitle>根據技能組合推薦人選</DialogTitle>
                  <DialogDescription>選擇所需技能，系統將推薦最符合條件的團隊成員</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">選擇所需技能（至少選擇 1 項）</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1">
                      {Object.entries(skillCategories).map(([category, skills]) => (
                        <div key={category} className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">{category}</div>
                          {skills.map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Checkbox
                                id={`skill-${skill}`}
                                checked={selectedSkills.includes(skill)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedSkills([...selectedSkills, skill])
                                  } else {
                                    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                                  }
                                }}
                              />
                              <label
                                htmlFor={`skill-${skill}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {skill}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSkills.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          推薦人選（共 {getRecommendedPeople().length} 位）
                        </Label>
                        {getRecommendedPeople().length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">沒有符合條件的團隊成員</p>
                          </div>
                        ) : (
                          <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-3">
                              {getRecommendedPeople().map((person, index) => (
                                <Card key={person.id} className="rounded-xl">
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                                          {person.avatar}
                                        </div>
                                        <div>
                                          <div className="font-medium flex items-center gap-2">
                                            {person.name}
                                            {index === 0 && (
                                              <Badge variant="default" className="rounded-full text-xs">
                                                最推薦
                                              </Badge>
                                            )}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            符合 {person.matchCount}/{selectedSkills.length} 項技能
                                          </div>
                                        </div>
                                      </div>
                                      <Badge
                                        variant={
                                          person.availability === "available"
                                            ? "default"
                                            : person.availability === "partial"
                                              ? "secondary"
                                              : "outline"
                                        }
                                        className="rounded-full"
                                      >
                                        {person.availability === "available"
                                          ? "可用"
                                          : person.availability === "partial"
                                            ? "部分可用"
                                            : "忙碌中"}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {person.matchedSkills.map((skill) => (
                                        <Badge key={skill} variant="outline" className="rounded-full text-xs">
                                          {skill} Lv.{person.skills[skill]?.level}
                                        </Badge>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </ScrollArea>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜尋成員姓名..."
                className="pl-10 rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="rounded-2xl bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    可用性
                    {selectedAvailability.length > 0 && (
                      <Badge variant="secondary" className="ml-2 rounded-full">
                        {selectedAvailability.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-3 rounded-2xl" align="end">
                  <div className="space-y-2">
                    {[
                      { value: "available", label: "可用" },
                      { value: "partial", label: "部分可用" },
                      { value: "busy", label: "忙碌中" },
                    ].map((item) => (
                      <div key={item.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.value}
                          checked={selectedAvailability.includes(item.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAvailability([...selectedAvailability, item.value])
                            } else {
                              setSelectedAvailability(selectedAvailability.filter((a) => a !== item.value))
                            }
                          }}
                        />
                        <label
                          htmlFor={item.value}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                className="rounded-2xl bg-transparent"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortOrder === "desc" ? "熟練度：高→低" : "熟練度：低→高"}
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full rounded-2xl mb-6 flex-wrap h-auto p-1">
              {Object.keys(skillCategories).map((category) => (
                <TabsTrigger key={category} value={category} className="rounded-xl flex-1">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(skillCategories).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="text-left p-4 font-medium sticky left-0 bg-muted/30 min-w-[160px]">成員</th>
                          {skills.map((skill) => (
                            <th key={skill} className="text-center p-4 font-medium min-w-[120px]">
                              <div className="flex flex-col items-center gap-1">
                                <span>{skill}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sortedPeople.map((person) => (
                          <tr key={person.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                            <td className="p-4 sticky left-0 bg-card">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-medium text-sm text-primary flex-shrink-0">
                                  {person.avatar}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium truncate">{person.name}</div>
                                  <Badge
                                    variant={
                                      person.availability === "available"
                                        ? "default"
                                        : person.availability === "partial"
                                          ? "secondary"
                                          : "outline"
                                    }
                                    className="rounded-full text-xs mt-1"
                                  >
                                    {person.availability === "available"
                                      ? "可用"
                                      : person.availability === "partial"
                                        ? "部分"
                                        : "忙碌"}
                                  </Badge>
                                </div>
                              </div>
                            </td>
                            {skills.map((skill) => {
                              const skillData = person.skills[skill]
                              const level = skillData?.level || 0
                              return (
                                <td key={skill} className="p-4 text-center">
                                  {level > 0 ? (
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <button className="hover:opacity-70 transition-opacity">
                                          {renderSkillLevel(level)}
                                        </button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[320px] rounded-2xl" align="center">
                                        <div className="space-y-3">
                                          <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">{skill}</h4>
                                            <Badge variant="outline" className="rounded-full">
                                              Lv.{level}
                                            </Badge>
                                          </div>
                                          <Separator />
                                          <div>
                                            <div className="text-sm font-medium mb-1">經驗描述</div>
                                            <p className="text-sm text-muted-foreground">
                                              {skillData.experience || "暫無經驗描述"}
                                            </p>
                                          </div>
                                          {skillData.projects && skillData.projects.length > 0 && (
                                            <div>
                                              <div className="text-sm font-medium mb-2">相關專案</div>
                                              <div className="flex flex-wrap gap-1.5">
                                                {skillData.projects.map((project) => (
                                                  <Badge
                                                    key={project}
                                                    variant="secondary"
                                                    className="rounded-full text-xs"
                                                  >
                                                    {project}
                                                  </Badge>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  ) : (
                                    <div className="text-muted-foreground/30">-</div>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {sortedPeople.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>找不到符合條件的成員</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <div className="text-sm font-medium mb-2">熟練度說明</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderSkillLevel(1)}
                  <span className="text-sm text-muted-foreground">入門</span>
                </div>
                <div className="flex items-center gap-2">
                  {renderSkillLevel(2)}
                  <span className="text-sm text-muted-foreground">中級</span>
                </div>
                <div className="flex items-center gap-2">
                  {renderSkillLevel(3)}
                  <span className="text-sm text-muted-foreground">專家</span>
                </div>
              </div>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div>
              <div className="text-sm font-medium mb-2">互動功能</div>
              <p className="text-sm text-muted-foreground">點擊熟練度圓點可查看詳細經驗與相關專案</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
