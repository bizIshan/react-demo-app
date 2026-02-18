import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  PlayCircle,
  RefreshCw,
  Layers,
  GitBranch,
  Zap,
  CheckCircle,
  AlertTriangle,
  Code,
  Lightbulb,
  Eye,
  FileCode,
  ArrowRight,
  TreeDeciduous,
  Diff,
  Timer,
  Box,
  XCircle
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
          {Icon && <Icon className="w-6 h-6 text-cyan-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// Concept Card Component
function ConceptCard({ icon, title, description, color, children }) {
  const IconComponent = icon;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`p-4 bg-linear-to-r ${color}`}>
        <div className="flex items-center gap-3 text-white">
          <IconComponent className="w-6 h-6" />
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
}

// Interactive State Update Demo - Each state change triggers a re-render
function RenderCounterDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [stateUpdates, setStateUpdates] = useState(0);

  const handleCountChange = (delta) => {
    setCount(c => c + delta);
    setStateUpdates(u => u + 1);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setStateUpdates(u => u + 1);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">State updates (each triggers a re-render):</span>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">
          {stateUpdates} updates
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Change count (triggers re-render):</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleCountChange(-1)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              -
            </button>
            <span className="px-4 py-2 bg-gray-200 rounded-lg font-mono">{count}</span>
            <button
              onClick={() => handleCountChange(1)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
        
        <div>
          <label className="text-sm text-gray-600 block mb-1">Type here (triggers re-render):</label>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Type something..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Every state change causes a re-render. Watch the counter increase!
      </p>
    </div>
  );
}

// Parent-Child Render Demo - Shows how parent state updates propagate to children
function ParentChildDemo() {
  const [parentUpdates, setParentUpdates] = useState(0);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-blue-800">Parent Component</span>
          <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
            State updates: {parentUpdates}
          </span>
        </div>
        <button
          onClick={() => setParentUpdates(c => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Update Parent State
        </button>
        
        <div className="mt-4 ml-4 border-l-4 border-blue-300 pl-4">
          <ChildComponent parentUpdates={parentUpdates} />
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        When parent re-renders, children re-render too (unless optimized with memo).
      </p>
    </div>
  );
}

function ChildComponent({ parentUpdates }) {
  return (
    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
      <div className="flex items-center justify-between">
        <span className="font-bold text-green-800">Child Component</span>
        <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm">
          Received: {parentUpdates} updates
        </span>
      </div>
      <p className="text-sm text-green-700 mt-2">I re-render when my parent does!</p>
    </div>
  );
}

// Virtual DOM Visualization
function VirtualDOMVisualization() {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: "Initial Render", desc: "React creates Virtual DOM tree from your components" },
    { title: "State Changes", desc: "You call setState() or a prop changes" },
    { title: "New Virtual DOM", desc: "React creates a new Virtual DOM tree" },
    { title: "Diffing", desc: "React compares old vs new Virtual DOM (reconciliation)" },
    { title: "Minimal Updates", desc: "Only changed nodes are updated in real DOM" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              step === i 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-6 min-h-30">
        <h4 className="font-bold text-indigo-800 mb-2">{steps[step].title}</h4>
        <p className="text-indigo-700">{steps[step].desc}</p>
        
        {step === 3 && (
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white p-3 rounded border-2 border-red-300">
              <code className="text-red-600">&lt;div&gt;Old&lt;/div&gt;</code>
            </div>
            <ArrowRight className="w-6 h-6 text-indigo-500" />
            <div className="bg-white p-3 rounded border-2 border-green-300">
              <code className="text-green-600">&lt;div&gt;New&lt;/div&gt;</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Code Example Component
function CodeExample({ title, code, type = 'good' }) {
  return (
    <div className={`rounded-lg overflow-hidden ${type === 'good' ? 'bg-green-900' : 'bg-red-900'}`}>
      <div className={`px-4 py-2 flex items-center gap-2 ${type === 'good' ? 'bg-green-800' : 'bg-red-800'}`}>
        {type === 'good' ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400" />
        )}
        <span className={`text-sm font-medium ${type === 'good' ? 'text-green-200' : 'text-red-200'}`}>
          {title}
        </span>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-gray-200">{code}</code>
      </pre>
    </div>
  );
}

export default function RenderingBasicsScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScreenHeader title="React Rendering Basics" icon={PlayCircle} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <PlayCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Understanding React Rendering</h2>
              <p className="text-cyan-100 text-lg">
                Before optimizing, you need to understand how React decides when and what to render.
                This foundation is crucial for building performant applications.
              </p>
            </div>
          </div>
        </div>

        {/* What is Rendering Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <RefreshCw className="w-7 h-7 text-cyan-500" />
            What is Rendering?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Rendering = Calling Your Function</h3>
              <p className="text-gray-600 mb-4">
                In React, &quot;rendering&quot; means React is calling your component function to get the JSX 
                that describes what should be on screen.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-700">
                  <span className="text-purple-600">function</span> <span className="text-blue-600">MyComponent</span>() &#123;<br />
                  &nbsp;&nbsp;<span className="text-gray-500">// This code runs on every render</span><br />
                  &nbsp;&nbsp;<span className="text-purple-600">return</span> &lt;<span className="text-green-600">div</span>&gt;Hello&lt;/<span className="text-green-600">div</span>&gt;;<br />
                  &#125;
                </code>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Rendering ≠ DOM Update</h3>
              <p className="text-gray-600 mb-4">
                Important! Rendering doesn&apos;t always mean the DOM changes. React compares the 
                render output and only updates what&apos;s different.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                <p className="text-sm text-amber-800">
                  A component can render many times without any visible change to the page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* When Does React Re-render Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Zap className="w-7 h-7 text-yellow-500" />
            When Does React Re-render?
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className="font-bold text-blue-800 mb-2">State Changes</h4>
                <p className="text-sm text-blue-600">
                  Calling <code className="bg-blue-100 px-1 rounded">setState()</code> or 
                  <code className="bg-blue-100 px-1 rounded">useState</code> setter
                </p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-bold text-green-800 mb-2">Props Change</h4>
                <p className="text-sm text-green-600">
                  Parent passes different props to the child component
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className="font-bold text-purple-800 mb-2">Parent Re-renders</h4>
                <p className="text-sm text-purple-600">
                  When parent renders, all children render by default
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="grid md:grid-cols-2 gap-6">
            <ConceptCard
              icon={RefreshCw}
              title="Try It: Render Counter"
              description="Watch how state changes trigger re-renders:"
              color="from-purple-500 to-indigo-500"
            >
              <RenderCounterDemo />
            </ConceptCard>

            <ConceptCard
              icon={GitBranch}
              title="Try It: Parent-Child Renders"
              description="See how parent renders cascade to children:"
              color="from-blue-500 to-cyan-500"
            >
              <ParentChildDemo />
            </ConceptCard>
          </div>
        </div>

        {/* Virtual DOM Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <TreeDeciduous className="w-7 h-7 text-green-500" />
            The Virtual DOM & Reconciliation
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-3">What is the Virtual DOM?</h3>
                <p className="text-gray-600 mb-4">
                  The Virtual DOM is a JavaScript representation of the real DOM. It&apos;s a lightweight 
                  copy that React uses to determine what changes need to be made.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">Faster than manipulating real DOM directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">Enables declarative UI updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">Batches multiple updates efficiently</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-3">What is Reconciliation?</h3>
                <p className="text-gray-600 mb-4">
                  Reconciliation is React&apos;s algorithm for comparing two Virtual DOM trees and 
                  determining the minimum number of changes needed.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Diff className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">Compares element types first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Diff className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">Uses keys to track list items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Diff className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">Only updates changed attributes</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-3">The Rendering Pipeline</h3>
            <VirtualDOMVisualization />
          </div>
        </div>

        {/* Render Phases Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Layers className="w-7 h-7 text-indigo-500" />
            The Two Phases of Rendering
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-linear-to-r from-blue-500 to-indigo-500 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  Phase 1: Render Phase
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  React calls your components and calculates what changes need to be made.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                    <span className="text-gray-600">Calls component functions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                    <span className="text-gray-600">Creates new Virtual DOM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                    <span className="text-gray-600">Diffs with previous Virtual DOM</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <strong>Pure & No Side Effects.</strong> This phase can be paused/restarted.
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-linear-to-r from-green-500 to-emerald-500 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Phase 2: Commit Phase
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  React applies the calculated changes to the actual DOM.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                    <span className="text-gray-600">Updates the real DOM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                    <span className="text-gray-600">Runs useLayoutEffect</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                    <span className="text-gray-600">Browser paints the screen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                    <span className="text-gray-600">Runs useEffect</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-700">
                  <strong>Synchronous.</strong> Cannot be interrupted once started.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Misconceptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
            Common Misconceptions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-bold text-red-800">Myth</h3>
              </div>
              <p className="text-gray-700 mb-4">&quot;Every render causes a DOM update&quot;</p>
              
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-green-800">Reality</h3>
              </div>
              <p className="text-gray-600">
                React only updates the DOM when the render output is different from the previous render.
                Many renders result in zero DOM changes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-bold text-red-800">Myth</h3>
              </div>
              <p className="text-gray-700 mb-4">&quot;Re-renders are always bad for performance&quot;</p>
              
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-green-800">Reality</h3>
              </div>
              <p className="text-gray-600">
                Re-renders are usually very fast! Only optimize when you measure an actual 
                performance problem. Premature optimization often adds complexity without benefit.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-bold text-red-800">Myth</h3>
              </div>
              <p className="text-gray-700 mb-4">&quot;useState causes the whole app to re-render&quot;</p>
              
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-green-800">Reality</h3>
              </div>
              <p className="text-gray-600">
                State updates only cause the component and its children to re-render. 
                Parent and sibling components are not affected.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-bold text-red-800">Myth</h3>
              </div>
              <p className="text-gray-700 mb-4">&quot;You should memo() everything to prevent re-renders&quot;</p>
              
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-green-800">Reality</h3>
              </div>
              <p className="text-gray-600">
                memo() has its own cost. It needs to compare props on every render.
                Only use it for components that render often with the same props.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 text-yellow-500" />
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <CodeExample
              title="Keep state close to where it's used"
              type="good"
              code={`// Good: State in the component that needs it
function SearchResults() {
  const [query, setQuery] = useState('');
  // Only SearchResults re-renders on type
  return <input value={query} onChange={...} />;
}`}
            />

            <CodeExample
              title="Avoid lifting state unnecessarily"
              type="bad"
              code={`// Bad: State in parent when only child needs it
function App() {
  const [query, setQuery] = useState('');
  // Entire App re-renders on every keystroke!
  return <SearchResults query={query} />;
}`}
            />

            <CodeExample
              title="Compute values during render"
              type="good"
              code={`function ProductList({ products, filter }) {
  // Computed value - no state needed
  const filtered = products.filter(p => 
    p.name.includes(filter)
  );
  return <ul>{filtered.map(...)}</ul>;
}`}
            />

            <CodeExample
              title="Don't store derived state"
              type="bad"
              code={`function ProductList({ products, filter }) {
  // Bad: Storing computed value in state
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(products.filter(...));
  }, [products, filter]);
}`}
            />
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Key Takeaways
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-cyan-200">•</span>
                Rendering means calling your component function
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-200">•</span>
                State changes, prop changes, and parent re-renders trigger renders
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-200">•</span>
                Virtual DOM makes updates efficient through diffing
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-cyan-200">•</span>
                Re-renders are usually fast - don&apos;t optimize prematurely
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-200">•</span>
                Keep state close to where it&apos;s needed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-200">•</span>
                Compute derived values during render, not in state
              </li>
            </ul>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
