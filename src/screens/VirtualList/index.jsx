import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import DemoNavigation from '../../components/DemoNavigation';
import {
  ArrowLeft,
  List,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Layers,
  Eye,
  EyeOff,
  Settings,
  Code,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Monitor,
  MessageSquare,
  Table,
  Infinity,
  Search,
  Users,
  Mail,
  Activity,
} from 'lucide-react';

// Header component
function ScreenHeader({ title, icon: Icon }) {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-cyan-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// Generate sample data
const generateItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
    status: ['Active', 'Inactive', 'Pending'][i % 3],
  }));
};

// ========================================
// Normal List (Without Virtualization)
// ========================================
function NormalList({ items, isEnabled }) {
  // Calculate render time estimate using useMemo instead of useEffect + setState
  const renderTime = useMemo(() => {
    if (!isEnabled) return null;
    return Math.round(items.length * 0.1 + Math.random() * 100);
  }, [isEnabled, items.length]);

  if (!isEnabled) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center px-6">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
            <EyeOff className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-yellow-700 font-bold text-lg mb-2">
            Normal List Disabled
          </p>
          <p className="text-gray-500 text-sm">
            Enable to see the performance difference
          </p>
          <p className="text-red-500 text-xs mt-2 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Warning: May cause browser lag!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderTime && (
        <div className="mb-4 p-4 bg-red-100 rounded-lg border border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-red-700 font-bold">
                ~{renderTime}ms render time
              </span>
              <div className="flex items-center gap-2 text-red-600 text-sm mt-0.5">
                <Database className="w-3 h-3" />
                <span>
                  All {items.length.toLocaleString()} DOM nodes created!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg bg-white">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50"
          >
            <img src={item.avatar} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-sm text-gray-500 truncate">{item.email}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : item.status === 'Inactive'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// Virtualized List (With @tanstack/react-virtual)
// ========================================
function VirtualizedList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
  });

  const visibleCount = virtualizer.getVirtualItems().length;

  return (
    <div>
      <div className="mb-4 p-4 bg-green-100 rounded-lg border border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
            <Zap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <span className="text-green-700 font-bold">~5ms render time</span>
            <div className="flex items-center gap-2 text-green-600 text-sm mt-0.5">
              <Eye className="w-3 h-3" />
              <span>Only ~{visibleCount} DOM nodes visible</span>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={parentRef}
        className="h-96 overflow-y-auto border border-gray-200 rounded-lg bg-white"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = items[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="flex items-center gap-3 px-4 border-b border-gray-100 hover:bg-gray-50"
              >
                <img
                  src={item.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{item.email}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : item.status === 'Inactive'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function VirtualListScreen() {
  const [itemCount, setItemCount] = useState(10000);
  const [normalEnabled, setNormalEnabled] = useState(false);

  const items = useMemo(() => generateItems(itemCount), [itemCount]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Virtual Lists & Windowing" icon={List} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-linear-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-cyan-500 text-white flex items-center justify-center flex-shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                What is Virtualization?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Virtualization (or "windowing") only renders items that are
                visible in the viewport. Instead of creating 10,000 DOM nodes,
                it creates ~15 and reuses them as you scroll. This dramatically
                improves performance for large lists.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg text-center border border-red-200">
                  <TrendingDown className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-red-500">10,000</p>
                  <p className="text-sm text-gray-600">DOM nodes (normal)</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center border border-green-200">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-500">~15</p>
                  <p className="text-sm text-gray-600">
                    DOM nodes (virtualized)
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center border border-blue-200">
                  <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-500">99.8%</p>
                  <p className="text-sm text-gray-600">Less DOM operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-indigo-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-white" />
              <h3 className="text-lg font-bold text-white">
                How Virtualization Works
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">
                  1. Detect Viewport
                </h4>
                <p className="text-sm text-gray-600">
                  Calculate which items are visible in the scroll container
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <Layers className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">
                  2. Render Visible
                </h4>
                <p className="text-sm text-gray-600">
                  Only create DOM nodes for visible items + small buffer
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">
                  3. Track Scroll
                </h4>
                <p className="text-sm text-gray-600">
                  Listen for scroll events and recalculate visible range
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">4. Reuse Nodes</h4>
                <p className="text-sm text-gray-600">
                  Update existing elements with new data as user scrolls
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gray-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-white" />
              <h3 className="text-lg font-bold text-white">
                Test Configuration
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-end gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Database className="w-4 h-4" />
                  Item Count
                </label>
                <select
                  value={itemCount}
                  onChange={(e) => {
                    setItemCount(Number(e.target.value));
                    setNormalEnabled(false);
                  }}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 font-medium bg-gray-50"
                >
                  <option value={1000}>1,000 items</option>
                  <option value={5000}>5,000 items</option>
                  <option value={10000}>10,000 items</option>
                  <option value={50000}>50,000 items</option>
                  <option value={100000}>100,000 items</option>
                </select>
              </div>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input
                  type="checkbox"
                  id="enableNormal"
                  checked={normalEnabled}
                  onChange={(e) => setNormalEnabled(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="enableNormal"
                  className="text-sm font-medium text-gray-700"
                >
                  <span className="flex items-center gap-2">
                    Enable normal list
                    <span className="flex items-center gap-1 text-red-600 text-xs">
                      <AlertTriangle className="w-3 h-3" />
                      may freeze browser
                    </span>
                  </span>
                </label>
              </div>
              <div className="ml-auto flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span className="font-bold text-lg">
                  {items.length.toLocaleString()}
                </span>
                <span className="text-sm">total items</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Side-by-side dark panels ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Panel 1 — WITHOUT virtualization */}
          <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-red-500">
            <div className="flex items-center gap-2 px-4 py-3 bg-red-500">
              <XCircle className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">
                Without Virtualization — renders ALL nodes
              </span>
            </div>

            {/* Live demo */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-start gap-2 p-3 bg-red-900/30 rounded-lg border border-red-500/30 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-xs">
                  <strong>
                    All {itemCount.toLocaleString()} DOM nodes are created at
                    once.
                  </strong>{' '}
                  Enable the list above to see the performance hit — slow
                  render, high memory, janky scroll.
                </p>
              </div>
              <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>
              <NormalList items={items} isEnabled={normalEnabled} />
              {!normalEnabled && (
                <p className="text-yellow-400 text-xs mt-2 text-center">
                  Enable &quot;normal list&quot; in the controls above to see
                  the live demo
                </p>
              )}
            </div>

            {/* Code snippet */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <p className="text-gray-500 mb-2">
                {'// renders every item into the DOM at once'}
              </p>
              <p>
                <span className="text-purple-400">function </span>
                <span className="text-yellow-300">NormalList</span>
                <span className="text-gray-300">({'{ '}</span>
                <span className="text-white">items</span>
                <span className="text-gray-300">
                  {' }}) '}
                  {'{'}
                </span>
              </p>
              <p className="pl-4 mt-1 text-gray-300">return (</p>
              <p className="pl-8">
                <span className="text-gray-300">&lt;div </span>
                <span className="text-yellow-200">style</span>
                <span className="text-gray-300">={'{{'} </span>
                <span className="text-white">height</span>
                <span className="text-gray-300">: </span>
                <span className="text-orange-400">400</span>
                <span className="text-gray-300">, </span>
                <span className="text-white">overflow</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">&apos;auto&apos;</span>
                <span className="text-gray-300"> {'}}'}&gt;</span>
              </p>
              <p className="pl-12">
                <span className="text-gray-300">{'{'}</span>
                <span className="text-white">items</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-200">map</span>
                <span className="text-gray-300">((</span>
                <span className="text-white">item</span>
                <span className="text-gray-300">) =&gt; (</span>
              </p>
              <p className="pl-16">
                <span className="text-gray-300">&lt;div </span>
                <span className="text-yellow-200">key</span>
                <span className="text-gray-300">
                  ={'{'}item.id{'}'}&gt;
                </span>
              </p>
              <p className="pl-20 text-gray-300">
                {'{'}
                <span className="text-white">item.name</span>
                {'}'} — {'{'}
                <span className="text-white">item.email</span>
                {'}'}
              </p>
              <p className="pl-16 text-gray-300">&lt;/div&gt;</p>
              <p className="pl-12 text-gray-300">))</p>
              <p className="pl-12 text-gray-300">{'}'}</p>
              <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
              <p className="pl-4 text-gray-300">);</p>
              <p className="text-gray-300">{'}'}</p>
              <p className="mt-3 text-red-400 text-xs flex items-start gap-1.5">
                <span className="shrink-0">⚠</span>
                <span>
                  Creates ALL {itemCount.toLocaleString()} DOM nodes immediately
                  — no matter how many are visible!
                </span>
              </p>
            </div>
          </div>

          {/* Panel 2 — WITH virtualization */}
          <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-green-500">
            <div className="flex items-center gap-2 px-4 py-3 bg-green-500">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">
                With Virtualization — @tanstack/react-virtual
              </span>
            </div>

            {/* Live demo */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-start gap-2 p-3 bg-green-900/30 rounded-lg border border-green-500/30 mb-3">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <p className="text-green-300 text-xs">
                  <strong>Instant render regardless of list size.</strong>{' '}
                  Scroll down — only ~15 DOM nodes exist at any time. Off-screen
                  rows are recycled as you scroll.
                </p>
              </div>
              <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>
              <VirtualizedList items={items} />
            </div>

            {/* Code snippet */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <p className="text-gray-500 mb-2">
                {'// only renders the ~15 visible rows at any time'}
              </p>
              <p>
                <span className="text-purple-400">import </span>
                <span className="text-gray-300">{'{ '}</span>
                <span className="text-yellow-200">useVirtualizer</span>
                <span className="text-gray-300">{' } '}</span>
                <span className="text-purple-400">from </span>
                <span className="text-green-400">
                  &apos;@tanstack/react-virtual&apos;
                </span>
                <span className="text-gray-300">;</span>
              </p>
              <p className="mt-2">
                <span className="text-purple-400">function </span>
                <span className="text-yellow-300">VirtualizedList</span>
                <span className="text-gray-300">({'{ '}</span>
                <span className="text-white">items</span>
                <span className="text-gray-300">
                  {' }}) '}
                  {'{'}
                </span>
              </p>
              <p className="pl-4 mt-1">
                <span className="text-purple-400">const </span>
                <span className="text-white">parentRef</span>
                <span className="text-gray-300"> = </span>
                <span className="text-yellow-200">useRef</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">null</span>
                <span className="text-gray-300">);</span>
              </p>
              <p className="pl-4 mt-2">
                <span className="text-purple-400">const </span>
                <span className="text-white">virtualizer</span>
                <span className="text-gray-300"> = </span>
                <span className="bg-yellow-400/20 border border-yellow-400/40 rounded px-1 text-yellow-200">
                  useVirtualizer
                </span>
                <span className="text-gray-300">{'({'}</span>
              </p>
              <p className="pl-8">
                <span className="text-white">count</span>
                <span className="text-gray-300">: </span>
                <span className="text-white">items</span>
                <span className="text-gray-300">.length,</span>
                <span className="text-gray-500 ml-2">{'// total rows'}</span>
              </p>
              <p className="pl-8">
                <span className="text-white">getScrollElement</span>
                <span className="text-gray-300">: () =&gt; </span>
                <span className="text-white">parentRef</span>
                <span className="text-gray-300">.current,</span>
              </p>
              <p className="pl-8">
                <span className="text-white">estimateSize</span>
                <span className="text-gray-300">: () =&gt; </span>
                <span className="text-orange-400">64</span>
                <span className="text-gray-300">,</span>
                <span className="text-gray-500 ml-2">
                  {'// row height (px)'}
                </span>
              </p>
              <p className="pl-8">
                <span className="text-white">overscan</span>
                <span className="text-gray-300">: </span>
                <span className="text-orange-400">5</span>
                <span className="text-gray-300">,</span>
                <span className="text-gray-500 ml-2">
                  {'// extra rows above/below viewport'}
                </span>
              </p>
              <p className="pl-4 text-gray-300">{'});'}</p>
              <p className="pl-4 mt-2 text-gray-300">return (</p>
              <p className="pl-8">
                <span className="text-gray-300">&lt;div </span>
                <span className="text-yellow-200">ref</span>
                <span className="text-gray-300">
                  ={'{'}parentRef{'}'}{' '}
                </span>
                <span className="text-yellow-200">style</span>
                <span className="text-gray-300">={'{{'} </span>
                <span className="text-white">height</span>
                <span className="text-gray-300">: </span>
                <span className="text-orange-400">400</span>
                <span className="text-gray-300">, </span>
                <span className="text-white">overflow</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">&apos;auto&apos;</span>
                <span className="text-gray-300"> {'}}'}&gt;</span>
              </p>
              <p className="pl-12">
                <span className="text-gray-300">&lt;div </span>
                <span className="text-yellow-200">style</span>
                <span className="text-gray-300">={'{{'} </span>
                <span className="text-white">height</span>
                <span className="text-gray-300">: </span>
                <span className="text-white">virtualizer</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-200">getTotalSize</span>
                <span className="text-gray-300">() {'}}'}&gt;</span>
                <span className="text-gray-500 ml-2">
                  {'// full scroll height'}
                </span>
              </p>
              <p className="pl-16">
                <span className="text-gray-300">{'{'}</span>
                <span className="text-white">virtualizer</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-200">getVirtualItems</span>
                <span className="text-gray-300">().</span>
                <span className="text-yellow-200">map</span>
                <span className="text-gray-300">((</span>
                <span className="text-white">row</span>
                <span className="text-gray-300">) =&gt; (</span>
              </p>
              <p className="pl-20">
                <span className="text-gray-300">&lt;div </span>
                <span className="text-yellow-200">key</span>
                <span className="text-gray-300">={'{'}</span>
                <span className="text-white">row</span>
                <span className="text-gray-300">.key{'}'}</span>
              </p>
              <p className="pl-24">
                <span className="text-yellow-200">style</span>
                <span className="text-gray-300">={'{{'} </span>
                <span className="text-white">position</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">&apos;absolute&apos;</span>
                <span className="text-gray-300">,</span>
              </p>
              <p className="pl-24">
                <span className="text-white">transform</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">{'`translateY(${'}</span>
                <span className="text-yellow-200">row</span>
                <span className="text-gray-300">.start</span>
                <span className="text-green-400">{'px)`'}</span>
                <span className="text-gray-300">,</span>
              </p>
              <p className="pl-24">
                <span className="text-white">height</span>
                <span className="text-gray-300">: </span>
                <span className="text-yellow-200">row</span>
                <span className="text-gray-300">.size {'}}'}</span>
                <span className="text-gray-300">&gt;</span>
              </p>
              <p className="pl-28 text-gray-300">
                {'{'}
                <span className="text-white">items</span>[
                <span className="text-white">row</span>.index].name{'}'}
              </p>
              <p className="pl-20 text-gray-300">&lt;/div&gt;</p>
              <p className="pl-16 text-gray-300">))</p>
              <p className="pl-16 text-gray-300">{'}'}</p>
              <p className="pl-12 text-gray-300">&lt;/div&gt;</p>
              <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
              <p className="pl-4 text-gray-300">);</p>
              <p className="text-gray-300">{'}'}</p>
              <p className="mt-3 text-green-400 text-xs flex items-start gap-1.5">
                <span className="shrink-0">✓</span>
                <span>
                  Only ~15 DOM nodes exist at any time — regardless of total
                  list size!
                </span>
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
                <h3 className="text-lg font-bold text-white">
                  Use Virtualization When:
                </h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <List className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Lists with 100+ items
                    </p>
                    <p className="text-sm text-gray-500">
                      Large datasets that would create many DOM nodes
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Table className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Tables with many rows
                    </p>
                    <p className="text-sm text-gray-500">
                      Data grids, spreadsheet-like interfaces
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Infinity className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Infinite scroll feeds
                    </p>
                    <p className="text-sm text-gray-500">
                      Social media feeds, product listings
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Chat message history
                    </p>
                    <p className="text-sm text-gray-500">
                      Long conversation threads
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-amber-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">
                  Consider Tradeoffs:
                </h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Added complexity
                    </p>
                    <p className="text-sm text-gray-500">
                      More code to maintain and debug
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Ctrl+F limitations
                    </p>
                    <p className="text-sm text-gray-500">
                      Browser search won't find off-screen content
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Accessibility concerns
                    </p>
                    <p className="text-sm text-gray-500">
                      Screen readers may have difficulty
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Dynamic heights</p>
                    <p className="text-sm text-gray-500">
                      Variable row heights need extra configuration
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Libraries */}
        <div className="bg-gray-800 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold">
              Popular Virtualization Libraries
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-cyan-500/20 rounded-lg p-4 border border-cyan-500/30">
              <h4 className="font-bold text-cyan-300 mb-2">
                @tanstack/react-virtual
              </h4>
              <p className="text-gray-300 text-sm mb-2">
                Headless, hooks-based virtualization. Full control over
                rendering.
              </p>
              <span className="text-xs bg-cyan-500/30 px-2 py-1 rounded text-cyan-200">
                Recommended
              </span>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
              <h4 className="font-bold text-purple-300 mb-2">react-window</h4>
              <p className="text-gray-300 text-sm mb-2">
                Lightweight, component-based solution by bvaughn.
              </p>
              <span className="text-xs bg-purple-500/30 px-2 py-1 rounded text-purple-200">
                Popular Choice
              </span>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-500/30">
              <h4 className="font-bold text-orange-300 mb-2">react-virtuoso</h4>
              <p className="text-gray-300 text-sm mb-2">
                Feature-rich with variable sizes, grouping, and more.
              </p>
              <span className="text-xs bg-orange-500/30 px-2 py-1 rounded text-orange-200">
                Full Featured
              </span>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
