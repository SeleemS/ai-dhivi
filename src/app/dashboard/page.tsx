'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Types

type ClassId = "class-9a" | "class-9b" | "class-9c"

type ClassData = {
  students: number
  avg: string
  pending: number
  lessons: number
  scores: number[]
  studentList: { name: string; submissions: number; score: string }[]
}

// Dummy Data

const dummyData: Record<ClassId, ClassData> = {
  "class-9a": {
    students: 28,
    avg: "82%",
    pending: 3,
    lessons: 11,
    scores: [76, 83, 79, 88],
    studentList: Array.from({ length: 20 }, (_, i) => ({
      name: `Student A${i + 1}`,
      submissions: 3 + (i % 5),
      score: `${80 + (i % 10)}%`
    }))
  },
  "class-9b": {
    students: 31,
    avg: "75%",
    pending: 2,
    lessons: 9,
    scores: [70, 73, 77, 80],
    studentList: Array.from({ length: 20 }, (_, i) => ({
      name: `Student B${i + 1}`,
      submissions: 2 + (i % 4),
      score: `${70 + (i % 15)}%`
    }))
  },
  "class-9c": {
    students: 25,
    avg: "89%",
    pending: 1,
    lessons: 13,
    scores: [90, 85, 88, 93],
    studentList: Array.from({ length: 20 }, (_, i) => ({
      name: `Student C${i + 1}`,
      submissions: 4 + (i % 3),
      score: `${85 + (i % 8)}%`
    }))
  },
}

const classList: { id: ClassId; name: string }[] = [
  { id: "class-9a", name: "Class 9A" },
  { id: "class-9b", name: "Class 9B" },
  { id: "class-9c", name: "Class 9C" },
]

// Page

export default function DashboardPage() {
  const [selectedClass, setSelectedClass] = useState<ClassId>("class-9a")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const data = dummyData[selectedClass]
  const chartData = data.scores.map((score, i) => ({ name: `Week ${i + 1}`, score }))

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className={`w-full sm:w-64 p-6 border-b sm:border-b-0 sm:border-r border-white/10 bg-zinc-950 ${sidebarOpen ? '' : 'hidden sm:block'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">My Classes</h2>
          <button className="sm:hidden" onClick={() => setSidebarOpen(false)}>
            <ChevronUpIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-2">
          {classList.map(cls => (
            <Button
              key={cls.id}
              variant={selectedClass === cls.id ? "default" : "ghost"}
              className="w-full justify-start text-left transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              onClick={() => setSelectedClass(cls.id)}
            >
              {cls.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Toggle Sidebar Button (Mobile) */}
      {!sidebarOpen && (
        <div className="sm:hidden p-2">
          <Button variant="ghost" onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 text-white">
            <ChevronDownIcon className="w-5 h-5" /> Show Classes
          </Button>
        </div>
      )}

      {/* Main Panel */}
      <main className="flex-1 px-4 sm:px-10 py-8 space-y-8 bg-neutral-950">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-4xl font-bold mb-1 text-white">Dashboard</h1>
            <p className="text-xl font-semibold text-gray-300">
              {classList.find(c => c.id === selectedClass)?.name}
            </p>
          </div>
          <Input
            className="w-full sm:w-64 bg-neutral-800 border border-white/10 text-white placeholder:text-gray-400"
            placeholder="Search students, papers..."
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="gap-2 bg-zinc-900 border border-white/10 overflow-x-auto w-fit">
            {['overview', 'students', 'grading', 'performance'].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Students", value: data.students },
                { label: "Avg Score", value: data.avg },
                { label: "Pending Papers", value: data.pending },
                { label: "Lessons Taught", value: data.lessons },
              ].map(({ label, value }) => (
                <Card key={label} className="bg-zinc-900 border border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">{label}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold">{value}</CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-zinc-900 border border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-white">Class Average by Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[350px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f1f1f", borderColor: "#333", color: "#fff" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="score" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="bg-zinc-900 border border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-white">Students Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-zinc-800">
                    <TableRow>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Submissions</TableHead>
                      <TableHead className="text-white">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.studentList.map((s, i) => (
                      <TableRow key={i}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.submissions}</TableCell>
                        <TableCell>{s.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grading">
            <Card className="bg-zinc-900 border border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-white">Grading Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar className="rounded-md border border-zinc-800 bg-neutral-950 text-white" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="bg-zinc-900 border border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-white">Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Charts and analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}