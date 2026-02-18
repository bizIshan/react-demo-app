import { useState, createContext, useContext, Children, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Layout,
  Puzzle,
  Box,
  Layers,
  GitMerge,
  Code,
  CheckCircle,
  XCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Settings,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ChevronDown,
  ChevronUp,
  X,
  FileCode
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
          {Icon && <Icon className="w-6 h-6 text-rose-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// Pattern Card Component
function PatternCard({ icon, title, description, difficulty, color, children }) {
  const IconComponent = icon;
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`p-4 bg-linear-to-r ${color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <IconComponent className="w-6 h-6" />
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
}

// Code Block Component
function CodeBlock({ code, title }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400">{title}</span>
        </div>
      )}
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-gray-200">{code}</code>
      </pre>
    </div>
  );
}

// ========================================
// Pattern 1: Compound Components
// ========================================
const AccordionContext = createContext();

function Accordion({ children, defaultOpen = null }) {
  const [openItem, setOpenItem] = useState(defaultOpen);
  
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="border rounded-lg divide-y">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }) {
  return (
    <div className="accordion-item" data-id={id}>
      {Children.map(children, child => 
        cloneElement(child, { itemId: id })
      )}
    </div>
  );
}

function AccordionHeader({ children, itemId }) {
  const { openItem, setOpenItem } = useContext(AccordionContext);
  const isOpen = openItem === itemId;
  
  return (
    <button
      onClick={() => setOpenItem(isOpen ? null : itemId)}
      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-800">{children}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );
}

function AccordionContent({ children, itemId }) {
  const { openItem } = useContext(AccordionContext);
  
  if (openItem !== itemId) return null;
  
  return (
    <div className="px-4 py-3 bg-gray-50 text-gray-600">
      {children}
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

function CompoundComponentDemo() {
  return (
    <div className="space-y-4">
      <Accordion defaultOpen="item1">
        <Accordion.Item id="item1">
          <Accordion.Header>What is React?</Accordion.Header>
          <Accordion.Content>
            React is a JavaScript library for building user interfaces.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="item2">
          <Accordion.Header>Why use React?</Accordion.Header>
          <Accordion.Content>
            React makes it easy to create interactive UIs with reusable components.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="item3">
          <Accordion.Header>How to learn React?</Accordion.Header>
          <Accordion.Content>
            Start with the official docs and build small projects!
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      
      <CodeBlock
        title="Usage"
        code={`<Accordion defaultOpen="item1">
  <Accordion.Item id="item1">
    <Accordion.Header>Title</Accordion.Header>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion.Item>
</Accordion>`}
      />
    </div>
  );
}

// ========================================
// Pattern 2: Render Props
// ========================================
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    });
  };
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      className="h-40 bg-gray-100 rounded-lg relative cursor-crosshair"
    >
      {render(position)}
    </div>
  );
}

function RenderPropsDemo() {
  return (
    <div className="space-y-4">
      <MouseTracker
        render={({ x, y }) => (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-gray-600">
                Mouse: <span className="font-mono font-bold">{x}, {y}</span>
              </p>
            </div>
          </div>
        )}
      />
      
      <CodeBlock
        title="Implementation"
        code={`function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)} {/* Consumer decides rendering */}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => (
  <span>Position: {x}, {y}</span>
)} />`}
      />
    </div>
  );
}

// ========================================
// Pattern 3: Higher-Order Components (HOC)
// ========================================
function withLoading(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';
  
  const WithLoadingComponent = ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    return <BaseComponent {...props} />;
  };
  
  WithLoadingComponent.displayName = `withLoading(${displayName})`;
  return WithLoadingComponent;
}

function UserList({ users }) {
  return (
    <ul className="divide-y">
      {users.map(user => (
        <li key={user.id} className="py-2 flex items-center gap-3">
          <User className="w-5 h-5 text-gray-400" />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

function HOCDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setIsLoading(true)}
          className={`px-4 py-2 rounded-lg ${isLoading ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Loading
        </button>
        <button
          onClick={() => setIsLoading(false)}
          className={`px-4 py-2 rounded-lg ${!isLoading ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Loaded
        </button>
      </div>
      
      <div className="border rounded-lg p-4">
        <UserListWithLoading isLoading={isLoading} users={users} />
      </div>
      
      <CodeBlock
        title="HOC Pattern"
        code={`function withLoading(WrappedComponent) {
  return function({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);

// Usage
<UserListWithLoading isLoading={true} users={[]} />`}
      />
    </div>
  );
}

// ========================================
// Pattern 4: Container/Presentational
// ========================================
// Container Component (Logic)
function UserCardContainer() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newName) => {
    setUser(prev => ({ ...prev, name: newName }));
    setIsEditing(false);
  };

  return (
    <UserCardPresentation
      user={user}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  );
}

// Presentational Component (UI)
function UserCardPresentation({ user, isEditing, onEdit, onSave, onCancel }) {
  const [editName, setEditName] = useState(user.name);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-1 border rounded"
            />
          ) : (
            <h4 className="font-bold">{user.name}</h4>
          )}
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={() => onSave(editName)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
          >
            Edit Name
          </button>
        )}
      </div>
    </div>
  );
}

function ContainerPresentationalDemo() {
  return (
    <div className="space-y-4">
      <UserCardContainer />
      
      <div className="grid md:grid-cols-2 gap-4">
        <CodeBlock
          title="Container (Logic)"
          code={`function UserCardContainer() {
  const [user, setUser] = useState({...});
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newName) => {
    setUser(prev => ({ ...prev, name: newName }));
    setIsEditing(false);
  };

  return (
    <UserCardPresentation
      user={user}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
    />
  );
}`}
        />
        <CodeBlock
          title="Presentational (UI)"
          code={`function UserCardPresentation({ 
  user, isEditing, onEdit, onSave 
}) {
  // Only handles rendering
  return (
    <div>
      {isEditing ? (
        <input ... />
      ) : (
        <h4>{user.name}</h4>
      )}
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}

// ========================================
// Pattern 5: Controlled vs Uncontrolled
// ========================================
function ControlledVsUncontrolledDemo() {
  // Controlled input
  const [controlledValue, setControlledValue] = useState('');
  
  // Uncontrolled input ref
  const uncontrolledRef = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Controlled */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h4 className="font-bold text-green-800">Controlled Input</h4>
          </div>
          <input
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Type here..."
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-sm text-gray-600">
            Value: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{controlledValue || '(empty)'}</span>
          </p>
          <p className="text-xs text-gray-500">
            React controls the value. Every keystroke updates state.
          </p>
        </div>

        {/* Uncontrolled */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-amber-800">Uncontrolled Input</h4>
          </div>
          <input
            type="text"
            ref={uncontrolledRef}
            defaultValue=""
            placeholder="Type here..."
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-sm text-gray-600">
            Value lives in the DOM. Access via ref when needed.
          </p>
          <p className="text-xs text-gray-500">
            DOM controls the value. React only reads it when necessary.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CodeBlock
          title="Controlled"
          code={`const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Access value anytime: value`}
        />
        <CodeBlock
          title="Uncontrolled"
          code={`const inputRef = useRef();

<input
  ref={inputRef}
  defaultValue=""
/>

// Access value: inputRef.current.value`}
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-bold text-blue-800 mb-2">When to use which?</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-blue-700 mb-1">Use Controlled when:</p>
            <ul className="text-blue-600 space-y-1">
              <li>• Real-time validation needed</li>
              <li>• Format input as user types</li>
              <li>• Conditional disable/submit</li>
              <li>• Multiple inputs depend on each other</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-blue-700 mb-1">Use Uncontrolled when:</p>
            <ul className="text-blue-600 space-y-1">
              <li>• Simple forms with submit</li>
              <li>• Integration with non-React code</li>
              <li>• File inputs (always uncontrolled)</li>
              <li>• Performance-critical scenarios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Pattern 6: Custom Hook Pattern
// ========================================
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialValues);

  return { values, errors, handleChange, reset, setErrors };
}

function CustomHookPatternDemo() {
  const modal = useToggle(false);
  const darkMode = useToggle(false);
  const { values, handleChange, reset } = useForm({ email: '', password: '' });

  return (
    <div className="space-y-6">
      {/* useToggle Demo */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800">useToggle Hook</h4>
        <div className="flex gap-4">
          <button
            onClick={modal.toggle}
            className={`px-4 py-2 rounded-lg ${modal.value ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {modal.value ? 'Close Modal' : 'Open Modal'}
          </button>
          <button
            onClick={darkMode.toggle}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode.value ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            {darkMode.value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {darkMode.value ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {modal.value && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            Modal is open! Click the button to close.
          </div>
        )}
      </div>

      {/* useForm Demo */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800">useForm Hook</h4>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-gray-400" />
              <label className="text-sm text-gray-600">Email</label>
            </div>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter email"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-gray-400" />
              <label className="text-sm text-gray-600">Password</label>
            </div>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 rounded-lg self-end"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Values: {JSON.stringify(values)}
        </p>
      </div>

      <CodeBlock
        title="Custom Hook Example"
        code={`function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}

// Usage
const modal = useToggle(false);
<button onClick={modal.toggle}>Toggle</button>`}
      />
    </div>
  );
}

// ========================================
// Pattern Comparison Table
// ========================================
function PatternComparisonTable() {
  const patterns = [
    {
      name: 'Compound Components',
      useCase: 'Related components that share state',
      complexity: 'Medium',
      examples: 'Tabs, Accordion, Select'
    },
    {
      name: 'Render Props',
      useCase: 'Share behavior, consumer controls rendering',
      complexity: 'Medium',
      examples: 'Mouse tracker, Data fetching'
    },
    {
      name: 'HOC',
      useCase: 'Add functionality to existing components',
      complexity: 'High',
      examples: 'withAuth, withLoading'
    },
    {
      name: 'Container/Presentational',
      useCase: 'Separate logic from UI',
      complexity: 'Low',
      examples: 'Data containers, Forms'
    },
    {
      name: 'Controlled Components',
      useCase: 'Form inputs with real-time validation',
      complexity: 'Low',
      examples: 'Search input, Filters'
    },
    {
      name: 'Custom Hooks',
      useCase: 'Reusable stateful logic',
      complexity: 'Medium',
      examples: 'useForm, useAuth, useFetch'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left font-bold text-gray-700">Pattern</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700">Best For</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700">Complexity</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700">Examples</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {patterns.map((pattern) => (
            <tr key={pattern.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{pattern.name}</td>
              <td className="px-4 py-3 text-gray-600">{pattern.useCase}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  pattern.complexity === 'Low' ? 'bg-green-100 text-green-700' :
                  pattern.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {pattern.complexity}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">{pattern.examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DesignPatternsScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScreenHeader title="Component Design Patterns" icon={Layout} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Layout className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">React Component Design Patterns</h2>
              <p className="text-rose-100 text-lg">
                Learn battle-tested patterns for building flexible, reusable, and maintainable 
                React components. These patterns solve common UI challenges elegantly.
              </p>
            </div>
          </div>
        </div>

        {/* Pattern Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-rose-500" />
            Pattern Overview
          </h2>
          <PatternComparisonTable />
        </div>

        {/* Pattern 1: Compound Components */}
        <div className="mb-8">
          <PatternCard
            icon={Puzzle}
            title="Compound Components"
            description="Create a set of components that work together, sharing implicit state. Users compose them freely while the parent manages shared logic."
            difficulty="Intermediate"
            color="from-violet-500 to-purple-500"
          >
            <CompoundComponentDemo />
          </PatternCard>
        </div>

        {/* Pattern 2: Render Props */}
        <div className="mb-8">
          <PatternCard
            icon={GitMerge}
            title="Render Props"
            description="Share code between components using a prop whose value is a function. The component calls this function to know what to render."
            difficulty="Intermediate"
            color="from-blue-500 to-cyan-500"
          >
            <RenderPropsDemo />
          </PatternCard>
        </div>

        {/* Pattern 3: HOC */}
        <div className="mb-8">
          <PatternCard
            icon={Layers}
            title="Higher-Order Components (HOC)"
            description="A function that takes a component and returns a new enhanced component. Useful for cross-cutting concerns like auth, logging, or loading states."
            difficulty="Advanced"
            color="from-orange-500 to-red-500"
          >
            <HOCDemo />
          </PatternCard>
        </div>

        {/* Pattern 4: Container/Presentational */}
        <div className="mb-8">
          <PatternCard
            icon={Box}
            title="Container/Presentational"
            description="Separate components into containers (handle logic/data) and presentational components (handle rendering). Improves reusability and testing."
            difficulty="Beginner"
            color="from-green-500 to-emerald-500"
          >
            <ContainerPresentationalDemo />
          </PatternCard>
        </div>

        {/* Pattern 5: Controlled vs Uncontrolled */}
        <div className="mb-8">
          <PatternCard
            icon={Settings}
            title="Controlled vs Uncontrolled"
            description="Controlled components have their state managed by React, while uncontrolled components manage their own state in the DOM."
            difficulty="Beginner"
            color="from-indigo-500 to-violet-500"
          >
            <ControlledVsUncontrolledDemo />
          </PatternCard>
        </div>

        {/* Pattern 6: Custom Hooks */}
        <div className="mb-8">
          <PatternCard
            icon={FileCode}
            title="Custom Hook Pattern"
            description="Extract component logic into reusable functions. Custom hooks let you share stateful logic without changing your component hierarchy."
            difficulty="Intermediate"
            color="from-teal-500 to-cyan-500"
          >
            <CustomHookPatternDemo />
          </PatternCard>
        </div>

        {/* When to Use Which Pattern */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 text-yellow-500" />
            Choosing the Right Pattern
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Modern Recommendations
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-800">Prefer Custom Hooks</strong>
                    <p className="text-sm text-gray-600">For reusable logic, hooks are simpler than HOCs or render props</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-800">Use Compound Components</strong>
                    <p className="text-sm text-gray-600">For flexible, composable UI libraries</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-800">Controlled by Default</strong>
                    <p className="text-sm text-gray-600">Use controlled inputs unless you have a specific reason not to</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Legacy Patterns (Less Common Now)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-800">HOCs</strong>
                    <p className="text-sm text-gray-600">Still useful but hooks often provide cleaner solutions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-800">Render Props</strong>
                    <p className="text-sm text-gray-600">Can cause &quot;callback hell&quot;; prefer hooks when possible</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-800">Strict Container/Presentational</strong>
                    <p className="text-sm text-gray-600">Hooks blur this line; use when helpful, not as a rule</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Key Takeaways
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-200">•</span>
                Patterns solve recurring problems - learn when each applies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-200">•</span>
                Custom hooks have largely replaced HOCs and render props
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-200">•</span>
                Compound components excel for flexible UI libraries
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-200">•</span>
                Controlled components give you more control, use by default
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-200">•</span>
                Don&apos;t force patterns - use them when they genuinely help
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-200">•</span>
                Combine patterns as needed for your specific use case
              </li>
            </ul>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
