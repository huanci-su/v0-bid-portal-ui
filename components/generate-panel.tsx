"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  FileText,
  MessageSquare,
  Presentation,
  Play,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Download,
  Eye,
  Archive,
} from "lucide-react"

type JobStatus = "queued" | "running" | "done" | "failed"

interface GenerateJob {
  id: string
  type: "extract" | "proposal" | "qa" | "presentation"
  name: string
  status: JobStatus
  progress: number
  createdAt: string
  logs: string[]
  outputs?: {
    id: string
    name: string
    type: string
    size: string
    url: string
  }[]
}

const generateButtons = [
  { id: "extract", label: "抽取需求重點", icon: Sparkles, color: "default" as const },
  { id: "proposal", label: "生成建議書", icon: FileText, color: "default" as const },
  { id: "qa", label: "生成 QA 問答", icon: MessageSquare, color: "default" as const },
  { id: "presentation", label: "生成簡報", icon: Presentation, color: "default" as const },
]

export function GeneratePanel({ projectId }: { projectId: string }) {
  const [jobs, setJobs] = React.useState<GenerateJob[]>([
    {
      id: "job-1",
      type: "proposal",
      name: "建議書生成",
      status: "done",
      progress: 100,
      createdAt: "2024-01-10 14:32",
      logs: [
        "[14:32:05] 任務開始",
        "[14:32:08] 正在分析 RFP 文件...",
        "[14:32:15] 正在提取評選重點...",
        "[14:32:22] 正在生成技術方案...",
        "[14:32:35] 正在生成專案規劃...",
        "[14:32:45] 正在生成預算分析...",
        "[14:32:52] 建議書生成完成",
      ],
      outputs: [
        {
          id: "out-1",
          name: "技術建議書_v1.docx",
          type: "Word Document",
          size: "2.4 MB",
          url: "#",
        },
        {
          id: "out-2",
          name: "專案規劃書_v1.pdf",
          type: "PDF Document",
          size: "1.8 MB",
          url: "#",
        },
      ],
    },
    {
      id: "job-2",
      type: "qa",
      name: "QA 問答生成",
      status: "running",
      progress: 45,
      createdAt: "2024-01-10 15:20",
      logs: [
        "[15:20:05] 任務開始",
        "[15:20:08] 正在分析常見問題...",
        "[15:20:15] 正在生成技術問答...",
        "[15:20:22] 正在生成商務問答...",
      ],
    },
  ])

  const [selectedJob, setSelectedJob] = React.useState<GenerateJob | null>(jobs[0])

  const handleGenerate = (type: string) => {
    const newJob: GenerateJob = {
      id: `job-${Date.now()}`,
      type: type as GenerateJob["type"],
      name: generateButtons.find((b) => b.id === type)?.label || "新任務",
      status: "queued",
      progress: 0,
      createdAt: new Date().toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      logs: ["[" + new Date().toLocaleTimeString("zh-TW") + "] 任務已加入佇列"],
    }

    setJobs((prev) => [newJob, ...prev])
    setSelectedJob(newJob)

    // Simulate job progression
    setTimeout(() => {
      setJobs((prev) => prev.map((j) => (j.id === newJob.id ? { ...j, status: "running" as JobStatus } : j)))
    }, 1000)
  }

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "queued":
        return <Clock className="h-4 w-4" />
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "done":
        return <CheckCircle2 className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: JobStatus) => {
    const config = {
      queued: { label: "排隊中", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
      running: { label: "執行中", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
      done: { label: "已完成", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
      failed: { label: "失敗", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
    }
    return (
      <Badge className={`rounded-full ${config[status].className}`}>
        {getStatusIcon(status)}
        <span className="ml-1.5">{config[status].label}</span>
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>AI 生成工具</CardTitle>
          <CardDescription>使用 AI 快速生成投標文件與資料</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {generateButtons.map((button) => {
              const Icon = button.icon
              return (
                <Button
                  key={button.id}
                  variant="outline"
                  className="h-auto flex-col gap-2 py-4 rounded-2xl bg-transparent hover:bg-primary/5 hover:border-primary"
                  onClick={() => handleGenerate(button.id)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{button.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job List */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>任務列表</CardTitle>
            <CardDescription>查看所有生成任務狀態</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-1 p-6 pt-0">
                {jobs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">尚無任務記錄</p>
                    <p className="text-xs mt-1">點擊上方按鈕開始生成</p>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`w-full text-left p-4 rounded-xl border transition-all hover:bg-muted/50 ${
                        selectedJob?.id === job.id ? "bg-muted border-primary" : "bg-card border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">{job.name}</p>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{job.createdAt}</p>
                      {job.status === "running" && (
                        <div className="space-y-1">
                          <Progress value={job.progress} className="h-1.5" />
                          <p className="text-xs text-muted-foreground text-right">{job.progress}%</p>
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Job Detail */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedJob ? selectedJob.name : "選擇任務"}</CardTitle>
                <CardDescription>{selectedJob ? selectedJob.createdAt : "查看任務詳細資訊"}</CardDescription>
              </div>
              {selectedJob && getStatusBadge(selectedJob.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedJob ? (
              <>
                {/* Progress */}
                {selectedJob.status === "running" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">執行進度</span>
                      <span className="font-medium">{selectedJob.progress}%</span>
                    </div>
                    <Progress value={selectedJob.progress} className="h-2" />
                  </div>
                )}

                {/* Logs */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">執行記錄</h4>
                  <ScrollArea className="h-[180px] rounded-xl border bg-muted/30 p-4">
                    <div className="space-y-1.5 font-mono text-xs">
                      {selectedJob.logs.map((log, index) => (
                        <div key={index} className="text-muted-foreground">
                          {log}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Outputs */}
                {selectedJob.outputs && selectedJob.outputs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-3">輸出資產</h4>
                    <div className="space-y-3">
                      {selectedJob.outputs.map((output) => (
                        <div
                          key={output.id}
                          className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm mb-0.5 truncate">{output.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {output.type} • {output.size}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                              <Archive className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Play className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">請從左側選擇任務</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
