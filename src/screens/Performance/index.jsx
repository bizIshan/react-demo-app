import { useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Zap, Brain, Link2, Package, AlertTriangle,
  CheckCircle, XCircle, Clock, TrendingUp, Code, BookOpen,
  Gauge, RefreshCw, Timer, Lightbulb, Target, Activity
} from 'lucide-react';
import DemoNavigation from '../../components/DemoNavigation';

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
          {Icon && <Icon className="w-6 h-6 text-yellow-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// Expensive calculation function
const expensiveCalculation = (num) => {
  console.log('💰 Running expensive calculation...');
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += Math.sqrt(i) * Math.sin(i);
  }
  return num * 2 + Math.floor(result % 100);
};

// ========================================
// useMemo Demo
// ========================================
function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [calcTime, setCalcTime] = useState(0);

  // With useMemo - only recalculates when count changes
  const memoizedResult = useMemo(() => {
    if (!useMemoEnabled) return count * 2;
    const start = performance.now();
    const result = expensiveCalculation(count);
    setCalcTime(Math.round(performance.now() - start));
    return result;
  }, [count, useMemoEnabled]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Brain className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">useMemo - Memoize Expensive Calculations</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-800 font-medium">What useMemo does:</p>
              <p className="text-blue-700 text-sm mt-1">
                Caches the result of an expensive calculation and only recalculates when dependencies change.
                Perfect for heavy computations like sorting large arrays or complex data transformations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useMemoEnabled}
              onChange={(e) => setUseMemoEnabled(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700">Enable expensive calculation</span>
          </label>
          {useMemoEnabled && calcTime > 0 && (
            <span className="flex items-center gap-2 text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              Last calc: {calcTime}ms
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Count (triggers recalculation)
            </h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCount(c => c + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Increment
              </button>
              <span className="text-3xl font-bold text-green-700">{count}</span>
            </div>
            <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Result: {memoizedResult}
            </p>
          </div>

          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Other State (no recalculation)
            </h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOtherState(s => s + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Update
              </button>
              <span className="text-3xl font-bold text-gray-700">{otherState}</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">This doesn't trigger expensive calc!</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Code Example</span>
          </div>
          <pre className="text-sm text-gray-200 overflow-x-auto">
{`// ✅ GOOD: Memoize expensive calculations
const expensiveResult = useMemo(() => {
  return expensiveCalculation(count);
}, [count]); // Only recalculates when count changes

// ❌ BAD: Recalculates on every render
const expensiveResult = expensiveCalculation(count);`}</pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// useCallback Demo
// ========================================
const ExpensiveChild = memo(function ExpensiveChild({ onClick, label, variant }) {
  console.log(`🔄 ${label} rendered`);
  const isGood = variant === 'good';
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
        isGood 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-red-500 hover:bg-red-600 text-white'
      }`}
    >
      <Activity className="w-4 h-4" />
      Click me ({label})
    </button>
  );
});

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [renderCounts, setRenderCounts] = useState({ bad: 0, good: 0 });

  // Without useCallback - new function reference every render
  const handleClickBad = () => {
    console.log('Clicked (bad)');
  };

  // With useCallback - stable function reference
  const handleClickGood = useCallback(() => {
    console.log('Clicked (good)');
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-purple-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link2 className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">useCallback - Stable Function References</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 font-medium">What useCallback does:</p>
              <p className="text-purple-700 text-sm mt-1">
                Returns a memoized callback function that only changes when dependencies change.
                Useful when passing callbacks to memoized children to prevent unnecessary re-renders.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">Open browser DevTools Console (F12)</p>
              <p className="text-amber-700 text-sm mt-1">
                Watch for render logs when you click the buttons below!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setCount(c => c + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Update Count: {count}
          </button>
          <button
            onClick={() => setOtherState(s => s + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Update Other: {otherState}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Without useCallback
            </h4>
            <p className="text-sm text-red-600 mb-4">Child re-renders on every parent update</p>
            <ExpensiveChild onClick={handleClickBad} label="Without useCallback" variant="bad" />
            <p className="mt-3 text-xs text-red-500">New function reference created each render</p>
          </div>

          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              With useCallback
            </h4>
            <p className="text-sm text-green-600 mb-4">Child only renders once initially</p>
            <ExpensiveChild onClick={handleClickGood} label="With useCallback" variant="good" />
            <p className="mt-3 text-xs text-green-500">Same function reference preserved</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Code Example</span>
          </div>
          <pre className="text-sm text-gray-200 overflow-x-auto">
{`// ❌ BAD: New function reference every render
const handleClick = () => { doSomething(); };

// ✅ GOOD: Stable function reference
const handleClick = useCallback(() => {
  doSomething();
}, []); // Empty deps = never changes

// ⚠️ Only useful when passing to memo() children!`}</pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// memo() Demo
// ========================================
const RegularChild = ({ count }) => {
  console.log('🔴 Regular child rendered');
  return (
    <div className="p-4 bg-red-100 rounded-lg border border-red-200">
      <div className="flex items-center gap-2 mb-2">
        <XCircle className="w-5 h-5 text-red-500" />
        <p className="font-medium text-red-700">Regular Component</p>
      </div>
      <p className="text-sm text-gray-600">Count prop: {count}</p>
    </div>
  );
};

const MemoizedChild = memo(({ count }) => {
  console.log('🟢 Memoized child rendered');
  return (
    <div className="p-4 bg-green-100 rounded-lg border border-green-200">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <p className="font-medium text-green-700">Memoized Component</p>
      </div>
      <p className="text-sm text-gray-600">Count prop: {count}</p>
    </div>
  );
});

function MemoDemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-orange-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Package className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">memo() - Prevent Unnecessary Re-renders</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-800 font-medium">What memo() does:</p>
              <p className="text-orange-700 text-sm mt-1">
                Wraps a component to skip re-rendering if props haven't changed.
                Uses shallow comparison by default. Great for expensive child components.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setCount(c => c + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <Target className="w-4 h-4" />
            Update Count: {count}
            <span className="text-xs opacity-70">(prop changes)</span>
          </button>
          <button
            onClick={() => setOtherState(s => s + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Update Other: {otherState}
            <span className="text-xs opacity-70">(prop same)</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Without memo()
            </h4>
            <RegularChild count={count} />
            <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Re-renders on every parent update
            </p>
          </div>
          <div>
            <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              With memo()
            </h4>
            <MemoizedChild count={count} />
            <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Only re-renders when 'count' changes
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Code Example</span>
          </div>
          <pre className="text-sm text-gray-200 overflow-x-auto">
{`// Wrap component with memo()
const MyComponent = memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});

// With custom comparison function
const MyComponent = memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // true = skip render
});`}</pre>
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
            Only optimize when you've measured a real performance problem. Unnecessary memoization
            adds complexity and can actually hurt performance.
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
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">1</span>
                Simple calculations (math, string operations)
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">2</span>
                Component rarely re-renders
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">3</span>
                No measured performance issue exists
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-xs">4</span>
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
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">1</span>
                Expensive calculations (sorting, filtering large arrays)
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">2</span>
                Passing callbacks to many memo'd children
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">3</span>
                You've measured a real performance issue
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">4</span>
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
const handleClick = () => setCount(c => c + 1);`}</pre>
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
      color: 'blue'
    },
    {
      hook: 'useCallback',
      icon: Link2,
      purpose: 'Cache function references',
      returns: 'The memoized function',
      useWhen: 'Passing callbacks to memo() children',
      color: 'purple'
    },
    {
      hook: 'memo()',
      icon: Package,
      purpose: 'Skip re-rendering component',
      returns: 'A memoized component',
      useWhen: 'Expensive components with stable props',
      color: 'orange'
    }
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
                <th className="text-left py-3 px-4 font-bold text-gray-700">Hook/HOC</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Purpose</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Returns</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Use When</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item) => (
                <tr key={item.hook} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                      <code className={`bg-${item.color}-100 text-${item.color}-700 px-2 py-1 rounded font-medium`}>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Performance Optimization in React</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                React provides several tools for optimization: <code className="bg-white px-2 py-1 rounded font-mono text-sm">useMemo</code>, 
                <code className="bg-white px-2 py-1 rounded font-mono text-sm ml-1">useCallback</code>, and 
                <code className="bg-white px-2 py-1 rounded font-mono text-sm ml-1">memo()</code>. 
                However, premature optimization is the root of all evil - only optimize when you've measured a real problem!
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
              <p className="text-gray-300 text-sm">Cache expensive calculation results to avoid recomputing on every render</p>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4">
              <Link2 className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-bold text-purple-300 mb-2">useCallback</h4>
              <p className="text-gray-300 text-sm">Keep stable function references when passing to memoized children</p>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4">
              <Package className="w-8 h-8 text-orange-400 mb-3" />
              <h4 className="font-bold text-orange-300 mb-2">memo()</h4>
              <p className="text-gray-300 text-sm">Wrap expensive components to skip re-renders when props are unchanged</p>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
