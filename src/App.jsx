import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomeScreen from './screens/Home';
import RenderingBasicsScreen from './screens/RenderingBasics';
import KeyPropScreen from './screens/KeyProp';
import PerformanceScreen from './screens/Performance';
import VirtualListScreen from './screens/VirtualList';
import LazyLoadingScreen from './screens/LazyLoading';
import DebounceThrottleScreen from './screens/DebounceThrottle';
import ContextApiScreen from './screens/ContextApi';
import FormValidationScreen from './screens/FormValidation';
import CustomHooksScreen from './screens/CustomHooks';
import DesignPatternsScreen from './screens/DesignPatterns';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/rendering-basics" element={<RenderingBasicsScreen />} />
      <Route path="/key-prop" element={<KeyPropScreen />} />
      <Route path="/performance" element={<PerformanceScreen />} />
      <Route path="/virtual-list" element={<VirtualListScreen />} />
      <Route path="/lazy-loading" element={<LazyLoadingScreen />} />
      <Route path="/debounce-throttle" element={<DebounceThrottleScreen />} />
      <Route path="/context-api" element={<ContextApiScreen />} />
      <Route path="/form-validation" element={<FormValidationScreen />} />
      <Route path="/custom-hooks" element={<CustomHooksScreen />} />
      <Route path="/design-patterns" element={<DesignPatternsScreen />} />
    </Routes>
    </>
  );
}

export default App;
