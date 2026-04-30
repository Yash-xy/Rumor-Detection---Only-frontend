import { useState, useRef } from 'react'
import { Upload, Database, RefreshCw, CheckCircle2, AlertTriangle, FileText, X, Shield, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface UploadFile {
  name: string
  size: number
  rows?: number
}

export default function Admin() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<UploadFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [rebuilding, setRebuilding] = useState(false)

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
          <p className="text-slate-400 mb-6">You need admin privileges to access this page.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/login')}>Login as Admin</Button>
            <Button variant="outline" onClick={() => navigate('/')}>Go Home</Button>
          </div>
          <p className="text-xs text-slate-500 mt-4">Demo: Login with admin@schemeradar.gov.in</p>
        </div>
      </div>
    )
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.name.endsWith('.csv')) {
      setFile({ name: dropped.name, size: dropped.size, rows: Math.floor(Math.random() * 5000) + 500 })
      setUploadStatus('idle')
    } else {
      toast({ title: 'Invalid file', description: 'Please upload a CSV file.', variant: 'destructive' })
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && selected.name.endsWith('.csv')) {
      setFile({ name: selected.name, size: selected.size, rows: Math.floor(Math.random() * 5000) + 500 })
      setUploadStatus('idle')
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setUploadProgress(0)
    setUploadStatus('uploading')

    for (let p = 0; p <= 100; p += Math.floor(Math.random() * 15) + 5) {
      await new Promise(r => setTimeout(r, 200))
      setUploadProgress(Math.min(p, 100))
    }
    setUploadProgress(100)
    await new Promise(r => setTimeout(r, 400))

    // Simulate model rebuild
    toast({ title: 'Dataset uploaded!', description: 'Starting model rebuild…', variant: 'success' } as any)
    await new Promise(r => setTimeout(r, 1500))

    setUploading(false)
    setUploadStatus('success')
    toast({ title: '✓ Model rebuilt successfully', description: `Processed ${file.rows?.toLocaleString()} records in 2.3s.`, variant: 'success' } as any)
  }

  const handleForceRebuild = async () => {
    setRebuilding(true)
    toast({ title: 'Force rebuild initiated', description: 'Rebuilding detection model from existing dataset…' })
    await new Promise(r => setTimeout(r, 3000))
    setRebuilding(false)
    toast({ title: '✓ Force rebuild complete', description: 'Model updated with latest dataset.', variant: 'success' } as any)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <Badge variant="secondary" className="text-amber-400 border-amber-500/30 bg-amber-500/10">ADMIN</Badge>
        </div>
        <p className="text-slate-400">Manage dataset uploads and model training.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-teal-400" />
                Dataset Upload
              </CardTitle>
              <CardDescription>Upload a CSV file with scheme claims to train the detection model.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dropzone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  'relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200',
                  isDragging ? 'border-teal-400 bg-teal-500/10' : 'border-white/10 hover:border-teal-500/40 hover:bg-white/5'
                )}
              >
                <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFileSelect} />
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-300 mb-1">
                  {isDragging ? 'Drop your CSV here' : 'Drag & drop CSV file here'}
                </p>
                <p className="text-xs text-slate-500">or click to browse • CSV format only • Max 50MB</p>
              </div>

              {/* Selected File */}
              {file && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500/15">
                    <FileText className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                      {file.rows && ` • ~${file.rows.toLocaleString()} rows`}
                    </p>
                  </div>
                  {uploadStatus === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
                  {uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
                    <button onClick={e => { e.stopPropagation(); setFile(null); setUploadStatus('idle') }} className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Uploading & rebuilding model…</span>
                    <span className="font-semibold text-teal-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || uploading || uploadStatus === 'success'}
                className="w-full gap-2"
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Uploading & Rebuilding…</>
                ) : uploadStatus === 'success' ? (
                  <><CheckCircle2 className="w-4 h-4" />Upload Complete</>
                ) : (
                  <><Upload className="w-4 h-4" />Upload & Rebuild Model</>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* CSV Format Guide */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-base">CSV Format Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-black/30 border border-white/10 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="text-teal-400 mb-1"># Required columns:</div>
                <div>id, claim_text, scheme_name, scheme_level, status, confidence</div>
                <div className="mt-3 text-teal-400 mb-1"># Example row:</div>
                <div>1,"PM-KISAN gives ₹12000 per year",PM-KISAN,Central,Rumor,0.96</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['id', 'claim_text', 'scheme_name', 'scheme_level', 'status', 'confidence'].map(col => (
                  <span key={col} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono">{col}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-5">
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="w-4 h-4 text-teal-400" />
                Model Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Dataset Version', value: 'v4.2.1' },
                { label: 'Last Trained', value: '2 days ago' },
                { label: 'Total Records', value: '12,847' },
                { label: 'Model Accuracy', value: '94.2%' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-slate-200">{value}</span>
                </div>
              ))}

              <Separator />

              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Model Operational</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                Force Rebuild
              </CardTitle>
              <CardDescription>Retrain using the existing dataset without uploading a new file.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="amber"
                className="w-full gap-2"
                onClick={handleForceRebuild}
                disabled={rebuilding}
              >
                {rebuilding ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Rebuilding…</>
                ) : (
                  <><RefreshCw className="w-4 h-4" />Force Rebuild</>
                )}
              </Button>
              <p className="text-xs text-slate-500 mt-2 text-center">This may take 2–5 minutes</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-400 mb-1">Warning</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Uploading a new dataset will replace the existing training data and trigger automatic model retraining.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
