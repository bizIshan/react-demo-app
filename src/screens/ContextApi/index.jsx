import { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import DemoNavigation from '../../components/DemoNavigation';
import {
  ArrowLeft,
  Globe,
  ArrowDown,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Code,
  User,
  Sun,
  Moon,
  LogOut,
  Network,
  Layers,
  Share2,
  Settings,
  Palette,
  Lock,
  Languages,
  Zap,
  RefreshCw,
  Package,
  Box
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
          {Icon && <Icon className="w-6 h-6 text-teal-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// ========================================
// PROP DRILLING EXAMPLE
// ========================================

// Level 3 - Finally uses the data
function DeepChild({ user, theme, onLogout }) {
  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Box className="w-4 h-4 text-green-500" />
        <h4 className="font-bold">Level 3: Finally uses data</h4>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <User className="w-4 h-4 text-gray-400" />
        <span>User: {user.name}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-4 h-4 text-gray-400" />
        <span>Theme: {theme}</span>
      </div>
      <button 
        onClick={onLogout}
        className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
      >
        <LogOut className="w-3 h-3" />
        Logout
      </button>
    </div>
  );
}

// Level 2 - Just passes props through
function MiddleComponent({ user, theme, onLogout }) {
  return (
    <div className="p-4 border-2 border-dashed border-orange-300 rounded-lg bg-orange-50/50">
      <div className="flex items-center gap-2 mb-2">
        <ArrowDown className="w-4 h-4 text-orange-500" />
        <h4 className="font-bold text-orange-600">Level 2: Just passing props...</h4>
      </div>
      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
        <XCircle className="w-3 h-3 text-red-400" />
        Doesn't use user/theme, but must pass them down
      </p>
      <DeepChild user={user} theme={theme} onLogout={onLogout} />
    </div>
  );
}

// Level 1 - Also just passes props
function TopComponent({ user, theme, onLogout }) {
  return (
    <div className="p-4 border-2 border-dashed border-yellow-400 rounded-lg bg-yellow-50/50">
      <div className="flex items-center gap-2 mb-2">
        <ArrowDown className="w-4 h-4 text-yellow-500" />
        <h4 className="font-bold text-yellow-600">Level 1: Just passing props...</h4>
      </div>
      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
        <XCircle className="w-3 h-3 text-red-400" />
        Doesn't use user/theme, but must pass them down
      </p>
      <MiddleComponent user={user} theme={theme} onLogout={onLogout} />
    </div>
  );
}

function PropDrillingDemo() {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [theme, setTheme] = useState('light');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-red-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Prop Drilling Problem</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-red-800">
              Props must be passed through <strong>every</strong> intermediate component, even if they don't use them.
              This creates tight coupling and makes refactoring difficult.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            {theme === 'light' ? <Sun className="w-4 h.4" /> : <Moon className="w-4 h-4" />}
            Toggle: {theme}
          </button>
        </div>

        <div className="p-4 border-2 border-red-400 rounded-lg bg-red-50/50">
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="w-4 h-4 text-red-600" />
            <h4 className="font-bold text-red-600">Root: Has the data</h4>
          </div>
          <p className="text-sm text-gray-500 mb-3">user, theme, onLogout defined here</p>
          <TopComponent user={user} theme={theme} onLogout={() => setUser({ name: 'Guest', email: '' })} />
        </div>

        <div className="mt-4 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Every component needs props just to pass them down</span>
          </div>
          <div className="font-mono text-xs leading-relaxed overflow-x-auto space-y-0.5">
            <p>
              <span className="text-gray-500">&lt;</span><span className="text-yellow-300">TopComponent</span>
              <span className="text-orange-300"> user</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">user</span><span className="text-gray-300">{'}'}</span>
              <span className="text-orange-300"> theme</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">theme</span><span className="text-gray-300">{'}'}</span>
              <span className="text-orange-300"> onLogout</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">onLogout</span><span className="text-gray-300">{'}'}&gt;</span>
            </p>
            <p className="pl-4">
              <span className="text-gray-500">&lt;</span><span className="text-yellow-300">MiddleComponent</span>
              <span className="text-orange-300"> user</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">user</span><span className="text-gray-300">{'}'}</span>
              <span className="text-orange-300"> theme</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">theme</span><span className="text-gray-300">{'}'}</span>
              <span className="text-orange-300"> onLogout</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">onLogout</span><span className="text-gray-300">{'}'}&gt;</span>
            </p>
            <p className="pl-8">
              <span className="text-gray-500">&lt;</span><span className="text-yellow-300">DeepChild</span>
              <span className="text-orange-300"> user</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">user</span><span className="text-gray-300">{'}'}</span>
              <span className="text-orange-300"> theme</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">theme</span><span className="text-gray-300">{'}'}</span>
              <span className="text-orange-300"> onLogout</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">onLogout</span><span className="text-gray-300">{'}'} /&gt;</span>
            </p>
            <p className="pl-4">
              <span className="text-gray-500">&lt;/</span><span className="text-yellow-300">MiddleComponent</span><span className="text-gray-500">&gt;</span>
            </p>
            <p>
              <span className="text-gray-500">&lt;/</span><span className="text-yellow-300">TopComponent</span><span className="text-gray-500">&gt;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// CONTEXT API SOLUTION
// ========================================

// Create contexts
const UserContext = createContext(null);
const ThemeContext = createContext('light');

// Hook for easy access
function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}

function useTheme() {
  return useContext(ThemeContext);
}

// Level 3 - Uses context directly
function ContextDeepChild() {
  const { user, logout } = useUser();
  const theme = useTheme();

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-green-500" />
        <h4 className="font-bold">Level 3: Uses context directly</h4>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <User className="w-4 h-4 text-gray-400" />
        <span>User: {user.name}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-4 h-4 text-gray-400" />
        <span>Theme: {theme}</span>
      </div>
      <button 
        onClick={logout}
        className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
      >
        <LogOut className="w-3 h-3" />
        Logout
      </button>
    </div>
  );
}

// Level 2 - No props needed!
function ContextMiddleComponent() {
  return (
    <div className="p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50/50">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <h4 className="font-bold text-green-600">Level 2: No props needed!</h4>
      </div>
      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
        <Zap className="w-3 h-3 text-green-400" />
        Clean component, just renders children
      </p>
      <ContextDeepChild />
    </div>
  );
}

// Level 1 - No props needed!
function ContextTopComponent() {
  return (
    <div className="p-4 border-2 border-dashed border-green-400 rounded-lg bg-green-50/50">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <h4 className="font-bold text-green-600">Level 1: No props needed!</h4>
      </div>
      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
        <Zap className="w-3 h-3 text-green-400" />
        Clean component, just renders children
      </p>
      <ContextMiddleComponent />
    </div>
  );
}

function ContextApiDemo() {
  const [user, setUser] = useState({ name: 'Jane Doe', email: 'jane@example.com' });
  const [theme, setTheme] = useState('light');

  const userValue = {
    user,
    login: (userData) => setUser(userData),
    logout: () => setUser({ name: 'Guest', email: '' })
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Context API Solution</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-green-800">
              Context allows you to pass data through the component tree <strong>without manually passing props</strong> at every level.
              Components access the data directly when needed.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            Toggle: {theme}
          </button>
        </div>

        <UserContext.Provider value={userValue}>
          <ThemeContext.Provider value={theme}>
            <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50/50">
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-4 h-4 text-green-600" />
                <h4 className="font-bold text-green-600">Root: Provides context</h4>
              </div>
              <p className="text-sm text-gray-500 mb-3">UserContext.Provider, ThemeContext.Provider</p>
              <ContextTopComponent />
            </div>
          </ThemeContext.Provider>
        </UserContext.Provider>

        <div className="mt-4 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Middle components are clean - no props!</span>
          </div>
          <div className="font-mono text-xs leading-relaxed overflow-x-auto space-y-0.5">
            <p><span className="text-gray-500">{'// DeepChild accesses context directly'}</span></p>
            <p>
              <span className="text-purple-400">function </span><span className="text-yellow-300">DeepChild</span><span className="text-gray-300">() {'{'}</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const </span><span className="text-gray-300">{'{ '}</span><span className="text-orange-300">user</span><span className="text-gray-300">, </span><span className="text-orange-300">logout</span><span className="text-gray-300">{' }'} = </span><span className="text-yellow-300">useUser</span><span className="text-gray-300">();</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const </span><span className="text-orange-300">theme</span><span className="text-gray-300"> = </span><span className="text-yellow-300">useTheme</span><span className="text-gray-300">();</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">return </span><span className="text-gray-500">&lt;</span><span className="text-yellow-300">div</span><span className="text-gray-500">&gt;</span><span className="text-gray-300">User: {'{'}</span><span className="text-orange-300">user</span><span className="text-gray-300">.name{'}'}</span><span className="text-gray-500">&lt;/</span><span className="text-yellow-300">div</span><span className="text-gray-500">&gt;</span><span className="text-gray-300">;</span>
            </p>
            <p><span className="text-gray-300">{'}'}</span></p>
            <p className="mt-3"><span className="text-gray-500">{'// Middle components are clean — no props needed'}</span></p>
            <p>
              <span className="text-purple-400">function </span><span className="text-yellow-300">MiddleComponent</span><span className="text-gray-300">() {'{'}</span>
            </p>
            <p className="pl-4">
              <span className="text-purple-400">return </span><span className="text-gray-500">&lt;</span><span className="text-yellow-300">DeepChild</span><span className="text-gray-300"> /&gt;;</span>
              <span className="text-gray-500 ml-2">{'// No props passed!'}</span>
            </p>
            <p><span className="text-gray-300">{'}'}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// When to Use Which
// ========================================
function WhenToUse() {
  const propsUseCases = [
    { icon: Box, text: '1-2 levels deep', color: 'blue' },
    { icon: Settings, text: 'Component-specific data', color: 'blue' },
    { icon: Layers, text: 'Explicit data flow needed', color: 'blue' },
    { icon: Package, text: 'Reusable in different contexts', color: 'blue' }
  ];

  const contextUseCases = [
    { icon: Globe, text: 'Theme, language, auth (global)', color: 'green' },
    { icon: Network, text: 'Data needed at 3+ levels deep', color: 'green' },
    { icon: Share2, text: 'Multiple components need same data', color: 'green' },
    { icon: RefreshCw, text: 'Data changes infrequently', color: 'green' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">When to Use What?</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Props */}
          <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50/50">
            <div className="flex items-center gap-2 mb-4">
              <ArrowDown className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-blue-700">Use Props When:</h4>
            </div>
            <ul className="space-y-3">
              {propsUseCases.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Context */}
          <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50/50">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-green-600" />
              <h4 className="font-bold text-green-700">Use Context When:</h4>
            </div>
            <ul className="space-y-3">
              {contextUseCases.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 mb-2">Common Pitfalls to Watch Out For:</p>
              <ul className="text-amber-700 text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3" />
                  All consumers re-render when context value changes
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="w-3 h-3" />
                  Split contexts by update frequency to optimize
                </li>
                <li className="flex items-center gap-2">
                  <Package className="w-3 h-3" />
                  Consider Zustand/Jotai for complex state management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// KEY TAKEAWAYS
// ========================================

function KeyTakeaways() {
  const takeaways = [
    { icon: XCircle, text: 'Prop drilling makes components tightly coupled', color: 'text-red-500' },
    { icon: CheckCircle, text: 'Context enables clean component architecture', color: 'text-green-500' },
    { icon: Network, text: 'createContext() + useContext() is the pattern', color: 'text-blue-500' },
    { icon: Zap, text: 'Custom hooks (useUser) make context consumption cleaner', color: 'text-purple-500' },
    { icon: AlertTriangle, text: "Don't overuse - props are fine for shallow trees", color: 'text-amber-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-linear-to-r from-gray-700 to-gray-900 px-6 py-4">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Key Takeaways</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {takeaways.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContextApiScreen() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Context API vs Prop Drilling" icon={Globe} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Network className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">The Prop Drilling Problem</h2>
              <p className="text-blue-100 leading-relaxed">
                When data needs to pass through many component levels, "prop drilling" can make code hard to maintain.
                React's Context API provides a way to share values between components without explicitly passing props.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <XCircle className="w-6 h-6 mx-auto mb-1 text-red-300" />
              <div className="text-sm font-medium">Prop Drilling</div>
              <div className="text-xs text-blue-200">Tightly coupled</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-300" />
              <div className="text-sm font-medium">Context API</div>
              <div className="text-xs text-blue-200">Clean architecture</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Globe className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
              <div className="text-sm font-medium">Global State</div>
              <div className="text-xs text-blue-200">Theme, Auth, Locale</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Zap className="w-6 h-6 mx-auto mb-1 text-purple-300" />
              <div className="text-sm font-medium">Custom Hooks</div>
              <div className="text-xs text-blue-200">useContext pattern</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <PropDrillingDemo />
          <ContextApiDemo />
        </div>

        <div className="space-y-8">
          <WhenToUse />

          {/* Code Example */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-800 px-6 py-4">
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Context API Pattern</h3>
              </div>
            </div>
            <div className="p-6 bg-gray-900 font-mono text-xs leading-relaxed overflow-x-auto space-y-0.5">
              <p><span className="text-gray-500">{'// 1. Create Context with default value'}</span></p>
              <p>
                <span className="text-purple-400">const </span><span className="text-yellow-300">ThemeContext</span><span className="text-gray-300"> = </span><span className="text-yellow-300">createContext</span><span className="text-gray-300">(</span><span className="text-green-400">&apos;light&apos;</span><span className="text-gray-300">);</span>
              </p>

              <p className="mt-3"><span className="text-gray-500">{'// 2. Create Provider component'}</span></p>
              <p>
                <span className="text-purple-400">function </span><span className="text-yellow-300">ThemeProvider</span><span className="text-gray-300">({'{ '}</span><span className="text-orange-300">children</span><span className="text-gray-300">{' }'}) {'{'}</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">const </span><span className="text-gray-300">[</span><span className="text-orange-300">theme</span><span className="text-gray-300">, </span><span className="text-orange-300">setTheme</span><span className="text-gray-300">] = </span><span className="text-yellow-300">useState</span><span className="text-gray-300">(</span><span className="text-green-400">&apos;light&apos;</span><span className="text-gray-300">);</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">const </span><span className="text-orange-300">toggle</span><span className="text-gray-300"> = () =&gt; </span><span className="text-orange-300">setTheme</span><span className="text-gray-300">(t =&gt; t === </span><span className="text-green-400">&apos;light&apos;</span><span className="text-gray-300"> ? </span><span className="text-green-400">&apos;dark&apos;</span><span className="text-gray-300"> : </span><span className="text-green-400">&apos;light&apos;</span><span className="text-gray-300">);</span>
              </p>
              <p className="pl-4 mt-2"><span className="text-purple-400">return </span><span className="text-gray-300">(</span></p>
              <p className="pl-8">
                <span className="text-gray-500">&lt;</span><span className="text-yellow-300">ThemeContext.Provider</span>
                <span className="text-orange-300"> value</span><span className="text-gray-300">={'{{'}  </span><span className="text-blue-300">theme</span><span className="text-gray-300">, </span><span className="text-blue-300">toggle</span><span className="text-gray-300">  {'}}'}&gt;</span>
              </p>
              <p className="pl-12">
                <span className="text-gray-300">{'{'}</span><span className="text-orange-300">children</span><span className="text-gray-300">{'}'}</span>
              </p>
              <p className="pl-8">
                <span className="text-gray-500">&lt;/</span><span className="text-yellow-300">ThemeContext.Provider</span><span className="text-gray-500">&gt;</span>
              </p>
              <p className="pl-4"><span className="text-gray-300">);</span></p>
              <p><span className="text-gray-300">{'}'}</span></p>

              <p className="mt-3"><span className="text-gray-500">{'// 3. Create custom hook for easy access'}</span></p>
              <p>
                <span className="text-purple-400">function </span><span className="text-yellow-300">useTheme</span><span className="text-gray-300">() {'{'}</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">const </span><span className="text-orange-300">context</span><span className="text-gray-300"> = </span><span className="text-yellow-300">useContext</span><span className="text-gray-300">(</span><span className="text-yellow-300">ThemeContext</span><span className="text-gray-300">);</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">if </span><span className="text-gray-300">(!</span><span className="text-orange-300">context</span><span className="text-gray-300">) </span><span className="text-purple-400">throw new </span><span className="text-yellow-300">Error</span><span className="text-gray-300">(</span><span className="text-green-400">&apos;useTheme must be within ThemeProvider&apos;</span><span className="text-gray-300">);</span>
              </p>
              <p className="pl-4"><span className="text-purple-400">return </span><span className="text-orange-300">context</span><span className="text-gray-300">;</span></p>
              <p><span className="text-gray-300">{'}'}</span></p>

              <p className="mt-3"><span className="text-gray-500">{'// 4. Use in any component'}</span></p>
              <p>
                <span className="text-purple-400">function </span><span className="text-yellow-300">Button</span><span className="text-gray-300">() {'{'}</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">const </span><span className="text-gray-300">{'{ '}</span><span className="text-orange-300">theme</span><span className="text-gray-300">, </span><span className="text-orange-300">toggle</span><span className="text-gray-300">{' }'} = </span><span className="text-yellow-300">useTheme</span><span className="text-gray-300">();</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">return </span>
                <span className="text-gray-500">&lt;</span><span className="text-yellow-300">button</span>
                <span className="text-orange-300"> onClick</span><span className="text-gray-300">={'{'}</span><span className="text-blue-300">toggle</span><span className="text-gray-300">{'}'}</span><span className="text-gray-500">&gt;</span>
                <span className="text-gray-300">Theme: {'{'}</span><span className="text-blue-300">theme</span><span className="text-gray-300">{'}'}</span>
                <span className="text-gray-500">&lt;/</span><span className="text-yellow-300">button</span><span className="text-gray-500">&gt;</span><span className="text-gray-300">;</span>
              </p>
              <p><span className="text-gray-300">{'}'}</span></p>
            </div>
          </div>

          <KeyTakeaways />
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
