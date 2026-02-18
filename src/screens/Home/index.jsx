import { Link } from 'react-router-dom';
import { 
  Key, Zap, List, Timer, Globe, FileText, Rocket, Puzzle,
  BookOpen, Code, ArrowRight, Github, Star, PlayCircle, Layout,
  CheckCircle, TrendingUp, Layers, Coffee
} from 'lucide-react';

const demos = [
  {
    id: 'rendering-basics',
    path: '/rendering-basics',
    title: 'React Rendering Basics',
    description: 'Understand how React renders, Virtual DOM, reconciliation, and the render cycle',
    icon: PlayCircle,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    difficulty: 'Beginner',
    topics: ['Rendering', 'Virtual DOM', 'Reconciliation']
  },
  {
    id: 'key-prop',
    path: '/key-prop',
    title: 'Key Prop & List Rendering',
    description: 'Why unique keys matter, index key pitfalls, and proper key usage in dynamic lists',
    icon: Key,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    difficulty: 'Beginner',
    topics: ['Keys', 'Lists', 'Reconciliation']
  },
  {
    id: 'performance',
    path: '/performance',
    title: 'Performance Optimization',
    description: 'Master useMemo, useCallback, and memo() - know when to use and when NOT to use them',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    difficulty: 'Intermediate',
    topics: ['useMemo', 'useCallback', 'memo()']
  },
  {
    id: 'virtual-list',
    path: '/virtual-list',
    title: 'Virtual Lists & Windowing',
    description: 'Handle 100,000+ items efficiently with virtualization techniques',
    icon: List,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    difficulty: 'Intermediate',
    topics: ['Virtualization', '@tanstack/react-virtual', 'DOM']
  },
  {
    id: 'lazy-loading',
    path: '/lazy-loading',
    title: 'Lazy Loading & Code Splitting',
    description: 'Reduce initial bundle size with React.lazy(), Suspense, and route-based splitting',
    icon: Rocket,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    difficulty: 'Intermediate',
    topics: ['React.lazy()', 'Suspense', 'Dynamic Import']
  },
  {
    id: 'debounce-throttle',
    path: '/debounce-throttle',
    title: 'Debounce & Throttle',
    description: 'Optimize event handlers and API calls with custom hooks for better UX',
    icon: Timer,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    difficulty: 'Intermediate',
    topics: ['Custom Hooks', 'Events', 'API Optimization']
  },
  {
    id: 'context-api',
    path: '/context-api',
    title: 'Context API vs Prop Drilling',
    description: 'Learn when to use Context for global state vs traditional prop passing',
    icon: Globe,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    difficulty: 'Beginner',
    topics: ['useContext', 'Provider', 'State Management']
  },
  {
    id: 'form-validation',
    path: '/form-validation',
    title: 'Form Validation Patterns',
    description: 'Compare manual validation with React Hook Form + Yup schemas approach',
    icon: FileText,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    difficulty: 'Intermediate',
    topics: ['React Hook Form', 'Yup', 'Validation']
  },
  {
    id: 'custom-hooks',
    path: '/custom-hooks',
    title: 'Custom Hooks Collection',
    description: '30 practical custom hooks: useToggle, useFetch, useDebounce, useDarkMode, and more',
    icon: Puzzle,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    difficulty: 'Intermediate',
    topics: ['Custom Hooks', 'Reusability', 'Patterns']
  },
  {
    id: 'design-patterns',
    path: '/design-patterns',
    title: 'Component Design Patterns',
    description: 'Compound components, render props, HOCs, controlled components, and more',
    icon: Layout,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    difficulty: 'Advanced',
    topics: ['Patterns', 'Compound', 'HOC', 'Render Props']
  }
];

const stats = [
  { label: 'Interactive Demos', value: '10', icon: Layers },
  { label: 'Code Examples', value: '65+', icon: Code },
  { label: 'React Concepts', value: '55+', icon: BookOpen },
];

const features = [
  {
    title: 'Learn by Doing',
    description: 'Each demo is fully interactive. Click, type, and see React concepts in action.',
    icon: Coffee
  },
  {
    title: 'Real-World Examples',
    description: 'Patterns and techniques you will actually use in production applications.',
    icon: TrendingUp
  },
  {
    title: 'Code Included',
    description: 'Every demo includes the source code so you can understand the implementation.',
    icon: Code
  }
];

function DifficultyBadge({ level }) {
  const colors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700'
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[level]}`}>
      {level}
    </span>
  );
}

export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Interactive React Learning</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            React Demo
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-pink-200">
              Application
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Master React through hands-on interactive examples. Learn performance optimization, 
            state management, and modern patterns used in production applications.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
              to="/rendering-basics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              React Docs
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why This Demo App?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reading documentation is good, but practicing is better. Each concept is demonstrated 
            with interactive examples you can experiment with.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl mb-4">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Cards Grid */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Layers className="w-8 h-8 inline-block mr-2 text-indigo-600" />
              Explore All Demos
            </h2>
            <p className="text-gray-600">Click on any card to dive into interactive examples</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => (
              <Link
                key={demo.id}
                to={demo.path}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 ${demo.borderColor}`}
              >
                <div className={`p-6 ${demo.bgColor} flex items-center justify-between`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${demo.color} text-white`}>
                    <demo.icon className="w-6 h-6" />
                  </div>
                  <DifficultyBadge level={demo.difficulty} />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {demo.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {demo.topics.map((topic) => (
                      <span key={topic} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-indigo-500 font-medium">
                    <span>Explore Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Covered */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            <Code className="w-8 h-8 inline-block mr-2 text-indigo-600" />
            Topics Covered
          </h2>
          <p className="text-gray-600">All the React concepts and APIs demonstrated in this app</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'useMemo', 'useCallback', 'memo()', 'React.lazy()', 
            'Suspense', 'useContext', 'useRef', 'useEffect',
            'Custom Hooks', 'Yup Schemas', 'React Hook Form', 'Virtualization'
          ].map((topic) => (
            <div key={topic} className="bg-white rounded-xl py-4 px-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <span className="font-medium text-gray-700">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <CheckCircle className="w-8 h-8 inline-block mr-2 text-green-500" />
              Quick Tips for Learning
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">1</span>
                Interact with Everything
              </h3>
              <p className="text-gray-600 ml-10">
                Click buttons, type in inputs, scroll lists. The demos are designed to show real behavior, 
                not just static examples.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
                Open DevTools Console
              </h3>
              <p className="text-gray-600 ml-10">
                Many demos log messages to the console. Open DevTools (F12) to see render counts, 
                function calls, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">3</span>
                Compare Good vs Bad
              </h3>
              <p className="text-gray-600 ml-10">
                Most screens show both the wrong way and the right way to do things. Compare them 
                to understand why best practices matter.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">4</span>
                Read the Code Examples
              </h3>
              <p className="text-gray-600 ml-10">
                Each demo includes code snippets showing the implementation. Study them and try 
                implementing similar patterns in your projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">React Demo App</h3>
              <p className="text-gray-400">Built with React 19, Vite, and Tailwind CSS</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://react.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                React Docs
              </a>
              <a 
                href="https://github.com/facebook/react" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>Made with ♥ for learning React</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
