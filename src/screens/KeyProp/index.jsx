import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Key, AlertTriangle, CheckCircle, XCircle, 
  Plus, Shuffle, Trash2, Info, BookOpen, Lightbulb,
  Hash, Database, RefreshCw, Zap, Code, Eye
} from 'lucide-react';
import DemoNavigation from '../../components/DemoNavigation';

// Header component for all screens
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
          {Icon && <Icon className="w-6 h-6 text-amber-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// Generate sample data
const generateUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${Date.now()}-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
  }));
};

// ========================================
// Bad Example: Using Index as Key
// ========================================
function BadListWithIndexKey() {
  const [users, setUsers] = useState(generateUsers(5));
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(c => c + 1);
  }, [users]);

  const addToStart = () => {
    setUsers([{ id: `user-${Date.now()}`, name: 'New User', email: 'new@example.com' }, ...users]);
  };

  const shuffle = () => {
    setUsers([...users].sort(() => Math.random() - 0.5));
  };

  const remove = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-red-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <XCircle className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">Bad: Using Index as Key</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Try this experiment:</p>
              <ol className="text-red-600 text-sm mt-2 space-y-1 list-decimal list-inside">
                <li>Type something in the input fields below</li>
                <li>Click "Add to Start" or "Shuffle"</li>
                <li>Watch how input values get mixed up!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={addToStart} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add to Start
          </button>
          <button 
            onClick={shuffle} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
          <span className="ml-auto flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
            <RefreshCw className="w-4 h-4" />
            Renders: {renderCount}
          </span>
        </div>

        <div className="space-y-2">
          {users.map((user, index) => (
            <div key={index} className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
              <span className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs font-mono flex items-center gap-1">
                <Hash className="w-3 h-3" />
                key={index}
              </span>
              <span className="font-medium text-gray-700 w-24">{user.name}</span>
              <input
                type="text"
                placeholder="Type here..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400"
              />
              <button 
                onClick={() => remove(index)} 
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Code Example</span>
          </div>
          <pre className="text-sm text-red-300 overflow-x-auto">
{`// ❌ WRONG - Using index as key
{users.map((user, index) => (
  <UserItem key={index} user={user} />
))}

// Problem: When list changes, React reuses
// DOM elements incorrectly based on position`}</pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Good Example: Using Unique ID as Key
// ========================================
function GoodListWithUniqueKey() {
  const [users, setUsers] = useState(generateUsers(5));
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(c => c + 1);
  }, [users]);

  const addToStart = () => {
    setUsers([{ id: `user-${Date.now()}`, name: 'New User', email: 'new@example.com' }, ...users]);
  };

  const shuffle = () => {
    setUsers([...users].sort(() => Math.random() - 0.5));
  };

  const remove = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">Good: Using Unique ID as Key</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-700 font-medium">Try the same experiment:</p>
              <ol className="text-green-600 text-sm mt-2 space-y-1 list-decimal list-inside">
                <li>Type something in the input fields below</li>
                <li>Click "Add to Start" or "Shuffle"</li>
                <li>Input values stay with their items!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={addToStart} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add to Start
          </button>
          <button 
            onClick={shuffle} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
          <span className="ml-auto flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
            <RefreshCw className="w-4 h-4" />
            Renders: {renderCount}
          </span>
        </div>

        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
              <span className="bg-green-200 text-green-700 px-2 py-1 rounded text-xs font-mono truncate max-w-32 flex items-center gap-1">
                <Database className="w-3 h-3" />
                {user.id.slice(-8)}
              </span>
              <span className="font-medium text-gray-700 w-24">{user.name}</span>
              <input
                type="text"
                placeholder="Type here..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
              />
              <button 
                onClick={() => remove(user.id)} 
                className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Code className="w-4 h-4" />
            <span>Code Example</span>
          </div>
          <pre className="text-sm text-green-300 overflow-x-auto">
{`// ✅ CORRECT - Using unique ID as key
{users.map((user) => (
  <UserItem key={user.id} user={user} />
))}

// React correctly tracks each item
// and preserves state during reorders`}</pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// When Index Key is Acceptable
// ========================================
function WhenIndexIsOkay() {
  const staticItems = ['React', 'Vue', 'Angular', 'Svelte'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Info className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">When Index as Key is Acceptable</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Index is OK when:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span className="text-gray-700">List is static and won't change</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span className="text-gray-700">Items will never be reordered</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span className="text-gray-700">Items have no local state (pure display)</span>
              </li>
            </ul>
            
            <div className="mt-5 pt-4 border-t border-green-200">
              <p className="text-sm text-green-600 mb-3 font-medium">Example - Static navigation:</p>
              <div className="flex flex-wrap gap-2">
                {staticItems.map((item, index) => (
                  <span key={index} className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-sm font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Index is BAD when:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span className="text-gray-700">Items can be added, removed, or reordered</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span className="text-gray-700">Items have local state (inputs, selections)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span className="text-gray-700">List is filtered or sorted dynamically</span>
              </li>
            </ul>
            
            <div className="mt-5 pt-4 border-t border-red-200">
              <p className="text-sm text-red-600 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Never use with TODO lists, shopping carts, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// How React Reconciliation Works
// ========================================
function ReconciliationExplainer() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-purple-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <Eye className="w-7 h-7 text-white" />
          <h3 className="text-xl font-bold text-white">How React Uses Keys (Reconciliation)</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              React's Diffing Algorithm
            </h4>
            <div className="space-y-4 text-gray-600 text-sm">
              <p>When you update a list, React needs to figure out what changed:</p>
              <ol className="list-decimal list-inside space-y-2 bg-purple-50 p-4 rounded-lg">
                <li>Compares old and new element lists</li>
                <li>Uses <code className="bg-purple-100 px-1 rounded">key</code> to match old elements to new ones</li>
                <li>Only updates DOM for elements that actually changed</li>
                <li>Preserves state for matched elements</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Why Bad Keys Cause Problems
            </h4>
            <div className="bg-amber-50 p-4 rounded-lg text-sm text-gray-700 space-y-3">
              <p><strong>With index keys after adding item at start:</strong></p>
              <div className="font-mono text-xs bg-white p-3 rounded border border-amber-200">
                <p className="text-gray-500"># Before: ["A", "B", "C"]</p>
                <p>key=0 → A, key=1 → B, key=2 → C</p>
                <p className="text-gray-500 mt-2"># After adding "X": ["X", "A", "B", "C"]</p>
                <p className="text-red-600">key=0 → X (was A!), key=1 → A (was B!), ...</p>
              </div>
              <p className="text-amber-700">React thinks key=0 changed from "A" to "X" instead of recognizing "X" is new!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Key Best Practices
// ========================================
function KeyBestPractices() {
  return (
    <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-7 h-7 text-yellow-300" />
        <h3 className="text-xl font-bold">Key Selection Best Practices</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <Database className="w-8 h-8 text-yellow-300 mb-3" />
          <h4 className="font-bold mb-2">Database IDs</h4>
          <p className="text-white/80 text-sm">Best choice! Unique, stable, and already available.</p>
          <code className="text-xs bg-black/20 px-2 py-1 rounded mt-2 inline-block">
            key={'{'}item.id{'}'}
          </code>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <Key className="w-8 h-8 text-yellow-300 mb-3" />
          <h4 className="font-bold mb-2">UUIDs</h4>
          <p className="text-white/80 text-sm">Generate once when creating the item, not on every render.</p>
          <code className="text-xs bg-black/20 px-2 py-1 rounded mt-2 inline-block">
            key={'{'}crypto.randomUUID(){'}'}
          </code>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <Hash className="w-8 h-8 text-yellow-300 mb-3" />
          <h4 className="font-bold mb-2">Content-Based</h4>
          <p className="text-white/80 text-sm">Combine unique fields when no ID exists.</p>
          <code className="text-xs bg-black/20 px-2 py-1 rounded mt-2 inline-block">
            key={'{`${name}-${email}`}'}
          </code>
        </div>
      </div>

      <div className="mt-6 p-4 bg-red-500/30 rounded-lg">
        <h4 className="font-bold text-red-200 mb-3 flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          Never Use These as Keys
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <code className="text-red-300">Math.random()</code>
            <p className="text-white/70 mt-1">Different every render!</p>
          </div>
          <div>
            <code className="text-red-300">Date.now()</code>
            <p className="text-white/70 mt-1">Changes on re-render</p>
          </div>
          <div>
            <code className="text-red-300">index (dynamic lists)</code>
            <p className="text-white/70 mt-1">Breaks on reorder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KeyPropScreen() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Key Prop & List Rendering" icon={Key} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Keys Matter in React</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Keys are special attributes that help React identify which items in a list have changed, 
                been added, or removed. Using proper keys ensures React can efficiently update the DOM 
                and preserve component state correctly.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Efficient Updates
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  State Preservation
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Correct Reconciliation
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <BadListWithIndexKey />
          <GoodListWithUniqueKey />
          <ReconciliationExplainer />
          <WhenIndexIsOkay />
          <KeyBestPractices />
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gray-800 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold">Key Takeaways</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/20 rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Best Practices
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Always use unique, stable IDs from your data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Use database IDs, UUIDs, or content-based keys
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Keys should be stable across re-renders
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Keys only need to be unique among siblings
                </li>
              </ul>
            </div>
            <div className="bg-red-500/20 rounded-lg p-4">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Common Mistakes
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Using array index for dynamic lists
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Using Math.random() as key
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Using timestamp when list can reorder
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Not using keys at all (causes warnings)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
