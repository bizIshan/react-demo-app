import { useState, lazy, Suspense } from 'react';
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
  Code,
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

// ========================================
// With Lazy Loading Demo
// ========================================
function WithLazyLoading() {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">With Lazy Loading</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Initial bundle: Only essential code loaded first</p>
              <p className="text-green-700 text-sm mt-1">Other components load when needed</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-3 rounded-lg text-center border-2 border-green-300">
              <p className="font-bold text-green-600 text-lg">50KB</p>
              <p className="text-gray-500 text-xs">Main App</p>
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded mt-1 inline-block">Loaded</span>
            </div>
            <div className="bg-white p-3 rounded-lg text-center opacity-60">
              <p className="font-bold text-gray-400 text-lg">150KB</p>
              <p className="text-gray-400 text-xs">Chart</p>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded mt-1 inline-block">Deferred</span>
            </div>
            <div className="bg-white p-3 rounded-lg text-center opacity-60">
              <p className="font-bold text-gray-400 text-lg">200KB</p>
              <p className="text-gray-400 text-xs">Editor</p>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded mt-1 inline-block">Deferred</span>
            </div>
            <div className="bg-white p-3 rounded-lg text-center opacity-60">
              <p className="font-bold text-gray-400 text-lg">500KB</p>
              <p className="text-gray-400 text-xs">3D</p>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded mt-1 inline-block">Deferred</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowChart(!showChart)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
              showChart 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            {showChart ? 'Hide' : 'Load'} Chart
          </button>
          <button
            onClick={() => setShowEditor(!showEditor)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
              showEditor 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            {showEditor ? 'Hide' : 'Load'} Editor
          </button>
          <button
            onClick={() => setShow3D(!show3D)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
              show3D 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Box className="w-4 h-4" />
            {show3D ? 'Hide' : 'Load'} 3D Viewer
          </button>
        </div>

        <div className="space-y-4">
          {showChart && (
            <Suspense fallback={<LoadingFallback name="Chart" icon={BarChart3} />}>
              <LazyChart />
            </Suspense>
          )}
          {showEditor && (
            <Suspense fallback={<LoadingFallback name="Editor" icon={FileEdit} />}>
              <LazyEditor />
            </Suspense>
          )}
          {show3D && (
            <Suspense fallback={<LoadingFallback name="3D Viewer" icon={Box} />}>
              <Lazy3DViewer />
            </Suspense>
          )}
          
          {!showChart && !showEditor && !show3D && (
            <div className="text-center py-8 text-gray-500">
              <Download className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Click buttons above to load components on demand</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========================================
// Without Lazy Loading Demo
// ========================================
function WithoutLazyLoading() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-red-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Without Lazy Loading</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Initial bundle: Everything loaded upfront</p>
              <p className="text-red-700 text-sm mt-1">User waits for all code to download</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-3 rounded-lg text-center border border-red-200">
              <p className="font-bold text-red-600 text-lg">50KB</p>
              <p className="text-gray-500 text-xs">Main App</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-red-200">
              <p className="font-bold text-red-600 text-lg">150KB</p>
              <p className="text-gray-500 text-xs">Chart</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-red-200">
              <p className="font-bold text-red-600 text-lg">200KB</p>
              <p className="text-gray-500 text-xs">Editor</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-red-200">
              <p className="font-bold text-red-600 text-lg">500KB</p>
              <p className="text-gray-500 text-xs">3D</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-2 bg-red-200 text-red-800 px-4 py-2 rounded-full font-bold">
              <AlertTriangle className="w-4 h-4" />
              Total: 900KB loaded on first visit
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowDemo(!showDemo)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
        >
          {showDemo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showDemo ? 'Hide' : 'Show'} Components
        </button>

        {showDemo && (
          <div className="mt-4 space-y-3">
            <div className="bg-red-100 rounded-lg p-4 flex items-center gap-4 border border-red-200">
              <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Chart Component</p>
                <p className="text-sm text-red-600">Always bundled (150KB wasted if unused)</p>
              </div>
            </div>
            <div className="bg-red-100 rounded-lg p-4 flex items-center gap-4 border border-red-200">
              <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center">
                <FileEdit className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Code Editor</p>
                <p className="text-sm text-red-600">Always bundled (200KB wasted if unused)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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
            <div className="w-14 h-14 rounded-xl bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
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

        {/* Demos */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <WithLazyLoading />
          <WithoutLazyLoading />
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-8">
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-gray-400" />
              <h3 className="text-lg font-bold text-white">Implementation</h3>
            </div>
          </div>
          <div className="p-6">
            <pre className="text-sm text-gray-200 overflow-x-auto">
{`import { lazy, Suspense } from 'react';

// 1. Create lazy component with dynamic import
const HeavyChart = lazy(() => import('./HeavyChart'));

// 2. Wrap with Suspense to show fallback while loading
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyChart />
    </Suspense>
  );
}

// Route-based code splitting (most impactful)
const routes = [
  { path: '/dashboard', element: lazy(() => import('./Dashboard')) },
  { path: '/settings', element: lazy(() => import('./Settings')) },
  { path: '/analytics', element: lazy(() => import('./Analytics')) },
];

// Named exports need slightly different syntax
const MyComponent = lazy(() => 
  import('./MyModule').then(module => ({ default: module.MyComponent }))
);`}</pre>
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
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Route className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Route-level code splitting</p>
                    <p className="text-sm text-gray-500">Each page loads its own bundle</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Heavy components</p>
                    <p className="text-sm text-gray-500">Charts, editors, 3D viewers, maps</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Modals and dialogs</p>
                    <p className="text-sm text-gray-500">Only load when user opens them</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
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
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Small, frequent components</p>
                    <p className="text-sm text-gray-500">Overhead outweighs benefits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Above-the-fold content</p>
                    <p className="text-sm text-gray-500">Users see loading states instead of content</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Critical path components</p>
                    <p className="text-sm text-gray-500">Essential for initial render</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
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
