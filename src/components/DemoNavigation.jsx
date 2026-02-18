import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

const demoOrder = [
  { path: '/rendering-basics', title: 'Rendering Basics' },
  { path: '/key-prop', title: 'Key Prop' },
  { path: '/performance', title: 'Performance' },
  { path: '/virtual-list', title: 'Virtual Lists' },
  { path: '/lazy-loading', title: 'Lazy Loading' },
  { path: '/debounce-throttle', title: 'Debounce & Throttle' },
  { path: '/context-api', title: 'Context API' },
  { path: '/form-validation', title: 'Form Validation' },
  { path: '/custom-hooks', title: 'Custom Hooks' },
  { path: '/design-patterns', title: 'Design Patterns' },
];

export default function DemoNavigation() {
  const { pathname } = useLocation();
  
  const currentIndex = demoOrder.findIndex(demo => demo.path === pathname);
  const prevDemo = currentIndex > 0 ? demoOrder[currentIndex - 1] : null;
  const nextDemo = currentIndex < demoOrder.length - 1 ? demoOrder[currentIndex + 1] : null;

  return (
    <div className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex-1">
            {prevDemo ? (
              <Link
                to={prevDemo.path}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-xs text-gray-500 block">Previous</span>
                  <span className="font-medium">{prevDemo.title}</span>
                </div>
              </Link>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all group"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </Link>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-1">
            {demoOrder.map((demo, index) => (
              <Link
                key={demo.path}
                to={demo.path}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-indigo-500 w-6' 
                    : index < currentIndex 
                      ? 'bg-indigo-300 hover:bg-indigo-400' 
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={demo.title}
              />
            ))}
          </div>

          {/* Next Button */}
          <div className="flex-1 flex justify-end">
            {nextDemo ? (
              <Link
                to={nextDemo.path}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all group"
              >
                <div className="text-right">
                  <span className="text-xs text-indigo-200 block">Next Demo</span>
                  <span className="font-medium">{nextDemo.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all group"
              >
                <span className="font-medium">Complete!</span>
                <Home className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Progress Text */}
        <div className="md:hidden text-center mt-4 text-sm text-gray-500">
          Demo {currentIndex + 1} of {demoOrder.length}
        </div>
      </div>
    </div>
  );
}
