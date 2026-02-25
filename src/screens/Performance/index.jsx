import { useState, useMemo, useCallback, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  Brain,
  Link2,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Code,
  BookOpen,
  RefreshCw,
  Lightbulb,
  Target,
} from 'lucide-react';
import DemoNavigation from '../../components/DemoNavigation';

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
          {Icon && <Icon className="w-6 h-6 text-yellow-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Example 1 — ExpensiveComponent WITHOUT useMemo
// ========================================
function ExpensiveComponentNoMemo() {
  const calcCount = useRef(0);
  calcCount.current += 1;

  // Expensive calculation — runs on EVERY render
  const sum = () => {
    console.log('Calculating sum...');
    let i = 0;
    for (i = 0; i <= 500000000; i++) {
      i = i + 1;
    }
    return i;
  };

  const t0 = performance.now();
  const total = sum();
  const elapsed = Math.round(performance.now() - t0);

  return (
    <div className="mt-3 p-4 bg-red-900/40 border border-red-500/50 rounded-lg">
      <p className="text-red-300 font-mono text-xs mb-3 flex items-center gap-2">
        <XCircle className="w-3.5 h-3.5" />
        {'<ExpensiveComponent />'}
      </p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-black/40 rounded p-2">
          <p className="text-gray-400 text-xs mb-1">sum</p>
          <p className="text-red-300 font-bold font-mono text-xs">{total}</p>
        </div>
        <div className="bg-black/40 rounded p-2">
          <p className="text-gray-400 text-xs mb-1">Calculated</p>
          <p className="text-red-400 font-bold">{calcCount.current}×</p>
        </div>
        <div className="bg-black/40 rounded p-2">
          <p className="text-gray-400 text-xs mb-1">Time</p>
          <p className="text-red-400 font-bold">{elapsed}ms</p>
        </div>
      </div>
    </div>
  );
}

function WithoutMemoExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-red-500">
      <div className="flex items-center gap-2 px-4 py-3 bg-red-500">
        <XCircle className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm">
          Example 1 — Without useMemo
        </span>
      </div>

      {/* Code snippet */}
      <div className="p-4 font-mono text-xs leading-relaxed border-b border-gray-700">
        <p className="text-gray-500 mb-1">
          {'// eslint-disable-next-line react/display-name'}
        </p>
        <p>
          <span className="text-purple-400">const </span>
          <span className="text-yellow-300">ExpensiveComponent</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-gray-500">
            {'// Expensive calculation function'}
          </span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">sum</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-8">
          <span className="text-blue-400">console</span>
          <span className="text-gray-300">.log(</span>
          <span className="text-green-400">&quot;Calculating sum...&quot;</span>
          <span className="text-gray-300">);</span>
        </p>
        <p className="pl-8">
          <span className="text-purple-400">let </span>
          <span className="text-white">i</span>
          <span className="text-gray-300"> = 0;</span>
        </p>
        <p className="pl-8">
          <span className="text-purple-400">for </span>
          <span className="text-gray-300">(i = 0; i &lt;= </span>
          <span className="text-orange-400">1000000000</span>
          <span className="text-gray-300">; i++) {'{'}</span>
        </p>
        <p className="pl-12">
          <span className="text-white">i</span>
          <span className="text-gray-300"> = i + 1;</span>
        </p>
        <p className="pl-8 text-gray-300">{'}'}</p>
        <p className="pl-8">
          <span className="text-purple-400">return </span>
          <span className="text-white">i</span>
          <span className="text-gray-300">;</span>
        </p>
        <p className="pl-4 text-gray-300">{'};'}</p>
        <p className="pl-4 mt-1">
          <span className="text-purple-400">const </span>
          <span className="text-white">total</span>
          <span className="text-gray-300"> = </span>
          <span className="text-yellow-200">sum</span>
          <span className="text-gray-300">();</span>
        </p>
        <p className="pl-4 mt-1">
          <span className="text-purple-400">return </span>
          <span className="text-gray-300">&lt;p&gt; sum: {'{'}</span>
          <span className="text-white">total</span>
          <span className="text-gray-300">{'}'} &lt;/p&gt;;</span>
        </p>
        <p className="text-gray-300">{'};'}</p>
        <p className="mt-3 text-gray-500">{'// MemoParentComponent'}</p>
        <p>
          <span className="text-purple-400">const </span>
          <span className="text-yellow-300">MemoParentComponent</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-gray-300">[</span>
          <span className="text-white">count</span>
          <span className="text-gray-300">, </span>
          <span className="text-white">setCount</span>
          <span className="text-gray-300">] = </span>
          <span className="text-yellow-200">useState</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-1 inline-block">
          &lt;ExpensiveComponent /&gt;
        </p>
        <p className="pl-12 mt-1 text-gray-300">
          &lt;button onClick={'{'}
          <span className="text-gray-300">() =&gt; setCount(count + 1)</span>
          {'}'}&gt;
        </p>
        <p className="pl-16 text-gray-300">Re-render Parent</p>
        <p className="pl-12 text-gray-300">&lt;/button&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;p&gt;Parent re-renders: {'{'}
          <span className="text-orange-400">count</span>
          {'}'}&lt;/p&gt;
        </p>
        <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'};'}</p>
      </div>

      {/* Live Demo */}
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-2">▶ Live Demo</p>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded text-sm transition-colors"
          >
            Re-render Parent
          </button>
          <span className="text-white text-sm font-mono">
            Parent re-renders:{' '}
            <span className="text-orange-400 font-bold">{count}</span>
          </span>
        </div>
        <ExpensiveComponentNoMemo />
        <div className="mt-3 flex items-start gap-2 p-3 bg-red-900/30 rounded-lg border border-red-500/30">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-300 text-xs">
            <strong>sum() runs on EVERY parent re-render</strong> — even though
            the result never changes! Notice the &quot;Calculated&quot; count
            matches parent re-renders.
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Example 2 — ExpensiveComponent WITH useMemo
// ========================================
function ExpensiveComponentWithMemo() {
  const calcCount = useRef(0);

  // Expensive calculation — cached with useMemo
  const total = useMemo(() => {
    calcCount.current += 1;
    console.log('Calculating sum...');
    let i = 0;
    for (i = 0; i <= 500000000; i++) {
      i = i + 1;
    }
    return i;
  }, []); // [] → calculate ONCE, return cached value forever

  return (
    <div className="mt-3 p-4 bg-green-900/40 border border-green-500/50 rounded-lg">
      <p className="text-green-300 font-mono text-xs mb-3 flex items-center gap-2">
        <CheckCircle className="w-3.5 h-3.5" />
        {'<ExpensiveComponent />'}
      </p>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="bg-black/40 rounded p-2">
          <p className="text-gray-400 text-xs mb-1">sum</p>
          <p className="text-green-300 font-bold font-mono text-xs">{total}</p>
        </div>
        <div className="bg-black/40 rounded p-2">
          <p className="text-gray-400 text-xs mb-1">Calculated</p>
          <p className="text-green-400 font-bold">
            {calcCount.current}× only ✓
          </p>
        </div>
      </div>
    </div>
  );
}

function WithMemoExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-green-500">
      <div className="flex items-center gap-2 px-4 py-3 bg-green-500">
        <CheckCircle className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm">
          Example 2 — With useMemo
        </span>
      </div>

      {/* Code snippet */}
      <div className="p-4 font-mono text-xs leading-relaxed border-b border-gray-700">
        <p className="text-gray-500 mb-1">
          {'// eslint-disable-next-line react/display-name'}
        </p>
        <p>
          <span className="text-purple-400">const </span>
          <span className="text-yellow-300">ExpensiveComponent</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-gray-500">
            {'// Expensive calculation function'}
          </span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">sum</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-8">
          <span className="text-blue-400">console</span>
          <span className="text-gray-300">.log(</span>
          <span className="text-green-400">&quot;Calculating sum...&quot;</span>
          <span className="text-gray-300">);</span>
        </p>
        <p className="pl-8">
          <span className="text-purple-400">let </span>
          <span className="text-white">i</span>
          <span className="text-gray-300"> = 0;</span>
        </p>
        <p className="pl-8">
          <span className="text-purple-400">for </span>
          <span className="text-gray-300">(i = 0; i &lt;= </span>
          <span className="text-orange-400">1000000000</span>
          <span className="text-gray-300">; i++) {'{'}</span>
        </p>
        <p className="pl-12">
          <span className="text-white">i</span>
          <span className="text-gray-300"> = i + 1;</span>
        </p>
        <p className="pl-8 text-gray-300">{'}'}</p>
        <p className="pl-8">
          <span className="text-purple-400">return </span>
          <span className="text-white">i</span>
          <span className="text-gray-300">;</span>
        </p>
        <p className="pl-4 text-gray-300">{'};'}</p>
        <p className="pl-4 mt-1">
          <span className="text-purple-400">const </span>
          <span className="text-white">total</span>
          <span className="text-gray-300"> = </span>
          <span className="bg-yellow-400/20 border border-yellow-400/40 rounded px-1 text-yellow-200">
            useMemo
          </span>
          <span className="text-gray-300">(() =&gt; </span>
          <span className="text-yellow-200">sum</span>
          <span className="text-gray-300">(), []);</span>
        </p>
        <p className="pl-4 mt-1">
          <span className="text-purple-400">return </span>
          <span className="text-gray-300">&lt;p&gt; sum: {'{'}</span>
          <span className="text-white">total</span>
          <span className="text-gray-300">{'}'} &lt;/p&gt;;</span>
        </p>
        <p className="text-gray-300">{'};'}</p>
        <p className="mt-3 text-gray-500">{'// MemoParentComponent'}</p>
        <p>
          <span className="text-purple-400">const </span>
          <span className="text-yellow-300">MemoParentComponent</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-gray-300">[</span>
          <span className="text-white">count</span>
          <span className="text-gray-300">, </span>
          <span className="text-white">setCount</span>
          <span className="text-gray-300">] = </span>
          <span className="text-yellow-200">useState</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-1 inline-block">
          &lt;ExpensiveComponent /&gt;
        </p>
        <p className="pl-12 mt-1 text-gray-300">
          &lt;button onClick={'{'}
          <span className="text-gray-300">() =&gt; setCount(count + 1)</span>
          {'}'}&gt;
        </p>
        <p className="pl-16 text-gray-300">Re-render Parent</p>
        <p className="pl-12 text-gray-300">&lt;/button&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;p&gt;Parent re-renders: {'{'}
          <span className="text-orange-400">count</span>
          {'}'}&lt;/p&gt;
        </p>
        <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'};'}</p>
      </div>

      {/* Live Demo */}
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-2">▶ Live Demo</p>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded text-sm transition-colors"
          >
            Re-render Parent
          </button>
          <span className="text-white text-sm font-mono">
            Parent re-renders:{' '}
            <span className="text-orange-400 font-bold">{count}</span>
          </span>
        </div>
        <ExpensiveComponentWithMemo />
        <div className="mt-3 flex items-start gap-2 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
          <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-green-300 text-xs">
            <strong>sum() runs ONCE and is cached by useMemo</strong> — no
            matter how many times the parent re-renders, &quot;Calculated&quot;
            stays at 1!
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// useMemo Demo
// ========================================
function UseMemoDemo() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-7 h-7 text-white" />
            <h3 className="text-xl font-bold text-white">
              useMemo — Memoize Expensive Calculations
            </h3>
          </div>
          <a
            href="https://react.dev/reference/react/useMemo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            React Docs
          </a>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-800 font-medium">What is useMemo?</p>
              <p className="text-blue-700 text-sm mt-1">
                <code className="bg-blue-100 px-1 rounded font-mono">
                  useMemo
                </code>{' '}
                caches the result of a slow calculation between renders. It only
                recomputes when its <strong>dependencies</strong> change —
                returning the cached value instantly for every other render.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <WithoutMemoExample />
          <WithMemoExample />
        </div>

        <div className="flex items-center justify-end">
          <a
            href="https://react.dev/reference/react/useMemo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Read full useMemo docs on react.dev →
          </a>
        </div>
      </div>
    </div>
  );
}

// ========================================
// useCallback Demo
// ========================================

// Button child — memo wrapped so it only re-renders when its props (onClick ref) change
const ButtonNoCallback = memo(function Button({ onClick, children }) {
  const renderCount = useRef(0);
  console.log(`Rendering button: ${children}`);
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-5 mb-2 font-bold rounded text-black text-sm transition-colors ${
        children === 'Increment'
          ? 'bg-green-400 hover:bg-green-300'
          : 'bg-red-400 hover:bg-red-300'
      }`}
    >
      {children}{' '}
      <span className="text-xs font-normal opacity-70">
        (rendered {++renderCount.current}×)
      </span>
    </button>
  );
});

const ButtonWithCallback = memo(function Button({ onClick, children }) {
  const renderCount = useRef(0);
  console.log(`Rendering button: ${children}`);
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-5 mb-2 font-bold rounded text-black text-sm transition-colors ${
        children === 'Increment'
          ? 'bg-green-400 hover:bg-green-300'
          : 'bg-red-400 hover:bg-red-300'
      }`}
    >
      {children}{' '}
      <span className="text-xs font-normal opacity-70">
        (rendered {++renderCount.current}×)
      </span>
    </button>
  );
});

function WithoutCallbackExample() {
  const [count, setCount] = useState(0);

  // No useCallback — new function reference created on every render
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-red-500">
      <div className="flex items-center gap-2 px-4 py-3 bg-red-500">
        <XCircle className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm">
          Example 1 — Without useCallback
        </span>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-xs leading-relaxed border-b border-gray-700">
        <p>
          <span className="text-purple-400">export default function </span>
          <span className="text-yellow-300">UseCallback</span>
          <span className="text-gray-300">() {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-gray-300">[</span>
          <span className="text-white">count</span>
          <span className="text-gray-300">, </span>
          <span className="text-white">setCount</span>
          <span className="text-gray-300">] = </span>
          <span className="text-yellow-200">useState</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-2 text-gray-500">
          {'// New reference created on EVERY render'}
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">increment</span>
          <span className="text-gray-300"> = () =&gt; </span>
          <span className="text-yellow-200">setCount</span>
          <span className="text-gray-300">((</span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300">) =&gt; </span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300"> + 1);</span>
        </p>
        <p className="pl-4 mt-2 text-gray-500">
          {'// New reference created on EVERY render'}
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">decrement</span>
          <span className="text-gray-300"> = () =&gt; </span>
          <span className="text-yellow-200">setCount</span>
          <span className="text-gray-300">((</span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300">) =&gt; </span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300"> - 1);</span>
        </p>
        <p className="pl-4 mt-2 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;h1&gt;Count: {'{'}
          <span className="text-orange-400">count</span>
          {'}'}&lt;/h1&gt;
        </p>
        <p className="pl-12 text-gray-300">
          &lt;Button <span className="text-yellow-200">onClick</span>={'{'}
          increment{'}'}&gt;Increment&lt;/Button&gt;
        </p>
        <p className="pl-12 text-gray-300">
          &lt;Button <span className="text-yellow-200">onClick</span>={'{'}
          decrement{'}'}&gt;Decrement&lt;/Button&gt;
        </p>
        <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'}'}</p>
        <p className="mt-3 text-gray-500">
          {'// Button component (memo wrapped)'}
        </p>
        <p>
          <span className="text-purple-400">const </span>
          <span className="text-yellow-300">Button</span>
          <span className="text-gray-300"> = ({'{ '}</span>
          <span className="text-white">onClick, children</span>
          <span className="text-gray-300">
            {' }'}) =&gt; {'{'}
          </span>
        </p>
        <p className="pl-4">
          <span className="text-blue-400">console</span>
          <span className="text-gray-300">.log(</span>
          <span className="text-green-400">
            {'`Rendering button: ${children}`'}
          </span>
          <span className="text-gray-300">);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">
          return &lt;button onClick={'{'}onClick{'}'}&gt;{'{'}
          <span className="text-white">children</span>
          {'}'}&lt;/button&gt;;
        </p>
        <p className="text-gray-300">{'};'}</p>
      </div>

      {/* Live Demo */}
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>
        <div className="border-2 border-dashed border-orange-400 rounded-xl p-4 relative">
          <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-orange-400 text-xs font-bold tracking-wide">
            Parent — UseCallback
          </span>
          <p className="text-white text-2xl font-bold text-center mb-3">
            Count: {count}
          </p>
          <div className="border-2 border-dashed border-red-400 rounded-xl p-3 relative">
            <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-red-400 text-xs font-bold tracking-wide">
              Child — Button (memo)
            </span>
            <div className="pt-1">
              <ButtonNoCallback onClick={increment}>Increment</ButtonNoCallback>
              <ButtonNoCallback onClick={decrement}>Decrement</ButtonNoCallback>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2 p-3 bg-red-900/30 rounded-lg border border-red-500/30">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-300 text-xs">
            <strong>Button re-renders on EVERY parent render</strong> — new
            function refs are created each time, so memo() can&apos;t help.
            Watch the render count on the buttons!
          </p>
        </div>
      </div>
    </div>
  );
}

function WithCallbackExample() {
  const [count, setCount] = useState(0);

  // useCallback — stable function reference, only created once
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);
  const decrement = useCallback(
    () => setCount((prevCount) => prevCount - 1),
    []
  );

  return (
    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-green-500">
      <div className="flex items-center gap-2 px-4 py-3 bg-green-500">
        <CheckCircle className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm">
          Example 2 — With useCallback
        </span>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-xs leading-relaxed border-b border-gray-700">
        <p>
          <span className="text-purple-400">export default function </span>
          <span className="text-yellow-300">UseCallback</span>
          <span className="text-gray-300">() {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-gray-300">[</span>
          <span className="text-white">count</span>
          <span className="text-gray-300">, </span>
          <span className="text-white">setCount</span>
          <span className="text-gray-300">] = </span>
          <span className="text-yellow-200">useState</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-2 text-gray-500">
          {'// Memoize the increment function'}
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">increment</span>
          <span className="text-gray-300"> = </span>
          <span className="bg-yellow-400/20 border border-yellow-400/40 rounded px-1 text-yellow-200">
            useCallback
          </span>
          <span className="text-gray-300">(() =&gt; {'{'}</span>
        </p>
        <p className="pl-8">
          <span className="text-yellow-200">setCount</span>
          <span className="text-gray-300">((</span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300">) =&gt; </span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300"> + 1);</span>
        </p>
        <p className="pl-4 text-gray-300">{'}, []);'}</p>
        <p className="pl-4 mt-2 text-gray-500">
          {'// Memoize the decrement function'}
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">decrement</span>
          <span className="text-gray-300"> = </span>
          <span className="bg-yellow-400/20 border border-yellow-400/40 rounded px-1 text-yellow-200">
            useCallback
          </span>
          <span className="text-gray-300">(() =&gt; </span>
          <span className="text-yellow-200">setCount</span>
          <span className="text-gray-300">((</span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300">) =&gt; </span>
          <span className="text-white">prevCount</span>
          <span className="text-gray-300"> - 1), []);</span>
        </p>
        <p className="pl-4 mt-2 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;h1&gt;Count: {'{'}
          <span className="text-orange-400">count</span>
          {'}'}&lt;/h1&gt;
        </p>
        <p className="pl-12 text-gray-300">
          &lt;Button <span className="text-yellow-200">onClick</span>={'{'}
          increment{'}'}&gt;Increment&lt;/Button&gt;
        </p>
        <p className="pl-12 text-gray-300">
          &lt;Button <span className="text-yellow-200">onClick</span>={'{'}
          decrement{'}'}&gt;Decrement&lt;/Button&gt;
        </p>
        <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'}'}</p>
        <p className="mt-3 text-gray-500">
          {'// Button component (memo wrapped)'}
        </p>
        <p>
          <span className="text-purple-400">const </span>
          <span className="text-yellow-300">Button</span>
          <span className="text-gray-300"> = ({'{ '}</span>
          <span className="text-white">onClick, children</span>
          <span className="text-gray-300">
            {' }'}) =&gt; {'{'}
          </span>
        </p>
        <p className="pl-4">
          <span className="text-blue-400">console</span>
          <span className="text-gray-300">.log(</span>
          <span className="text-green-400">
            {'`Rendering button: ${children}`'}
          </span>
          <span className="text-gray-300">);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">
          return &lt;button onClick={'{'}onClick{'}'}&gt;{'{'}
          <span className="text-white">children</span>
          {'}'}&lt;/button&gt;;
        </p>
        <p className="text-gray-300">{'};'}</p>
      </div>

      {/* Live Demo */}
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>
        <div className="border-2 border-dashed border-orange-400 rounded-xl p-4 relative">
          <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-orange-400 text-xs font-bold tracking-wide">
            Parent — UseCallback
          </span>
          <p className="text-white text-2xl font-bold text-center mb-3">
            Count: {count}
          </p>
          <div className="border-2 border-dashed border-green-400 rounded-xl p-3 relative">
            <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-green-400 text-xs font-bold tracking-wide">
              Child — Button (memo)
            </span>
            <div className="pt-1">
              <ButtonWithCallback onClick={increment}>
                Increment
              </ButtonWithCallback>
              <ButtonWithCallback onClick={decrement}>
                Decrement
              </ButtonWithCallback>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
          <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-green-300 text-xs">
            <strong>Button renders only ONCE</strong> — useCallback keeps the
            same function reference, so memo() skips re-renders. The render
            count stays at 1 no matter how many times you increment/decrement!
          </p>
        </div>
      </div>
    </div>
  );
}

function UseCallbackDemo() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-purple-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link2 className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">
            useCallback — Stable Function References
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 font-medium">
                What is useCallback?
              </p>
              <p className="text-purple-700 text-sm mt-1">
                <code className="bg-purple-100 px-1 rounded font-mono">
                  useCallback
                </code>{' '}
                returns a memoized function that keeps the same reference
                between renders. Without it, a new function is created every
                render — causing{' '}
                <code className="bg-purple-100 px-1 rounded font-mono">
                  memo()
                </code>
                -wrapped children to re-render unnecessarily. Watch the{' '}
                <strong>render count</strong> on the buttons as you click!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <WithoutCallbackExample />
          <WithCallbackExample />
        </div>
      </div>
    </div>
  );
}

// ========================================
// memo() Demo
// ========================================

// Child without memo — re-renders every time parent re-renders
function CountsNoMemo() {
  const renderCount = useRef(0);
  return (
    <p className="text-center text-gray-300 text-sm py-2">
      Nothing changed here but I&apos;ve now rendered:{' '}
      <span className="text-red-400 font-bold text-base">
        {++renderCount.current} time(s)
      </span>
    </p>
  );
}

// Child with memo — only re-renders when its own props change
const CountsWithMemo = memo(function Counts() {
  const renderCount = useRef(0);
  return (
    <p className="text-center text-gray-300 text-sm py-2">
      Nothing changed here but I&apos;ve now rendered:{' '}
      <span className="text-green-400 font-bold text-base">
        {++renderCount.current} time(s)
      </span>
    </p>
  );
});

function MemoDemo() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-orange-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Package className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">
            memo() — Prevent Unnecessary Re-renders
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-800 font-medium">What is memo()?</p>
              <p className="text-orange-700 text-sm mt-1">
                <code className="bg-orange-100 px-1 rounded font-mono">
                  memo()
                </code>{' '}
                wraps a component so React skips re-rendering it when the parent
                re-renders, as long as its props haven&apos;t changed. Click{' '}
                <strong>Increment</strong> and watch how many times the{' '}
                <code className="bg-orange-100 px-1 rounded font-mono">
                  &lt;Counts /&gt;
                </code>{' '}
                child renders in each example.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Example 1 — Without memo */}
          <WithoutMemoCountExample />
          {/* Example 2 — With memo */}
          <WithMemoCountExample />
        </div>
      </div>
    </div>
  );
}

function WithoutMemoCountExample() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-red-500">
      <div className="flex items-center gap-2 px-4 py-3 bg-red-500">
        <XCircle className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm">
          Example 1 — Without memo()
        </span>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-xs leading-relaxed border-b border-gray-700">
        <p className="text-gray-500 mb-1">{'// MemoCount.jsx'}</p>
        <p>
          <span className="text-purple-400">import </span>
          <span className="text-gray-300">{'{ useRef } '}</span>
          <span className="text-purple-400">from </span>
          <span className="text-green-400">&quot;react&quot;</span>
          <span className="text-gray-300">;</span>
        </p>
        <p className="mt-2">
          <span className="text-purple-400">export const </span>
          <span className="text-yellow-300">Counts</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">renderCount</span>
          <span className="text-gray-300"> = </span>
          <span className="text-yellow-200">useRef</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;p&gt;Nothing changed here but I&apos;ve now rendered:
        </p>
        <p className="pl-12 text-gray-300">
          &lt;span&gt;{'{'}
          <span className="text-white">renderCount.current++</span>
          {'}'} time(s)&lt;/span&gt;
        </p>
        <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'};'}</p>

        <p className="mt-4 text-gray-500">{'// ReactMemo.jsx'}</p>
        <p>
          <span className="text-purple-400">export const </span>
          <span className="text-yellow-300">ReactMemo</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-gray-300">[</span>
          <span className="text-white">count</span>
          <span className="text-gray-300">, </span>
          <span className="text-white">setCount</span>
          <span className="text-gray-300">] = </span>
          <span className="text-yellow-200">useState</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;h1&gt;{'{'}
          <span className="text-orange-400">count</span>
          {'}'}&lt;/h1&gt;
        </p>
        <p className="pl-12 text-gray-300">
          &lt;button <span className="text-yellow-200">onClick</span>={'{'}
          <span className="text-gray-300">
            () =&gt; setCount((prev) =&gt; prev + 1)
          </span>
          {'}'}&gt;Increment&lt;/button&gt;
        </p>
        <p className="pl-12 text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-1 inline-block mt-1">
          &lt;Counts /&gt;
        </p>
        <p className="pl-8 mt-1 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'};'}</p>
      </div>

      {/* Live Demo */}
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>

        {/* Parent component box */}
        <div className="border-2 border-dashed border-orange-400 rounded-xl p-4 relative">
          <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-orange-400 text-xs font-bold tracking-wide">
            Parent — ReactMemo
          </span>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-3xl font-bold w-12 text-center">
              {count}
            </span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded text-sm transition-colors"
            >
              Increment
            </button>
            <span className="text-gray-400 text-xs ml-auto">
              re-renders:{' '}
              <span className="text-orange-400 font-bold">{count + 1}×</span>
            </span>
          </div>

          {/* Child component box */}
          <div className="border-2 border-dashed border-red-400 rounded-xl p-3 relative">
            <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-red-400 text-xs font-bold tracking-wide">
              Child — Counts (no memo)
            </span>
            <CountsNoMemo />
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 p-3 bg-red-900/30 rounded-lg border border-red-500/30">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-300 text-xs">
            <strong>
              &lt;Counts /&gt; re-renders every time the parent re-renders
            </strong>{' '}
            — even though its own props never changed!
          </p>
        </div>
      </div>
    </div>
  );
}

function WithMemoCountExample() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden border-2 border-green-500">
      <div className="flex items-center gap-2 px-4 py-3 bg-green-500">
        <CheckCircle className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm">
          Example 2 — With memo()
        </span>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-xs leading-relaxed border-b border-gray-700">
        <p className="text-gray-500 mb-1">{'// MemoCount.jsx'}</p>
        <p>
          <span className="text-purple-400">import </span>
          <span className="text-gray-300">{'{ memo, useRef } '}</span>
          <span className="text-purple-400">from </span>
          <span className="text-green-400">&quot;react&quot;</span>
          <span className="text-gray-300">;</span>
        </p>
        <p className="mt-2 text-gray-500">
          {'// eslint-disable-next-line react/display-name'}
        </p>
        <p>
          <span className="text-purple-400">export const </span>
          <span className="text-yellow-300">Counts</span>
          <span className="text-gray-300"> = </span>
          <span className="bg-yellow-400/20 border border-yellow-400/40 rounded px-1 text-yellow-200">
            memo
          </span>
          <span className="text-gray-300">(() =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-white">renderCount</span>
          <span className="text-gray-300"> = </span>
          <span className="text-yellow-200">useRef</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;p&gt;Nothing changed here but I&apos;ve now rendered:
        </p>
        <p className="pl-12 text-gray-300">
          &lt;span&gt;{'{'}
          <span className="text-white">renderCount.current++</span>
          {'}'} time(s)&lt;/span&gt;
        </p>
        <p className="pl-8 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'});'}</p>

        <p className="mt-4 text-gray-500">{'// ReactMemo.jsx'}</p>
        <p>
          <span className="text-purple-400">export const </span>
          <span className="text-yellow-300">ReactMemo</span>
          <span className="text-gray-300"> = () =&gt; {'{'}</span>
        </p>
        <p className="pl-4">
          <span className="text-purple-400">const </span>
          <span className="text-gray-300">[</span>
          <span className="text-white">count</span>
          <span className="text-gray-300">, </span>
          <span className="text-white">setCount</span>
          <span className="text-gray-300">] = </span>
          <span className="text-yellow-200">useState</span>
          <span className="text-gray-300">(0);</span>
        </p>
        <p className="pl-4 mt-1 text-gray-300">return (</p>
        <p className="pl-8 text-gray-300">&lt;div&gt;</p>
        <p className="pl-12 text-gray-300">
          &lt;h1&gt;{'{'}
          <span className="text-orange-400">count</span>
          {'}'}&lt;/h1&gt;
        </p>
        <p className="pl-12 text-gray-300">
          &lt;button <span className="text-yellow-200">onClick</span>={'{'}
          <span className="text-gray-300">
            () =&gt; setCount((prev) =&gt; prev + 1)
          </span>
          {'}'}&gt;Increment&lt;/button&gt;
        </p>
        <p className="pl-12 text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-1 inline-block mt-1">
          &lt;Counts /&gt;
        </p>
        <p className="pl-8 mt-1 text-gray-300">&lt;/div&gt;</p>
        <p className="pl-4 text-gray-300">);</p>
        <p className="text-gray-300">{'};'}</p>
      </div>

      {/* Live Demo */}
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-3">▶ Live Demo</p>

        {/* Parent component box */}
        <div className="border-2 border-dashed border-orange-400 rounded-xl p-4 relative">
          <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-orange-400 text-xs font-bold tracking-wide">
            Parent — ReactMemo
          </span>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-3xl font-bold w-12 text-center">
              {count}
            </span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded text-sm transition-colors"
            >
              Increment
            </button>
            <span className="text-gray-400 text-xs ml-auto">
              re-renders:{' '}
              <span className="text-orange-400 font-bold">{count + 1}×</span>
            </span>
          </div>

          {/* Child component box */}
          <div className="border-2 border-dashed border-green-400 rounded-xl p-3 relative">
            <span className="absolute -top-3 left-3 bg-gray-900 px-2 text-green-400 text-xs font-bold tracking-wide">
              Child — Counts (memo)
            </span>
            <CountsWithMemo />
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
          <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-green-300 text-xs">
            <strong>&lt;Counts /&gt; renders only ONCE</strong> — memo()
            prevents re-renders since its props never change, no matter how many
            times the parent increments!
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// When NOT to Optimize
// ========================================
function WhenNotToOptimize() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-amber-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">When NOT to Optimize</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 font-medium">
            "Premature optimization is the root of all evil" - Donald Knuth
          </p>
          <p className="text-amber-700 text-sm mt-2">
            Only optimize when you've measured a real performance problem.
            Unnecessary memoization adds complexity and can actually hurt
            performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              DON'T optimize when:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </span>
                Simple calculations (math, string operations)
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </span>
                Component rarely re-renders
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </span>
                No measured performance issue exists
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">
                  4
                </span>
                Props are primitives that change often
              </li>
            </ul>
          </div>

          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              DO optimize when:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </span>
                Expensive calculations (sorting, filtering large arrays)
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </span>
                Passing callbacks to many memo'd children
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </span>
                You've measured a real performance issue
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">
                  4
                </span>
                Context values that trigger many updates
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Examples of Unnecessary Optimization</span>
          </div>
          <pre className="text-sm text-amber-300 overflow-x-auto">
            {`// ❌ UNNECESSARY - simple multiplication
const doubled = useMemo(() => count * 2, [count]);
// ✅ JUST DO IT - no memoization needed
const doubled = count * 2;

// ❌ UNNECESSARY - not passed to memo'd child
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
// ✅ JUST USE - regular function is fine
const handleClick = () => setCount(c => c + 1);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Performance Comparison Table
// ========================================
function ComparisonTable() {
  const comparisons = [
    {
      hook: 'useMemo',
      icon: Brain,
      purpose: 'Cache expensive calculation results',
      returns: 'The computed value',
      useWhen: 'Heavy computations, filtering/sorting large data',
      color: 'blue',
    },
    {
      hook: 'useCallback',
      icon: Link2,
      purpose: 'Cache function references',
      returns: 'The memoized function',
      useWhen: 'Passing callbacks to memo() children',
      color: 'purple',
    },
    {
      hook: 'memo()',
      icon: Package,
      purpose: 'Skip re-rendering component',
      returns: 'A memoized component',
      useWhen: 'Expensive components with stable props',
      color: 'orange',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-indigo-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">Quick Comparison</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-700">
                  Hook/HOC
                </th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">
                  Purpose
                </th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">
                  Returns
                </th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">
                  Use When
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item) => (
                <tr
                  key={item.hook}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                      <code
                        className={`bg-${item.color}-100 text-${item.color}-700 px-2 py-1 rounded font-medium`}
                      >
                        {item.hook}
                      </code>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{item.purpose}</td>
                  <td className="py-4 px-4 text-gray-600">{item.returns}</td>
                  <td className="py-4 px-4 text-gray-600">{item.useWhen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function PerformanceScreen() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Performance Optimization" icon={Zap} />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Introduction */}
        <div className="bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500 text-white flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Performance Optimization in React
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                React provides several tools for optimization:{' '}
                <code className="bg-white px-2 py-1 rounded font-mono text-sm">
                  useMemo
                </code>
                ,
                <code className="bg-white px-2 py-1 rounded font-mono text-sm ml-1">
                  useCallback
                </code>
                , and
                <code className="bg-white px-2 py-1 rounded font-mono text-sm ml-1">
                  memo()
                </code>
                . However, premature optimization is the root of all evil - only
                optimize when you've measured a real problem!
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  <Brain className="w-4 h-4" />
                  useMemo
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  <Link2 className="w-4 h-4" />
                  useCallback
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  <Package className="w-4 h-4" />
                  memo()
                </span>
              </div>
            </div>
          </div>
        </div>

        <UseMemoDemo />
        <UseCallbackDemo />
        <MemoDemo />
        <ComparisonTable />
        <WhenNotToOptimize />

        {/* Key Takeaways */}
        <div className="bg-gray-800 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold">Key Takeaways</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-500/20 rounded-lg p-4">
              <Brain className="w-8 h-8 text-blue-400 mb-3" />
              <h4 className="font-bold text-blue-300 mb-2">useMemo</h4>
              <p className="text-gray-300 text-sm">
                Cache expensive calculation results to avoid recomputing on
                every render
              </p>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4">
              <Link2 className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-bold text-purple-300 mb-2">useCallback</h4>
              <p className="text-gray-300 text-sm">
                Keep stable function references when passing to memoized
                children
              </p>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4">
              <Package className="w-8 h-8 text-orange-400 mb-3" />
              <h4 className="font-bold text-orange-300 mb-2">memo()</h4>
              <p className="text-gray-300 text-sm">
                Wrap expensive components to skip re-renders when props are
                unchanged
              </p>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
