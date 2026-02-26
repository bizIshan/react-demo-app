import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import DemoNavigation from '../../components/DemoNavigation';
import {
  ArrowLeft,
  Download,
  Package,
  Zap,
  Timer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  TrendingDown,
  TrendingUp,
  BarChart3,
  FileEdit,
  Box,
  Eye,
  EyeOff,
  Loader2,
  FileCode,
  Settings,
  LayoutDashboard,
  MessageSquare,
  SplitSquareVertical,
  Layers,
  Gauge,
  Route
} from 'lucide-react';

// Header component
function ScreenHeader({ title, icon: Icon }) {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-purple-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// Simulated heavy components with artificial delay
const createHeavyComponent = (name, IconComponent, delay, color) => {
  return lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          default: function Component() {
            const bundleSize = Math.floor(Math.random() * 200 + 100);
            return (
              <div className={`bg-linear-to-r from-${color}-100 to-${color}-50 rounded-xl p-8 text-center border border-${color}-200`}>
                <div className={`w-16 h-16 rounded-full bg-${color}-500 text-white flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{name} Loaded!</h3>
                <p className="text-gray-600 mb-4">This component was loaded on demand</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    ~{bundleSize}KB saved
                  </div>
                  <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    {delay}ms load time
                  </div>
                </div>
              </div>
            );
          }
        });
      }, delay);
    });
  });
};

const LazyChart = createHeavyComponent('Chart Component', BarChart3, 1500, 'indigo');
const LazyEditor = createHeavyComponent('Code Editor', FileEdit, 2000, 'purple');
const Lazy3DViewer = createHeavyComponent('3D Viewer', Box, 2500, 'pink');

// Loading fallback
function LoadingFallback({ name, icon: Icon }) {
  return (
    <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <p className="font-medium text-gray-700">Loading {name}...</p>
      </div>
      <div className="w-48 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-purple-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
}

// Fires onLoaded callback once when sibling lazy component resolves inside Suspense
function OnLoad({ callback }) {
  useEffect(() => { callback(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// ── Shared badge shown on each lazy-loadable chunk ────────────────────────
function Badge({ loaded }) {
  return loaded ? (
    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded mt-1 inline-flex items-center gap-0.5">
      <CheckCircle className="w-2.5 h-2.5" /> Loaded
    </span>
  ) : (
    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded mt-1 inline-block">Deferred</span>
  );
}

// ── Demo: With Lazy Loading (inner content only) ────────────────────────────
function LazyLoadDemo() {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [viewer3dLoaded, setViewer3dLoaded] = useState(false);

  return (
    <>
      <div className="flex items-start gap-2 p-3 bg-green-900/30 rounded-lg border border-green-500/30 mb-4">
        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
        <p className="text-green-300 text-xs">
          <strong>Initial bundle: only 50 KB.</strong> Each component loads on demand — click a button to fetch it. The badge turns green once it resolves.
        </p>
      </div>

      {/* Bundle size indicator */}
      <div className="grid grid-cols-4 gap-2 text-sm mb-4">
        <div className="bg-gray-800 p-2.5 rounded-lg text-center border-2 border-green-500">
          <p className="font-bold text-green-400 text-base">50KB</p>
          <p className="text-gray-400 text-xs">Main App</p>
          <span className="text-[10px] bg-green-900/50 text-green-400 px-1.5 rounded mt-1 inline-flex items-center gap-0.5">
            <CheckCircle className="w-2.5 h-2.5" /> Loaded
          </span>
        </div>
        <div className={`bg-gray-800 p-2.5 rounded-lg text-center border ${chartLoaded ? 'border-green-500' : 'border-gray-600 opacity-60'}`}>
          <p className={`font-bold text-base ${chartLoaded ? 'text-green-400' : 'text-gray-400'}`}>150KB</p>
          <p className="text-gray-400 text-xs">Chart</p>
          <Badge loaded={chartLoaded} />
        </div>
        <div className={`bg-gray-800 p-2.5 rounded-lg text-center border ${editorLoaded ? 'border-green-500' : 'border-gray-600 opacity-60'}`}>
          <p className={`font-bold text-base ${editorLoaded ? 'text-green-400' : 'text-gray-400'}`}>200KB</p>
          <p className="text-gray-400 text-xs">Editor</p>
          <Badge loaded={editorLoaded} />
        </div>
        <div className={`bg-gray-800 p-2.5 rounded-lg text-center border ${viewer3dLoaded ? 'border-green-500' : 'border-gray-600 opacity-60'}`}>
          <p className={`font-bold text-base ${viewer3dLoaded ? 'text-green-400' : 'text-gray-400'}`}>500KB</p>
          <p className="text-gray-400 text-xs">3D</p>
          <Badge loaded={viewer3dLoaded} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setShowChart(!showChart)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            showChart ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
        >
          <BarChart3 className="w-3 h-3" />
          {showChart ? 'Hide' : 'Load'} Chart
        </button>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            showEditor ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
        >
          <FileEdit className="w-3 h-3" />
          {showEditor ? 'Hide' : 'Load'} Editor
        </button>
        <button
          onClick={() => setShow3D(!show3D)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            show3D ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
        >
          <Box className="w-3 h-3" />
          {show3D ? 'Hide' : 'Load'} 3D
        </button>
      </div>

      <div className="space-y-3">
        {showChart && (
          <Suspense fallback={<LoadingFallback name="Chart" icon={BarChart3} />}>
            <LazyChart />
            {!chartLoaded && <OnLoad callback={() => setChartLoaded(true)} />}
          </Suspense>
        )}
        {showEditor && (
          <Suspense fallback={<LoadingFallback name="Editor" icon={FileEdit} />}>
            <LazyEditor />
            {!editorLoaded && <OnLoad callback={() => setEditorLoaded(true)} />}
          </Suspense>
        )}
        {show3D && (
          <Suspense fallback={<LoadingFallback name="3D Viewer" icon={Box} />}>
            <Lazy3DViewer />
            {!viewer3dLoaded && <OnLoad callback={() => setViewer3dLoaded(true)} />}
          </Suspense>
        )}
        {!showChart && !showEditor && !show3D && (
          <div className="text-center py-6 text-gray-500">
            <Download className="w-10 h-10 mx-auto mb-2 text-gray-600" />
            <p className="text-xs">Click a button above to load components on demand</p>
          </div>
        )}
      </div>
    </>
  );
}

// ── Demo: Without Lazy Loading (inner content only) ─────────────────────────
function EagerLoadDemo() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <div className="flex items-start gap-2 p-3 bg-red-900/30 rounded-lg border border-red-500/30 mb-4">
        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <p className="text-red-300 text-xs">
          <strong>All 900 KB downloads on the first visit</strong> — including components the user may never open. The page stays blank until the entire bundle finishes.
        </p>
      </div>

      {/* Bundle size indicator */}
      <div className="grid grid-cols-4 gap-2 text-sm mb-4">
        {[
          { size: '50KB', label: 'Main App' },
          { size: '150KB', label: 'Chart' },
          { size: '200KB', label: 'Editor' },
          { size: '500KB', label: '3D' },
        ].map(({ size, label }) => (
          <div key={label} className="bg-gray-800 p-2.5 rounded-lg text-center border border-red-500/40">
            <p className="font-bold text-red-400 text-base">{size}</p>
            <p className="text-gray-400 text-xs">{label}</p>
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-1.5 bg-red-900/40 text-red-300 px-3 py-1.5 rounded-full text-xs font-bold border border-red-500/30">
          <AlertTriangle className="w-3 h-3" />
          Total: 900 KB on first visit
        </span>
      </div>

      <button
        onClick={() => setShowDemo(!showDemo)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors mb-3"
      >
        {showDemo ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        {showDemo ? 'Hide' : 'Show'} Components
      </button>

      {showDemo && (
        <div className="space-y-2">
          {[
            { Icon: BarChart3, label: 'Chart Component', note: '150KB wasted if unused' },
            { Icon: FileEdit, label: 'Code Editor', note: '200KB wasted if unused' },
            { Icon: Box, label: '3D Viewer', note: '500KB wasted if unused' },
          ].map((item) => (
            <div key={item.label} className="bg-red-900/20 rounded-lg p-3 flex items-center gap-3 border border-red-500/20">
              <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
                <item.Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-gray-200 text-sm">{item.label}</p>
                <p className="text-xs text-red-400">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function LazyLoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Lazy Loading & Code Splitting" icon={Download} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
              <SplitSquareVertical className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">What is Lazy Loading?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lazy loading defers loading components until they're needed. This reduces the initial bundle size, 
                resulting in faster first page load. Combined with <code className="bg-white px-2 py-1 rounded font-mono text-sm">Suspense</code>, 
                you can show loading states while components load.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg text-center border border-red-200">
                  <TrendingUp className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-1">Without lazy loading</p>
                  <p className="text-2xl font-bold text-red-500">900KB</p>
                  <p className="text-xs text-gray-400">Initial bundle</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center border border-green-200">
                  <TrendingDown className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-1">With lazy loading</p>
                  <p className="text-2xl font-bold text-green-500">50KB</p>
                  <p className="text-xs text-gray-400">Initial bundle</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center border border-blue-200">
                  <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-1">Improvement</p>
                  <p className="text-2xl font-bold text-blue-500">94%</p>
                  <p className="text-xs text-gray-400">Smaller initial load</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-indigo-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-white" />
              <h3 className="text-lg font-bold text-white">How Code Splitting Works</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3 text-lg font-bold text-indigo-600">1</div>
                <h4 className="font-bold text-gray-800 mb-1">Build Time</h4>
                <p className="text-sm text-gray-600">Bundler splits code into separate chunks at build</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3 text-lg font-bold text-indigo-600">2</div>
                <h4 className="font-bold text-gray-800 mb-1">Initial Load</h4>
                <p className="text-sm text-gray-600">Only main bundle loads on first visit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3 text-lg font-bold text-indigo-600">3</div>
                <h4 className="font-bold text-gray-800 mb-1">On Demand</h4>
                <p className="text-sm text-gray-600">Extra chunks load when user needs them</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3 text-lg font-bold text-indigo-600">4</div>
                <h4 className="font-bold text-gray-800 mb-1">Suspense</h4>
                <p className="text-sm text-gray-600">Show loading UI while chunk downloads</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Side-by-side dark panels ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">

          {/* Panel 1 — WITHOUT lazy loading */}
          <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-red-500">
            <div className="flex items-center gap-2 px-4 py-3 bg-red-500">
              <XCircle className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">Without Lazy Loading — 900 KB on first visit</span>
            </div>

            {/* Live demo */}
            <div className="p-4 border-b border-gray-700">
              <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>
              <EagerLoadDemo />
            </div>

            {/* Code snippet */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <p className="text-gray-500 mb-2">{'// ❌ everything bundled upfront — user waits'}</p>
              <p>
                <span className="text-purple-400">import </span>
                <span className="text-yellow-300">HeavyChart</span>
                <span className="text-purple-400"> from </span>
                <span className="text-green-400">&apos;./HeavyChart&apos;</span>
                <span className="text-gray-300">;</span>
                <span className="text-gray-500 ml-2">{'// 150KB'}</span>
              </p>
              <p>
                <span className="text-purple-400">import </span>
                <span className="text-yellow-300">CodeEditor</span>
                <span className="text-purple-400"> from </span>
                <span className="text-green-400">&apos;./CodeEditor&apos;</span>
                <span className="text-gray-300">;</span>
                <span className="text-gray-500 ml-2">{'// 200KB'}</span>
              </p>
              <p>
                <span className="text-purple-400">import </span>
                <span className="text-yellow-300">Viewer3D</span>
                <span className="text-purple-400"> from </span>
                <span className="text-green-400">&apos;./Viewer3D&apos;</span>
                <span className="text-gray-300">;</span>
                <span className="text-gray-500 ml-2">{'// 500KB'}</span>
              </p>
              <p className="mt-3 text-gray-500">{'// all 900KB downloads before page shows'}</p>
              <p className="mt-2">
                <span className="text-purple-400">function </span>
                <span className="text-yellow-300">App</span>
                <span className="text-gray-300">() {'{'}</span>
              </p>
              <p className="pl-4 text-gray-300">return (</p>
              <p className="pl-8">
                <span className="text-gray-300">&lt;</span>
                <span className="bg-red-500/20 border border-red-500/40 rounded px-1 text-red-300">HeavyChart</span>
                <span className="text-gray-300"> /&gt;</span>
                <span className="text-gray-500 ml-2">{'// always in bundle'}</span>
              </p>
              <p className="pl-4 text-gray-300">);</p>
              <p className="text-gray-300">{'}'}</p>
              <p className="mt-4 text-red-400 text-xs flex items-start gap-1.5">
                <span className="shrink-0">⚠</span>
                <span>Every component is included in the initial JS bundle whether the user visits it or not.</span>
              </p>
            </div>
          </div>

          {/* Panel 2 — WITH lazy loading */}
          <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-green-500">
            <div className="flex items-center gap-2 px-4 py-3 bg-green-500">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">With Lazy Loading — 50 KB initial, rest on demand</span>
            </div>

            {/* Live demo */}
            <div className="p-4 border-b border-gray-700">
              <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>
              <LazyLoadDemo />
            </div>

            {/* Code snippet */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <p className="text-gray-500 mb-2">{'// ✅ only loads when user requests it'}</p>
              <p>
                <span className="text-purple-400">const </span>
                <span className="text-yellow-300">HeavyChart</span>
                <span className="text-gray-300"> = </span>
                <span className="bg-green-500/20 border border-green-500/40 rounded px-1 text-green-300">lazy</span>
                <span className="text-gray-300">(() =&gt;</span>
              </p>
              <p className="pl-4">
                <span className="text-yellow-200">import</span>
                <span className="text-gray-300">(</span>
                <span className="text-green-400">&apos;./HeavyChart&apos;</span>
                <span className="text-gray-300">));</span>
                <span className="text-gray-500 ml-2">{'// separate chunk'}</span>
              </p>
              <p className="mt-3">
                <span className="text-purple-400">function </span>
                <span className="text-yellow-300">App</span>
                <span className="text-gray-300">() {'{'}</span>
              </p>
              <p className="pl-4 text-gray-300">return (</p>
              <p className="pl-8">
                <span className="text-gray-300">&lt;</span>
                <span className="bg-green-500/20 border border-green-500/40 rounded px-1 text-green-300">Suspense</span>
                <span className="text-gray-300"> </span>
                <span className="text-yellow-200">fallback</span>
                <span className="text-gray-300">={'{'}&lt;</span>
                <span className="text-yellow-300">Spinner</span>
                <span className="text-gray-300"> /&gt;{'}'}&gt;</span>
              </p>
              <p className="pl-12">
                <span className="text-gray-300">&lt;</span>
                <span className="text-yellow-300">HeavyChart</span>
                <span className="text-gray-300"> /&gt;</span>
                <span className="text-gray-500 ml-2">{'// fetched on demand'}</span>
              </p>
              <p className="pl-8">
                <span className="text-gray-300">&lt;/</span>
                <span className="text-green-300">Suspense</span>
                <span className="text-gray-300">&gt;</span>
              </p>
              <p className="pl-4 text-gray-300">);</p>
              <p className="text-gray-300">{'}'}</p>
              <p className="mt-4 text-green-400 text-xs flex items-start gap-1.5">
                <span className="shrink-0">✓</span>
                <span>Each chunk downloads only when needed. Initial page load stays fast regardless of how many heavy components exist.</span>
              </p>
            </div>
          </div>
        </div>

        {/* When to Use */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">Use Lazy Loading For:</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Route className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Route-level code splitting</p>
                    <p className="text-sm text-gray-500">Each page loads its own bundle</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Heavy components</p>
                    <p className="text-sm text-gray-500">Charts, editors, 3D viewers, maps</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Modals and dialogs</p>
                    <p className="text-sm text-gray-500">Only load when user opens them</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Settings className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Admin/settings pages</p>
                    <p className="text-sm text-gray-500">Most users never visit these</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-amber-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">Don't Lazy Load:</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Small, frequent components</p>
                    <p className="text-sm text-gray-500">Overhead outweighs benefits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Eye className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Above-the-fold content</p>
                    <p className="text-sm text-gray-500">Users see loading states instead of content</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Critical path components</p>
                    <p className="text-sm text-gray-500">Essential for initial render</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Gauge className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Components under 10KB</p>
                    <p className="text-sm text-gray-500">Network overhead exceeds savings</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-gray-800 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileCode className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold">Key Takeaways</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
              <h4 className="font-bold text-purple-300 mb-2">lazy()</h4>
              <p className="text-gray-300 text-sm">Creates a component that loads dynamically using dynamic import()</p>
            </div>
            <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-500/30">
              <h4 className="font-bold text-pink-300 mb-2">Suspense</h4>
              <p className="text-gray-300 text-sm">Shows fallback UI while lazy component is loading</p>
            </div>
            <div className="bg-indigo-500/20 rounded-lg p-4 border border-indigo-500/30">
              <h4 className="font-bold text-indigo-300 mb-2">Route Splitting</h4>
              <p className="text-gray-300 text-sm">Most impactful - split code at the route level for best results</p>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
