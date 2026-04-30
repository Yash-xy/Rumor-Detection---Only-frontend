import { useState } from 'react'
import {
  TrendingUp, TrendingDown, Shield, CheckCircle2, AlertTriangle,
  BarChart2, ArrowUpRight, Activity
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { kpiData, weeklyActivityData, rumorDistribution, topSchemes } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  growth: number
  icon: React.ElementType
  accent: string
  description: string
}

function KpiCard({ title, value, growth, icon: Icon, accent, description }: KpiCardProps) {
  const isPositive = growth >= 0
  return (
    <div className={cn(
      'kpi-card group relative overflow-hidden',
      'before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-br group-hover:before:opacity-100',
      accent === 'teal' && 'before:from-teal-500/5 before:to-transparent',
      accent === 'red' && 'before:from-red-500/5 before:to-transparent',
      accent === 'green' && 'before:from-green-500/5 before:to-transparent',
      accent === 'blue' && 'before:from-blue-500/5 before:to-transparent',
    )}>
      <div className="relative flex items-start justify-between">
        <div className={cn(
          'flex items-center justify-center w-10 h-10 rounded-xl',
          accent === 'teal' && 'bg-teal-500/15 text-teal-400',
          accent === 'red' && 'bg-red-500/15 text-red-400',
          accent === 'green' && 'bg-green-500/15 text-green-400',
          accent === 'blue' && 'bg-blue-500/15 text-blue-400',
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn(
          'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
          isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(growth)}%
        </div>
      </div>
      <div className="relative">
        <div className="text-3xl font-bold text-white mt-3">{value}</div>
        <div className="text-sm font-medium text-slate-300 mt-1">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-govbg-surface/95 backdrop-blur-md p-3 shadow-glass text-xs">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-govbg-surface/95 backdrop-blur-md p-3 shadow-glass text-xs">
      <p style={{ color: payload[0].payload.color }} className="font-semibold">{payload[0].name}</p>
      <p className="text-white font-bold">{payload[0].value}</p>
      <p className="text-slate-400">{((payload[0].value / (kpiData.totalChecks)) * 100).toFixed(1)}%</p>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Analytics Dashboard</h1>
          <p className="text-slate-400">Real-time insights on government scheme rumor detection.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live Data
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Total Checks"
          value={kpiData.totalChecks.toLocaleString()}
          growth={kpiData.checksGrowth}
          icon={Activity}
          accent="teal"
          description="This month"
        />
        <KpiCard
          title="Rumors Detected"
          value={kpiData.rumorsDetected}
          growth={kpiData.rumorsGrowth}
          icon={AlertTriangle}
          accent="red"
          description="False claims identified"
        />
        <KpiCard
          title="Legitimate"
          value={kpiData.legitimate}
          growth={kpiData.legitimateGrowth}
          icon={CheckCircle2}
          accent="green"
          description="Verified accurate claims"
        />
        <KpiCard
          title="Avg Confidence"
          value={`${kpiData.avgConfidence}%`}
          growth={3}
          icon={Shield}
          accent="blue"
          description="Model confidence score"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart */}
        <Card className="lg:col-span-2 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Claims analyzed over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={weeklyActivityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => <span className="text-xs text-slate-400 capitalize">{v}</span>} />
                <Line type="monotone" dataKey="checks" stroke="#14b8a6" strokeWidth={2.5} dot={false} name="Total Checks" />
                <Line type="monotone" dataKey="rumors" stroke="#dc2626" strokeWidth={2} dot={false} name="Rumors" />
                <Line type="monotone" dataKey="legitimate" stroke="#16a34a" strokeWidth={2} dot={false} name="Legitimate" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-teal-400" />
              Distribution
            </CardTitle>
            <CardDescription>Rumor vs Legitimate breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={rumorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {rumorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {rumorDistribution.map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{item.value}</span>
                    <span className="text-slate-500">({((item.value / kpiData.totalChecks) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Schemes */}
      <Card className="border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-teal-400" />
            Top Queried Schemes
          </CardTitle>
          <CardDescription>Most frequently fact-checked government schemes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSchemes.map((scheme, i) => (
              <div key={scheme.name} className="flex items-center gap-4">
                <div className="text-xs font-bold text-slate-600 w-5 text-center">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-200">{scheme.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">{scheme.queries} total</span>
                      <span className="text-red-400 font-medium">{scheme.rumors} rumors</span>
                    </div>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="bg-red-500/70 rounded-l-full transition-all duration-700"
                      style={{ width: `${(scheme.rumors / scheme.queries) * 100}%` }}
                    />
                    <div
                      className="bg-green-500/70 rounded-r-full transition-all duration-700"
                      style={{ width: `${((scheme.queries - scheme.rumors) / scheme.queries) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
