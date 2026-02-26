import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { debounce, throttle } from 'lodash-es';
import DemoNavigation from '../../components/DemoNavigation';
import {
  ArrowLeft,
  Timer,
  Search,
  Zap,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Code,
  Lightbulb,
  MousePointer2,
  RefreshCw,
  ScrollText,
  BarChart3,
  Play,
  Pause,
  Users,
  Loader2,
  TrendingDown,
  ArrowRight,
  Gauge,
  DoorOpen,
  Waves,
  ExternalLink,
  Package
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
          {Icon && <Icon className="w-6 h-6 text-amber-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Custom Hooks (using lodash-es)
// ========================================

// NPM: https://www.npmjs.com/package/lodash-es

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Using lodash-es debounce for reliable implementation
    const debouncedSetter = debounce(() => {
      setDebouncedValue(value);
    }, delay);
    
    debouncedSetter();

    return () => debouncedSetter.cancel();
  }, [value, delay]);

  return debouncedValue;
}

function useThrottle(value, interval) {
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    // Using lodash-es throttle for reliable implementation
    const throttledSetter = throttle(() => {
      setThrottledValue(value);
    }, interval, { leading: true, trailing: true });
    
    throttledSetter();

    return () => throttledSetter.cancel();
  }, [value, interval]);

  return throttledValue;
}

// ========================================
// Search Demo
// ========================================
function SearchDemo() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [apiCalls, setApiCalls] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 500);

  // Simulated API
  const mockUsers = useMemo(() => [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Ross',
    'Edward Norton', 'Fiona Apple', 'George Clooney', 'Hannah Montana',
    'Isaac Newton', 'Julia Roberts', 'Kevin Hart', 'Lisa Simpson'
  ], []);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      setApiCalls(c => c + 1);
      
      // Simulate API delay
      const timeoutId = setTimeout(() => {
        const filtered = mockUsers.filter(u => 
          u.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, mockUsers]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Search with Debounce</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-blue-800">
              <p className="font-medium flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Without debounce: API call on every keystroke
              </p>
              <p className="font-medium flex items-center gap-2 mt-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                With debounce: API call only after 500ms of no typing
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Code className="w-4 h-4 text-gray-500" />
            Typed: <strong>{query.length}</strong> chars
          </span>
          <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4" />
            API calls: <strong>{apiCalls}</strong>
          </span>
          {query.length > 0 && apiCalls > 0 && (
            <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
              <TrendingDown className="w-4 h-4" />
              Saved: <strong>{query.length - apiCalls}</strong> calls
            </span>
          )}
          <button
            onClick={() => { setQuery(''); setApiCalls(0); setResults([]); }}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {results.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {results.map((user, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <Users className="w-4 h-4 text-gray-400" />
                {user}
              </div>
            ))}
          </div>
        )}
        
        {query && results.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No results for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// Visual Comparison
// ========================================
function VisualComparison() {
  const [events, setEvents] = useState([]);
  const [debounceCount, setDebounceCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);
  
  const debouncedEvents = useDebounce(events.length, 500);
  const throttledEvents = useThrottle(events.length, 500);

  const prevDebounceRef = useRef(0);
  const prevThrottleRef = useRef(0);

  useEffect(() => {
    if (debouncedEvents > prevDebounceRef.current) {
      prevDebounceRef.current = debouncedEvents;
      setDebounceCount(c => c + 1);
    }
  }, [debouncedEvents]);

  useEffect(() => {
    if (throttledEvents > prevThrottleRef.current) {
      prevThrottleRef.current = throttledEvents;
      setThrottleCount(c => c + 1);
    }
  }, [throttledEvents]);

  const handleInput = () => {
    setEvents(prev => [...prev, Date.now()]);
  };

  const reset = () => {
    setEvents([]);
    setDebounceCount(0);
    setThrottleCount(0);
    prevDebounceRef.current = 0;
    prevThrottleRef.current = 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-indigo-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Visual Comparison</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 flex items-center gap-2">
          <MousePointer2 className="w-4 h-4 text-indigo-500" />
          Click the button rapidly to see how debounce and throttle handle events differently:
        </p>

        <div className="flex gap-3 mb-6">
          <button
            onClick={handleInput}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
          >
            <Play className="w-4 h-4" />
            Click Me Rapidly!
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 bg-gray-100 rounded-lg text-center border-2 border-gray-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-500 font-medium">Raw Events</p>
            </div>
            <p className="text-4xl font-bold text-gray-700">{events.length}</p>
            <div className="mt-3 flex justify-center gap-1 flex-wrap min-h-6">
              {events.slice(-20).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-blue-100 rounded-lg text-center border-2 border-blue-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Pause className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">Debounced (500ms)</p>
            </div>
            <p className="text-4xl font-bold text-blue-700">{debounceCount}</p>
            <p className="text-xs text-blue-500 mt-3 flex items-center justify-center gap-1">
              <DoorOpen className="w-4 h-4" />
              Waits for pause in activity
            </p>
          </div>

          <div className="p-5 bg-green-100 rounded-lg text-center border-2 border-green-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Waves className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-600 font-medium">Throttled (500ms)</p>
            </div>
            <p className="text-4xl font-bold text-green-700">{throttleCount}</p>
            <p className="text-xs text-green-500 mt-3 flex items-center justify-center gap-1">
              <Gauge className="w-4 h-4" />
              Fires at regular intervals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Scroll Throttle Demo
// ========================================
function ScrollThrottleDemo() {
  const [rawScrollCount, setRawScrollCount] = useState(0);
  const [throttledScrollCount, setThrottledScrollCount] = useState(0);
  const lastThrottleRef = useRef(0);

  const handleScroll = useCallback(() => {
    setRawScrollCount(c => c + 1);
    
    const now = Date.now();
    if (now - lastThrottleRef.current >= 100) {
      lastThrottleRef.current = now;
      setThrottledScrollCount(c => c + 1);
    }
  }, []);

  const reset = () => {
    setRawScrollCount(0);
    setThrottledScrollCount(0);
    lastThrottleRef.current = 0;
  };

  const savings = rawScrollCount > 0 ? Math.round((1 - throttledScrollCount / rawScrollCount) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-orange-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <ScrollText className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Scroll Event Throttling</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-red-100 rounded-lg text-center border border-red-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-600 font-medium">Raw Events</p>
            </div>
            <p className="text-3xl font-bold text-red-700">{rawScrollCount}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-600 font-medium">Throttled (100ms)</p>
            </div>
            <p className="text-3xl font-bold text-green-700">{throttledScrollCount}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg text-center border border-blue-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-blue-500" />
              <p className="text-sm text-blue-600 font-medium">Reduction</p>
            </div>
            <p className="text-3xl font-bold text-blue-700">{savings}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-orange-500" />
            Scroll the box below and watch the counters
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-2 text-orange-600 hover:underline text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div
          onScroll={handleScroll}
          className="h-48 overflow-y-auto border-2 border-orange-200 rounded-lg bg-orange-50"
        >
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border-b border-orange-100 last:border-0">
              <span className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-sm font-medium text-orange-700">
                {i + 1}
              </span>
              <span className="text-gray-700">Scroll item {i + 1}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Without throttling, scroll events fire <strong>hundreds of times per second</strong>! 
              Throttling ensures expensive operations (like calculations or DOM updates) run at manageable intervals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DebounceThrottleScreen() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Debounce & Throttle" icon={Timer} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* NPM Package Link */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Package className="w-5 h-5 text-amber-500" />
              <span className="font-medium">Using lodash-es for debounce & throttle</span>
            </div>
            <a 
              href="https://www.npmjs.com/package/lodash-es" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium">npm: lodash-es</span>
            </a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Timer className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Debounce vs Throttle</h2>
              <p className="text-gray-700 mb-4">
                Both techniques limit how often a function executes, but in different ways. Understanding when to use each is crucial for performance.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Pause className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-blue-700">Debounce</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Waits for a <strong>pause</strong> in activity before executing. Like an elevator door that waits until people stop entering.
                  </p>
                  <div className="text-sm bg-blue-50 p-3 rounded-lg">
                    <strong className="text-blue-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Use for:
                    </strong>
                    <p className="text-gray-600 mt-1">Search inputs, resize handlers, form validation, auto-save</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Waves className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-bold text-green-700">Throttle</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Executes at <strong>regular intervals</strong> during activity. Like a metronome that keeps a steady pace.
                  </p>
                  <div className="text-sm bg-green-50 p-3 rounded-lg">
                    <strong className="text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Use for:
                    </strong>
                    <p className="text-gray-600 mt-1">Scroll handlers, game loops, rate limiting APIs, tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SearchDemo />
          <VisualComparison />
          <ScrollThrottleDemo />
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-gray-900 rounded-xl overflow-hidden">
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-bold text-white">Using lodash-es</h3>
              </div>
              <a 
                href="https://www.npmjs.com/package/lodash-es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="w-4 h-4" />
                npm: lodash-es
              </a>
            </div>
          </div>
          <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto">
            <p>
              <span className="text-purple-400">import </span>
              <span className="text-gray-300">{'{ '}</span>
              <span className="text-yellow-300">debounce</span>
              <span className="text-gray-300">, </span>
              <span className="text-yellow-300">throttle</span>
              <span className="text-gray-300">{' }'} </span>
              <span className="text-purple-400">from </span>
              <span className="text-green-400">&apos;lodash-es&apos;</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="mt-4"><span className="text-gray-500">{'// useDebounce hook'}</span></p>
            <p>
              <span className="text-purple-400">function </span>
              <span className="text-yellow-300">useDebounce</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">delay</span>
              <span className="text-gray-300">) {'{'}</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const </span>
              <span className="text-gray-300">[</span>
              <span className="text-yellow-300">debouncedValue</span>
              <span className="text-gray-300">, </span>
              <span className="text-yellow-300">setDebouncedValue</span>
              <span className="text-gray-300">] = </span>
              <span className="text-yellow-300">useState</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="mt-2 pl-4">
              <span className="text-yellow-300">useEffect</span>
              <span className="text-gray-300">(() =&gt; {'{'}</span>
            </p>
            <p className="pl-8">
              <span className="text-purple-400">const </span>
              <span className="text-yellow-300">debouncedSetter</span>
              <span className="text-gray-300"> = </span>
              <span className="text-yellow-300">debounce</span>
              <span className="text-gray-300">(() =&gt; {'{'}</span>
            </p>
            <p className="pl-12">
              <span className="text-yellow-300">setDebouncedValue</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="pl-8">
              <span className="text-gray-300">{'}'}, </span>
              <span className="text-orange-300">delay</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="pl-8">
              <span className="text-yellow-300">debouncedSetter</span>
              <span className="text-gray-300">();</span>
            </p>
            <p className="pl-8">
              <span className="text-purple-400">return </span>
              <span className="text-gray-300">() =&gt; </span>
              <span className="text-yellow-300">debouncedSetter</span>
              <span className="text-gray-300">.</span>
              <span className="text-yellow-300">cancel</span>
              <span className="text-gray-300">();</span>
              <span className="text-gray-500 ml-2">{'// Cleanup'}</span>
            </p>
            <p className="pl-4">
              <span className="text-gray-300">{'}'}, [</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">delay</span>
              <span className="text-gray-300">]);</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">return </span>
              <span className="text-yellow-300">debouncedValue</span>
              <span className="text-gray-300">;</span>
            </p>
            <p><span className="text-gray-300">{'}'}</span></p>

            <p className="mt-4"><span className="text-gray-500">{'// useThrottle hook'}</span></p>
            <p>
              <span className="text-purple-400">function </span>
              <span className="text-yellow-300">useThrottle</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">interval</span>
              <span className="text-gray-300">) {'{'}</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const </span>
              <span className="text-gray-300">[</span>
              <span className="text-yellow-300">throttledValue</span>
              <span className="text-gray-300">, </span>
              <span className="text-yellow-300">setThrottledValue</span>
              <span className="text-gray-300">] = </span>
              <span className="text-yellow-300">useState</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="mt-2 pl-4">
              <span className="text-yellow-300">useEffect</span>
              <span className="text-gray-300">(() =&gt; {'{'}</span>
            </p>
            <p className="pl-8">
              <span className="text-purple-400">const </span>
              <span className="text-yellow-300">throttledSetter</span>
              <span className="text-gray-300"> = </span>
              <span className="text-yellow-300">throttle</span>
              <span className="text-gray-300">(() =&gt; {'{'}</span>
            </p>
            <p className="pl-12">
              <span className="text-yellow-300">setThrottledValue</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="pl-8">
              <span className="text-gray-300">{'}'}, </span>
              <span className="text-orange-300">interval</span>
              <span className="text-gray-300">, {'{ '}</span>
              <span className="text-orange-300">leading</span>
              <span className="text-gray-300">: </span>
              <span className="text-blue-400">true</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">trailing</span>
              <span className="text-gray-300">: </span>
              <span className="text-blue-400">true</span>
              <span className="text-gray-300">{' }'});</span>
            </p>
            <p className="pl-8">
              <span className="text-yellow-300">throttledSetter</span>
              <span className="text-gray-300">();</span>
            </p>
            <p className="pl-8">
              <span className="text-purple-400">return </span>
              <span className="text-gray-300">() =&gt; </span>
              <span className="text-yellow-300">throttledSetter</span>
              <span className="text-gray-300">.</span>
              <span className="text-yellow-300">cancel</span>
              <span className="text-gray-300">();</span>
            </p>
            <p className="pl-4">
              <span className="text-gray-300">{'}'}, [</span>
              <span className="text-orange-300">value</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">interval</span>
              <span className="text-gray-300">]);</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">return </span>
              <span className="text-yellow-300">throttledValue</span>
              <span className="text-gray-300">;</span>
            </p>
            <p><span className="text-gray-300">{'}'}</span></p>

            <p className="mt-4"><span className="text-gray-500">{'// Usage'}</span></p>
            <p>
              <span className="text-purple-400">const </span>
              <span className="text-yellow-300">debouncedQuery</span>
              <span className="text-gray-300"> = </span>
              <span className="text-yellow-300">useDebounce</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">searchQuery</span>
              <span className="text-gray-300">, </span>
              <span className="text-blue-400">500</span>
              <span className="text-gray-300">);</span>
            </p>
            <p>
              <span className="text-purple-400">const </span>
              <span className="text-yellow-300">throttledScroll</span>
              <span className="text-gray-300"> = </span>
              <span className="text-yellow-300">useThrottle</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">scrollPosition</span>
              <span className="text-gray-300">, </span>
              <span className="text-blue-400">100</span>
              <span className="text-gray-300">);</span>
            </p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mt-8 bg-gray-800 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold">Key Takeaways</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
              <Pause className="w-8 h-8 text-blue-400 mb-3" />
              <h4 className="font-bold text-blue-300 mb-2">Debounce</h4>
              <p className="text-gray-300 text-sm">Wait for inactivity. Good for search, resize, validation - anything that should run after user finishes.</p>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
              <Waves className="w-8 h-8 text-green-400 mb-3" />
              <h4 className="font-bold text-green-300 mb-2">Throttle</h4>
              <p className="text-gray-300 text-sm">Run at steady intervals. Good for scroll, drag, continuous events that need regular updates.</p>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-500/30">
              <Gauge className="w-8 h-8 text-orange-400 mb-3" />
              <h4 className="font-bold text-orange-300 mb-2">Performance</h4>
              <p className="text-gray-300 text-sm">Both prevent performance issues by limiting function execution. Choose based on your use case.</p>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
