import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import DemoNavigation from '../../components/DemoNavigation';
import {
  ArrowLeft,
  Puzzle,
  Code,
  Lightbulb,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Clock,
  Database,
  Loader2,
  FileCode,
  Eye,
  Monitor,
  Smartphone,
  MapPin,
  Maximize,
  Play,
  MousePointer2,
  Moon,
  Sun,
  Copy,
  Cookie,
  Languages,
  Wifi,
  WifiOff,
  Bug,
  Hand,
  Search,
  XCircle,
  Layers,
  Zap,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';

// ============================================
// HEADER COMPONENT
// ============================================
function ScreenHeader({ title, icon: Icon }) {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <Icon className="w-6 h-6 text-purple-500" />
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CUSTOM HOOKS IMPLEMENTATIONS
// ============================================

// #1 - useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse];
}

// #2 - useTimeout
function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

// #3 - useDebounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// #4 - useUpdateEffect
function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}

// #5 - useArray
function useArray(initialArray = []) {
  const [array, setArray] = useState(initialArray);

  const push = useCallback((element) => {
    setArray(a => [...a, element]);
  }, []);

  const filter = useCallback((callback) => {
    setArray(a => a.filter(callback));
  }, []);

  const update = useCallback((index, newElement) => {
    setArray(a => a.map((el, i) => (i === index ? newElement : el)));
  }, []);

  const remove = useCallback((index) => {
    setArray(a => a.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setArray([]), []);

  return { array, set: setArray, push, filter, update, remove, clear };
}

// #6 - usePrevious
function usePrevious(value) {
  const currentRef = useRef(value);
  const previousRef = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

// #7 - useStateWithHistory
function useStateWithHistory(initialValue, capacity = 10) {
  const [value, setValue] = useState(initialValue);
  const historyRef = useRef([initialValue]);
  const pointerRef = useRef(0);

  const set = useCallback((v) => {
    const resolvedValue = typeof v === 'function' ? v(value) : v;
    if (historyRef.current[pointerRef.current] !== resolvedValue) {
      if (pointerRef.current < historyRef.current.length - 1) {
        historyRef.current.splice(pointerRef.current + 1);
      }
      historyRef.current.push(resolvedValue);
      while (historyRef.current.length > capacity) {
        historyRef.current.shift();
      }
      pointerRef.current = historyRef.current.length - 1;
    }
    setValue(resolvedValue);
  }, [capacity, value]);

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index) => {
    if (index < 0 || index >= historyRef.current.length) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return {
    value,
    set,
    back,
    forward,
    go,
    history: historyRef.current,
    pointer: pointerRef.current,
  };
}

// #8 - useStorage (localStorage/sessionStorage)
function useStorage(key, initialValue, storageType = 'local') {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  
  const [value, setValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      const valueToStore = typeof newValue === 'function' ? newValue(value) : newValue;
      setValue(valueToStore);
      storage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('useStorage error:', error);
    }
  }, [key, storage, value]);

  const remove = useCallback(() => {
    try {
      storage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error('useStorage remove error:', error);
    }
  }, [key, storage, initialValue]);

  return [value, setStoredValue, remove];
}

// #9 - useAsync
function useAsync(asyncFunction, immediate = true) {
  const [state, setState] = useState({
    loading: immediate,
    error: null,
    data: null,
  });

  const execute = useCallback(async (...args) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await asyncFunction(...args);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { ...state, execute };
}

// #10 - useFetch
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { ...options, signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// #11 - useScript
function useScript(src) {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
    } else {
      setStatus(script.getAttribute('data-status') || 'ready');
    }

    const handleLoad = () => {
      script.setAttribute('data-status', 'ready');
      setStatus('ready');
    };

    const handleError = () => {
      script.setAttribute('data-status', 'error');
      setStatus('error');
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return status;
}

// #12 - useDeepCompareEffect
function useDeepCompareEffect(callback, dependencies) {
  const previousRef = useRef();

  const deepEqual = (a, b) => {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key]));
  };

  if (!deepEqual(previousRef.current, dependencies)) {
    previousRef.current = dependencies;
  }

  useEffect(callback, [previousRef.current]);
}

// #13 - useEventListener
function useEventListener(eventName, handler, element = window, options) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element?.current || element;
    if (!targetElement?.addEventListener) return;

    const listener = (event) => savedHandler.current(event);
    targetElement.addEventListener(eventName, listener, options);

    return () => targetElement.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}

// #14 - useOnScreen
function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

// #15 - useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// #16 - useMediaQuery
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    setMatches(mediaQuery.matches);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// #17 - useGeolocation
function useGeolocation(options = {}) {
  const [state, setState] = useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    const successHandler = (position) => {
      setState({
        loading: false,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
        error: null,
      });
    };

    const errorHandler = (error) => {
      setState(prev => ({ ...prev, loading: false, error }));
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, options);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}

// #18 - useStateWithValidation
function useStateWithValidation(validationFunc, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(() => validationFunc(initialValue));

  const onChange = useCallback((nextValue) => {
    const newValue = typeof nextValue === 'function' ? nextValue(value) : nextValue;
    setValue(newValue);
    setIsValid(validationFunc(newValue));
  }, [validationFunc, value]);

  return [value, onChange, isValid];
}

// #19 - useSize
function useSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

// #20 - useEffectOnce
function useEffectOnce(callback) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    return callback();
  }, []);
}

// #21 - useClickOutside
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// #22 - useDarkMode
function useDarkMode() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useStorage('dark-mode', prefersDark);

  const toggle = useCallback(() => setDarkMode(prev => !prev), [setDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return [darkMode, toggle, setDarkMode];
}

// #23 - useCopyToClipboard
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);
  const [error, setError] = useState(null);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setError(null);
      return true;
    } catch (err) {
      setError(err);
      setCopiedText(null);
      return false;
    }
  }, []);

  return { copiedText, copy, error };
}

// #24 - useCookie
function useCookie(name, defaultValue) {
  const getCookie = useCallback(() => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return defaultValue;
  }, [name, defaultValue]);

  const [value, setValue] = useState(getCookie);

  const setCookie = useCallback((newValue, options = {}) => {
    const { days = 7, path = '/' } = options;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(newValue)}; expires=${expires}; path=${path}`;
    setValue(newValue);
  }, [name]);

  const deleteCookie = useCallback(() => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setValue(defaultValue);
  }, [name, defaultValue]);

  return [value, setCookie, deleteCookie];
}

// #25 - useTranslation (simplified)
const translations = {
  en: { greeting: 'Hello', farewell: 'Goodbye', thanks: 'Thank you' },
  es: { greeting: 'Hola', farewell: 'Adiós', thanks: 'Gracias' },
  fr: { greeting: 'Bonjour', farewell: 'Au revoir', thanks: 'Merci' },
  de: { greeting: 'Hallo', farewell: 'Auf Wiedersehen', thanks: 'Danke' },
  ja: { greeting: 'こんにちは', farewell: 'さようなら', thanks: 'ありがとう' },
};

function useTranslation(initialLang = 'en') {
  const [language, setLanguage] = useState(initialLang);
  
  const t = useCallback((key) => {
    return translations[language]?.[key] || key;
  }, [language]);

  return { t, language, setLanguage, languages: Object.keys(translations) };
}

// #26 - useOnlineStatus
function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return online;
}

// #27 - useRenderCount
function useRenderCount() {
  const count = useRef(0);
  count.current++;
  return count.current;
}

// #28 - useDebugInformation
function useDebugInformation(componentName, props) {
  const count = useRenderCount();
  const changedProps = useRef({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());

  const propKeys = Object.keys({ ...previousProps.current, ...props });
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] !== previousProps.current[key]) {
      obj[key] = { previous: previousProps.current[key], current: props[key] };
    }
    return obj;
  }, {});

  const info = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log(`[${componentName}]`, info);
  });

  return info;
}

// #29 - useHover
function useHover(ref) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);

  return hovered;
}

// #30 - useLongPress
function useLongPress(callback, options = {}) {
  const { threshold = 500, onStart, onFinish, onCancel } = options;
  const timerRef = useRef(null);
  const isLongPressActive = useRef(false);
  const isPressed = useRef(false);

  const start = useCallback((event) => {
    if (isPressed.current) return;
    isPressed.current = true;
    onStart?.(event);

    timerRef.current = setTimeout(() => {
      isLongPressActive.current = true;
      callback(event);
      onFinish?.(event);
    }, threshold);
  }, [callback, threshold, onStart, onFinish]);

  const cancel = useCallback((event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (isLongPressActive.current) {
      isLongPressActive.current = false;
    } else if (isPressed.current) {
      onCancel?.(event);
    }
    isPressed.current = false;
  }, [onCancel]);

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  };
}

// ============================================
// DEMO COMPONENTS
// ============================================

// Demo 1: useToggle
function UseToggleDemo() {
  const [isOn, toggle, setOn, setOff] = useToggle(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className={`p-3 rounded-xl transition-all ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          {isOn ? <ToggleRight className="w-8 h-8 text-white" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
        </button>
        <span className="text-lg font-medium">{isOn ? 'ON' : 'OFF'}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={setOn} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">Set ON</button>
        <button onClick={setOff} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Set OFF</button>
        <button onClick={toggle} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Toggle</button>
      </div>
    </div>
  );
}

// Demo 2: useTimeout
function UseTimeoutDemo() {
  const [message, setMessage] = useState('');
  const { reset, clear } = useTimeout(() => setMessage('Timeout completed!'), 3000);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Clock className="w-6 h-6 text-blue-500" />
        <span className="text-lg">3 second timer: {message || 'Waiting...'}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={reset} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Reset Timer</button>
        <button onClick={clear} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Clear Timer</button>
      </div>
    </div>
  );
}

// Demo 3: useDebounce
function UseDebounceDemo() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);
  const [keystrokes, setKeystrokes] = useState(0);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => { setText(e.target.value); setKeystrokes(k => k + 1); }}
        placeholder="Type something..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-500">Keystrokes:</span>
          <span className="ml-2 font-mono font-bold">{keystrokes}</span>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <span className="text-gray-500">Debounced (500ms):</span>
          <span className="ml-2 font-mono font-bold text-purple-600">{debouncedText || '—'}</span>
        </div>
      </div>
    </div>
  );
}

// Demo 4: useUpdateEffect
function UseUpdateEffectDemo() {
  const [count, setCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  useUpdateEffect(() => {
    setUpdateCount(c => c + 1);
  }, [count]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Increment: {count}
        </button>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg">
        <span className="text-gray-600">Effect triggered (skips initial): </span>
        <span className="font-bold text-purple-600">{updateCount} times</span>
      </div>
    </div>
  );
}

// Demo 5: useArray
function UseArrayDemo() {
  const { array, push, remove, update, clear, filter } = useArray([1, 2, 3]);
  const [nextValue, setNextValue] = useState(4);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {array.map((item, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
            <span className="font-mono">{item}</span>
            <button onClick={() => update(index, item + 10)} className="text-blue-500 hover:text-blue-700">+10</button>
            <button onClick={() => remove(index)} className="text-red-500 hover:text-red-700">×</button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { push(nextValue); setNextValue(v => v + 1); }} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">Push {nextValue}</button>
        <button onClick={() => filter(n => n > 5)} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm">Filter &gt; 5</button>
        <button onClick={clear} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Clear</button>
      </div>
    </div>
  );
}

// Demo 6: usePrevious
function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Increment
      </button>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500 text-sm">Previous</div>
          <div className="text-2xl font-bold text-gray-400">{previous ?? '—'}</div>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-gray-500 text-sm">Current</div>
          <div className="text-2xl font-bold text-indigo-600">{count}</div>
        </div>
      </div>
    </div>
  );
}

// Demo 7: useStateWithHistory
function UseStateWithHistoryDemo() {
  const { value, set, back, forward, history, pointer } = useStateWithHistory(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={back} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">← Back</button>
        <input
          type="number"
          value={value}
          onChange={(e) => set(parseInt(e.target.value) || 0)}
          className="w-24 p-2 border rounded-lg text-center font-mono text-xl"
        />
        <button onClick={forward} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">Forward →</button>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm text-gray-500 mb-1">History (pointer: {pointer}):</div>
        <div className="flex gap-2 flex-wrap">
          {history.map((h, i) => (
            <span key={i} className={`px-2 py-1 rounded text-sm ${i === pointer ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Demo 8: useStorage
function UseStorageDemo() {
  const [name, setName, removeName] = useStorage('user-name', '');

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name (persisted to localStorage)"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex gap-2">
        <button onClick={removeName} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Clear Storage</button>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <Database className="w-4 h-4 inline mr-2 text-blue-500" />
        Stored value: <code className="bg-blue-100 px-1 rounded">{name || '(empty)'}</code>
      </div>
    </div>
  );
}

// Demo 9: useAsync
function UseAsyncDemo() {
  const asyncFn = useCallback(async () => {
    await new Promise(r => setTimeout(r, 1500));
    if (Math.random() > 0.3) {
      return { message: 'Success!', timestamp: new Date().toLocaleTimeString() };
    }
    throw new Error('Random failure (30% chance)');
  }, []);

  const { loading, error, data, execute } = useAsync(asyncFn, false);

  return (
    <div className="space-y-4">
      <button
        onClick={execute}
        disabled={loading}
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 flex items-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Loading...' : 'Execute Async'}
      </button>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          {error.message}
        </div>
      )}
      {data && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5 inline mr-2" />
          {data.message} at {data.timestamp}
        </div>
      )}
    </div>
  );
}

// Demo 10: useFetch
function UseFetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');

  return (
    <div className="space-y-4">
      {loading && (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Fetching data...
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</div>
      )}
      {data && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-2">{data.title}</h4>
          <p className="text-gray-600 text-sm">{data.body}</p>
        </div>
      )}
    </div>
  );
}

// Demo 11: useScript
function UseScriptDemo() {
  const status = useScript('https://code.jquery.com/jquery-3.6.0.min.js');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <FileCode className="w-6 h-6 text-yellow-500" />
        <span>jQuery Script:</span>
        <span className={`px-2 py-1 rounded text-sm ${
          status === 'ready' ? 'bg-green-100 text-green-700' :
          status === 'error' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}

// Demo 12: useDeepCompareEffect - shown via code example only

// Demo 13: useEventListener
function UseEventListenerDemo() {
  const [key, setKey] = useState('');
  useEventListener('keydown', (e) => setKey(e.key));

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <div className="text-gray-500 text-sm mb-2">Press any key</div>
        <div className="text-4xl font-mono font-bold text-purple-600">{key || '—'}</div>
      </div>
    </div>
  );
}

// Demo 14: useOnScreen
function UseOnScreenDemo() {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg transition-all duration-300 ${isVisible ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border-2`}>
        <div className="flex items-center gap-2">
          <Eye className={`w-5 h-5 ${isVisible ? 'text-green-600' : 'text-gray-400'}`} />
          <span ref={ref} className={isVisible ? 'text-green-700 font-bold' : 'text-gray-500'}>
            {isVisible ? 'I am visible!' : 'Not visible yet'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Demo 15: useWindowSize
function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <Monitor className="w-6 h-6 mx-auto mb-2 text-blue-500" />
        <div className="text-2xl font-bold text-blue-600">{width}px</div>
        <div className="text-sm text-gray-500">Width</div>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg text-center">
        <Monitor className="w-6 h-6 mx-auto mb-2 text-purple-500" />
        <div className="text-2xl font-bold text-purple-600">{height}px</div>
        <div className="text-sm text-gray-500">Height</div>
      </div>
    </div>
  );
}

// Demo 16: useMediaQuery
function UseMediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className={`p-3 rounded-lg ${isMobile ? 'bg-green-100' : 'bg-gray-100'}`}>
        <Smartphone className="w-5 h-5 mb-1" />
        <span className="text-sm">Mobile: {isMobile ? '✓' : '✗'}</span>
      </div>
      <div className={`p-3 rounded-lg ${isTablet ? 'bg-green-100' : 'bg-gray-100'}`}>
        <Monitor className="w-5 h-5 mb-1" />
        <span className="text-sm">Tablet: {isTablet ? '✓' : '✗'}</span>
      </div>
      <div className={`p-3 rounded-lg ${isDesktop ? 'bg-green-100' : 'bg-gray-100'}`}>
        <Monitor className="w-5 h-5 mb-1" />
        <span className="text-sm">Desktop: {isDesktop ? '✓' : '✗'}</span>
      </div>
      <div className={`p-3 rounded-lg ${prefersDark ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
        {prefersDark ? <Moon className="w-5 h-5 mb-1" /> : <Sun className="w-5 h-5 mb-1" />}
        <span className="text-sm">Dark Mode: {prefersDark ? '✓' : '✗'}</span>
      </div>
    </div>
  );
}

// Demo 17: useGeolocation
function UseGeolocationDemo() {
  const geo = useGeolocation();

  return (
    <div className="space-y-4">
      {geo.loading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Getting location...
        </div>
      ) : geo.error ? (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          {geo.error.message}
        </div>
      ) : (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-700">Location Found</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Lat: <span className="font-mono">{geo.latitude?.toFixed(4)}</span></div>
            <div>Lng: <span className="font-mono">{geo.longitude?.toFixed(4)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo 18: useStateWithValidation
function UseStateWithValidationDemo() {
  const [email, setEmail, isValid] = useStateWithValidation(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    ''
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className={`w-full p-3 border-2 rounded-lg pr-10 ${
            email ? (isValid ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50') : 'border-gray-300'
          }`}
        />
        {email && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      <div className={`text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
        {email ? (isValid ? 'Valid email format!' : 'Invalid email format') : 'Enter an email to validate'}
      </div>
    </div>
  );
}

// Demo 19: useSize
function UseSizeDemo() {
  const ref = useRef(null);
  const size = useSize(ref);

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className="bg-linear-to-r from-purple-100 to-pink-100 p-6 rounded-lg resize overflow-auto min-h-20 border-2 border-dashed border-purple-300"
        style={{ maxWidth: '100%' }}
      >
        <div className="text-center">
          <Maximize className="w-6 h-6 mx-auto mb-2 text-purple-500" />
          <div className="font-mono text-purple-700">
            {Math.round(size.width)} × {Math.round(size.height)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Resize me!</div>
        </div>
      </div>
    </div>
  );
}

// Demo 20: useEffectOnce - shown via code example only

// Demo 21: useClickOutside
function UseClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Open Dropdown
      </button>
      {isOpen && (
        <div
          ref={ref}
          className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg p-4 border z-10 min-w-48"
        >
          <div className="font-bold mb-2">Click outside to close</div>
          <div className="text-sm text-gray-600">This dropdown uses useClickOutside</div>
        </div>
      )}
    </div>
  );
}

// Demo 22: useDarkMode
function UseDarkModeDemo() {
  const [isDark, toggle] = useDarkMode();

  return (
    <div className="space-y-4">
      <button
        onClick={toggle}
        className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-all ${
          isDark ? 'bg-gray-800 text-yellow-300' : 'bg-yellow-100 text-gray-800'
        }`}
      >
        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
        Theme preference saved to localStorage
      </div>
    </div>
  );
}

// Demo 23: useCopyToClipboard
function UseCopyToClipboardDemo() {
  const { copiedText, copy } = useCopyToClipboard();
  const textToCopy = 'Hello from useC clipboardHook!';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <code className="bg-gray-100 px-3 py-2 rounded-lg flex-1 font-mono text-sm">{textToCopy}</code>
        <button
          onClick={() => copy(textToCopy)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
      </div>
      {copiedText && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}

// Demo 24: useCookie
function UseCookieDemo() {
  const [theme, setTheme, deleteTheme] = useCookie('theme', 'light');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Cookie className="w-6 h-6 text-amber-600" />
        <span>Current cookie value:</span>
        <code className="bg-gray-100 px-2 py-1 rounded">{theme}</code>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setTheme('light')} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm">Light</button>
        <button onClick={() => setTheme('dark')} className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm">Dark</button>
        <button onClick={() => setTheme('system')} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">System</button>
        <button onClick={deleteTheme} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Delete</button>
      </div>
    </div>
  );
}

// Demo 25: useTranslation
function UseTranslationDemo() {
  const { t, language, setLanguage, languages } = useTranslation('en');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Languages className="w-5 h-5 text-purple-500" />
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              language === lang ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div><span className="text-gray-500">greeting:</span> <span className="font-bold">{t('greeting')}</span></div>
        <div><span className="text-gray-500">farewell:</span> <span className="font-bold">{t('farewell')}</span></div>
        <div><span className="text-gray-500">thanks:</span> <span className="font-bold">{t('thanks')}</span></div>
      </div>
    </div>
  );
}

// Demo 26: useOnlineStatus
function UseOnlineStatusDemo() {
  const isOnline = useOnlineStatus();

  return (
    <div className={`p-4 rounded-lg flex items-center gap-3 ${isOnline ? 'bg-green-50' : 'bg-red-50'}`}>
      {isOnline ? (
        <>
          <Wifi className="w-6 h-6 text-green-500" />
          <span className="text-green-700 font-bold">Online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-6 h-6 text-red-500" />
          <span className="text-red-700 font-bold">Offline</span>
        </>
      )}
    </div>
  );
}

// Demo 27: useRenderCount
function UseRenderCountDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRenderCount();

  return (
    <div className="space-y-4">
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
      >
        Increment: {count}
      </button>
      <div className="bg-orange-50 p-3 rounded-lg flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-orange-500" />
        <span>Component rendered <span className="font-bold text-orange-600">{renderCount}</span> times</span>
      </div>
    </div>
  );
}

// Demo 28: useDebugInformation
function UseDebugInformationDemo() {
  const [count, setCount] = useState(0);
  const debugInfo = useDebugInformation('DebugDemo', { count });

  return (
    <div className="space-y-4">
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Update Count: {count}
      </button>
      <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="flex items-center gap-2 mb-2">
          <Bug className="w-4 h-4" />
          <span className="text-white">Debug Info (check console)</span>
        </div>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
}

// Demo 29: useHover
function UseHoverDemo() {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  return (
    <div
      ref={ref}
      className={`p-6 rounded-lg text-center transition-all duration-300 cursor-pointer ${
        isHovered
          ? 'bg-linear-to-r from-pink-500 to-purple-500 text-white scale-105 shadow-lg'
          : 'bg-gray-100 text-gray-700'
      }`}
    >
      <MousePointer2 className={`w-8 h-8 mx-auto mb-2 transition-transform ${isHovered ? 'animate-bounce' : ''}`} />
      <div className="font-bold">{isHovered ? 'Hovering!' : 'Hover me!'}</div>
    </div>
  );
}

// Demo 30: useLongPress
function UseLongPressDemo() {
  const [count, setCount] = useState(0);
  const [pressing, setPressing] = useState(false);

  const longPressProps = useLongPress(
    () => setCount(c => c + 10),
    {
      threshold: 500,
      onStart: () => setPressing(true),
      onFinish: () => setPressing(false),
      onCancel: () => setPressing(false),
    }
  );

  return (
    <div className="space-y-4">
      <button
        {...longPressProps}
        onClick={() => setCount(c => c + 1)}
        className={`px-6 py-4 rounded-lg font-bold transition-all ${
          pressing
            ? 'bg-purple-600 text-white scale-95'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
        }`}
      >
        <Hand className="w-6 h-6 mx-auto mb-2" />
        <div>Click: +1 | Long Press (500ms): +10</div>
      </button>
      <div className="bg-purple-50 p-3 rounded-lg text-center">
        <span className="text-gray-600">Count: </span>
        <span className="text-2xl font-bold text-purple-600">{count}</span>
      </div>
    </div>
  );
}

// ============================================
// HOOK CARD COMPONENT
// ============================================
function HookCard({ number, name, description, useCases, children, code }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
              #{number}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-gray-400 hover:text-purple-500 transition"
          >
            <Code className="w-5 h-5" />
          </button>
        </div>

        {/* Use Cases */}
        {useCases && useCases.length > 0 && (
          <div className="mb-4 bg-purple-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" />
              When to use:
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-purple-500 mt-0.5 shrink-0" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {showCode && code && (
          <div className="mb-4 bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs font-mono whitespace-pre-wrap">{code}</pre>
          </div>
        )}

        <div className="border-t pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// ============================================
// SECTION HEADER COMPONENT
// ============================================
function SectionHeader({ title, range, color }) {
  return (
    <div className={`bg-linear-to-r ${color} text-white p-4 rounded-xl mb-6 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <Layers className="w-6 h-6" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Hooks {range}</span>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function CustomHooksScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Custom Hooks" icon={Puzzle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Introduction */}
        <div className="bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
              <Puzzle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What Are Custom Hooks?</h2>
              <p className="text-gray-700 mb-4">
                Custom Hooks are JavaScript functions that start with <code className="bg-purple-100 px-1 rounded">use</code> and 
                let you extract component logic into reusable functions. They follow the same rules as React's built-in hooks 
                and allow you to share stateful logic between components without changing their hierarchy.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <Zap className="w-5 h-5 text-purple-500 mb-2" />
                  <h3 className="font-bold text-purple-700">Reusable Logic</h3>
                  <p className="text-sm text-gray-600">Share stateful logic between components</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <Code className="w-5 h-5 text-purple-500 mb-2" />
                  <h3 className="font-bold text-purple-700">Clean Code</h3>
                  <p className="text-sm text-gray-600">Keep components focused and readable</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <CheckCircle className="w-5 h-5 text-purple-500 mb-2" />
                  <h3 className="font-bold text-purple-700">Testable</h3>
                  <p className="text-sm text-gray-600">Easy to test in isolation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rules of Hooks */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Rules of Hooks</h3>
              <ul className="text-sm text-amber-900 space-y-1">
                <li>• <strong>Only call hooks at the top level</strong> - Don't call hooks inside loops, conditions, or nested functions</li>
                <li>• <strong>Only call hooks from React functions</strong> - Call them from function components or custom hooks</li>
                <li>• <strong>Start with "use"</strong> - Custom hook names must start with "use" (e.g., useToggle, useFetch)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hooks (e.g., 'toggle', 'fetch', 'storage')..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Hooks Quick Overview */}
        <div className="bg-white rounded-xl shadow p-5 mb-8">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            All 30 Custom Hooks Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
            {[
              'useToggle', 'useTimeout', 'useDebounce', 'useUpdateEffect', 'useArray',
              'usePrevious', 'useStateWithHistory', 'useStorage', 'useAsync', 'useFetch',
              'useScript', 'useDeepCompareEffect', 'useEventListener', 'useOnScreen', 'useWindowSize',
              'useMediaQuery', 'useGeolocation', 'useStateWithValidation', 'useSize', 'useEffectOnce',
              'useClickOutside', 'useDarkMode', 'useCopyToClipboard', 'useCookie', 'useTranslation',
              'useOnlineStatus', 'useRenderCount', 'useDebugInformation', 'useHover', 'useLongPress'
            ].map((hook, i) => (
              <div
                key={hook}
                className={`px-2 py-1 rounded text-xs font-mono ${
                  searchQuery && hook.toLowerCase().includes(searchQuery.toLowerCase())
                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {i + 1}. {hook}
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Hooks #1-5 */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection(1)}
            className="w-full"
          >
            <SectionHeader title="State & Effect Utilities" range="#1-5" color="from-purple-500 to-indigo-500" />
          </button>
          {(expandedSection === 1 || expandedSection === null) && (
            <div className="grid lg:grid-cols-2 gap-6">
              <HookCard 
                number={1} 
                name="useToggle" 
                description="Toggle boolean state with utility functions"
                useCases={[
                  "Modal open/close states",
                  "Sidebar expand/collapse",
                  "Dark mode toggle",
                  "Show/hide password fields",
                  "Accordion expand states"
                ]}
                code={`const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse];
};`}
              >
                <UseToggleDemo />
              </HookCard>

              <HookCard 
                number={2} 
                name="useTimeout" 
                description="Declarative setTimeout with reset/clear"
                useCases={[
                  "Auto-dismiss notifications/toasts",
                  "Delayed redirects after actions",
                  "Session timeout warnings",
                  "Auto-save drafts after inactivity",
                  "Countdown timers"
                ]}
                code={`const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);
  
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);
  
  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);
  
  useEffect(() => { set(); return clear; }, [delay, set, clear]);
  return { reset: () => { clear(); set(); }, clear };
};`}
              >
                <UseTimeoutDemo />
              </HookCard>

              <HookCard 
                number={3} 
                name="useDebounce" 
                description="Debounce any value with configurable delay"
                useCases={[
                  "Search input with API calls",
                  "Form auto-save functionality",
                  "Window resize handlers",
                  "Scroll position tracking",
                  "Real-time validation feedback"
                ]}
                code={`const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};`}
              >
                <UseDebounceDemo />
              </HookCard>

              <HookCard 
                number={4} 
                name="useUpdateEffect" 
                description="useEffect that skips the first render"
                useCases={[
                  "Run effects only on prop/state changes",
                  "Analytics tracking on value changes",
                  "Skip initial API call on mount",
                  "Sync external systems on updates only",
                  "Trigger animations on state change"
                ]}
                code={`const useUpdateEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);
  
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
};`}
              >
                <UseUpdateEffectDemo />
              </HookCard>

              <HookCard 
                number={5} 
                name="useArray" 
                description="Array state with push, filter, update, remove, clear"
                useCases={[
                  "Todo list management",
                  "Shopping cart items",
                  "Dynamic form fields",
                  "Tag/chip input components",
                  "Table row selection"
                ]}
                code={`const useArray = (initialArray = []) => {
  const [array, setArray] = useState(initialArray);
  
  const push = useCallback((el) => setArray(a => [...a, el]), []);
  const filter = useCallback((cb) => setArray(a => a.filter(cb)), []);
  const update = useCallback((i, el) => setArray(a => 
    a.map((v, idx) => idx === i ? el : v)), []);
  const remove = useCallback((i) => setArray(a => 
    a.filter((_, idx) => idx !== i)), []);
  const clear = useCallback(() => setArray([]), []);
  
  return { array, set: setArray, push, filter, update, remove, clear };
};`}
              >
                <UseArrayDemo />
              </HookCard>
            </div>
          )}
        </div>

        {/* Section 2: Hooks #6-10 */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection(2)}
            className="w-full"
          >
            <SectionHeader title="State History & Storage" range="#6-10" color="from-blue-500 to-cyan-500" />
          </button>
          {(expandedSection === 2 || expandedSection === null) && (
            <div className="grid lg:grid-cols-2 gap-6">
              <HookCard 
                number={6} 
                name="usePrevious" 
                description="Track the previous value of a variable"
                useCases={[
                  "Compare current vs previous props",
                  "Animation direction detection",
                  "Highlighting changed values",
                  "Detecting state transitions",
                  "Undo functionality tracking"
                ]}
                code={`const usePrevious = (value) => {
  const currentRef = useRef(value);
  const previousRef = useRef();
  
  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }
  
  return previousRef.current;
};`}
              >
                <UsePreviousDemo />
              </HookCard>

              <HookCard 
                number={7} 
                name="useStateWithHistory" 
                description="State with undo/redo history navigation"
                useCases={[
                  "Text editor with undo/redo",
                  "Drawing apps - stroke history",
                  "Form wizard back navigation",
                  "Image editing history",
                  "Game state management"
                ]}
                code={`const useStateWithHistory = (initialValue, capacity = 10) => {
  const [value, setValue] = useState(initialValue);
  const historyRef = useRef([initialValue]);
  const pointerRef = useRef(0);
  
  const set = useCallback((v) => { /* update history */ }, []);
  const back = useCallback(() => { /* move pointer back */ }, []);
  const forward = useCallback(() => { /* move pointer forward */ }, []);
  
  return { value, set, back, forward, history, pointer };
};`}
              >
                <UseStateWithHistoryDemo />
              </HookCard>

              <HookCard 
                number={8} 
                name="useStorage" 
                description="Sync state with localStorage/sessionStorage"
                useCases={[
                  "Remember user preferences",
                  "Persist form draft data",
                  "Cache API responses",
                  "Store authentication tokens",
                  "Save app settings across sessions"
                ]}
                code={`const useStorage = (key, initialValue, type = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage;
  const [value, setValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  
  const setStoredValue = useCallback((newValue) => {
    storage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }, [key, storage]);
  
  return [value, setStoredValue, () => storage.removeItem(key)];
};`}
              >
                <UseStorageDemo />
              </HookCard>

              <HookCard 
                number={9} 
                name="useAsync" 
                description="Handle async functions with loading/error states"
                useCases={[
                  "Form submission handling",
                  "File upload with progress",
                  "API mutation operations",
                  "Authentication flows",
                  "Complex async workflows"
                ]}
                code={`const useAsync = (asyncFunction, immediate = true) => {
  const [state, setState] = useState({
    loading: immediate, error: null, data: null
  });
  
  const execute = useCallback(async (...args) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await asyncFunction(...args);
      setState({ loading: false, error: null, data });
    } catch (error) {
      setState({ loading: false, error, data: null });
    }
  }, [asyncFunction]);
  
  return { ...state, execute };
};`}
              >
                <UseAsyncDemo />
              </HookCard>

              <HookCard 
                number={10} 
                name="useFetch" 
                description="Fetch data with automatic abort controller"
                useCases={[
                  "Load data on component mount",
                  "API data fetching with cleanup",
                  "Prevent memory leaks on unmount",
                  "Simple GET request handling",
                  "Dashboard data loading"
                ]}
                code={`const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { ...options, signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => err.name !== 'AbortError' && setError(err))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
};`}
              >
                <UseFetchDemo />
              </HookCard>
            </div>
          )}
        </div>

        {/* Section 3: Hooks #11-15 */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection(3)}
            className="w-full"
          >
            <SectionHeader title="DOM & Browser APIs" range="#11-15" color="from-emerald-500 to-teal-500" />
          </button>
          {(expandedSection === 3 || expandedSection === null) && (
            <div className="grid lg:grid-cols-2 gap-6">
              <HookCard 
                number={11} 
                name="useScript" 
                description="Dynamically load external scripts"
                useCases={[
                  "Load third-party payment SDKs",
                  "Analytics scripts on demand",
                  "Chat widget integration",
                  "Social media share buttons",
                  "Maps API lazy loading"
                ]}
                code={`const useScript = (src) => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  
  useEffect(() => {
    if (!src) return;
    let script = document.querySelector(\`script[src="\${src}"]\`);
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }
    script.addEventListener('load', () => setStatus('ready'));
    script.addEventListener('error', () => setStatus('error'));
  }, [src]);
  
  return status;
};`}
              >
                <UseScriptDemo />
              </HookCard>

              <HookCard 
                number={12} 
                name="useDeepCompareEffect" 
                description="useEffect with deep equality check"
                useCases={[
                  "Complex object dependencies",
                  "API response object comparison",
                  "Filter/sort configuration objects",
                  "Nested form state changes",
                  "Query parameter object tracking"
                ]}
                code={`const useDeepCompareEffect = (callback, deps) => {
  const previousRef = useRef();
  
  const deepEqual = (a, b) => {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return false;
    const keys = Object.keys(a);
    return keys.length === Object.keys(b).length &&
      keys.every(k => deepEqual(a[k], b[k]));
  };
  
  if (!deepEqual(previousRef.current, deps)) {
    previousRef.current = deps;
  }
  useEffect(callback, [previousRef.current]);
};`}
              >
                <div className="text-center py-4 text-gray-500">
                  <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Useful when dependencies are objects/arrays that change reference but not value</p>
                </div>
              </HookCard>

              <HookCard 
                number={13} 
                name="useEventListener" 
                description="Attach event listeners declaratively"
                useCases={[
                  "Global keyboard shortcuts",
                  "Window scroll tracking",
                  "Custom drag and drop",
                  "Document click handling",
                  "Resize event management"
                ]}
                code={`const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef(handler);
  useEffect(() => { savedHandler.current = handler; }, [handler]);
  
  useEffect(() => {
    const targetElement = element?.current || element;
    if (!targetElement?.addEventListener) return;
    
    const listener = (e) => savedHandler.current(e);
    targetElement.addEventListener(eventName, listener);
    return () => targetElement.removeEventListener(eventName, listener);
  }, [eventName, element]);
};`}
              >
                <UseEventListenerDemo />
              </HookCard>

              <HookCard 
                number={14} 
                name="useOnScreen" 
                description="Detect if element is visible in viewport"
                useCases={[
                  "Lazy load images/videos",
                  "Infinite scroll pagination",
                  "Trigger animations on scroll",
                  "Track ad impressions",
                  "Read progress indicators"
                ]}
                code={`const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  
  return isIntersecting;
};`}
              >
                <UseOnScreenDemo />
              </HookCard>

              <HookCard 
                number={15} 
                name="useWindowSize" 
                description="Track window dimensions in real-time"
                useCases={[
                  "Responsive component rendering",
                  "Canvas/chart size calculations",
                  "Conditional mobile/desktop layouts",
                  "Virtual list height calculation",
                  "Image gallery column count"
                ]}
                code={`const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
};`}
              >
                <UseWindowSizeDemo />
              </HookCard>
            </div>
          )}
        </div>

        {/* Section 4: Hooks #16-20 */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection(4)}
            className="w-full"
          >
            <SectionHeader title="Responsive & Validation" range="#16-20" color="from-amber-500 to-orange-500" />
          </button>
          {(expandedSection === 4 || expandedSection === null) && (
            <div className="grid lg:grid-cols-2 gap-6">
              <HookCard 
                number={16} 
                name="useMediaQuery" 
                description="React to CSS media query changes"
                useCases={[
                  "Responsive component variants",
                  "Show/hide mobile navigation",
                  "Dark mode detection",
                  "Print layout adjustments",
                  "Touch vs mouse interaction mode"
                ]}
                code={`const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  return matches;
};`}
              >
                <UseMediaQueryDemo />
              </HookCard>

              <HookCard 
                number={17} 
                name="useGeolocation" 
                description="Access browser geolocation API"
                useCases={[
                  "Store locator features",
                  "Weather app location detection",
                  "Location-based recommendations",
                  "Tracking fitness activities",
                  "Delivery address auto-fill"
                ]}
                code={`const useGeolocation = (options = {}) => {
  const [state, setState] = useState({ loading: true, ... });
  
  useEffect(() => {
    const onSuccess = (pos) => setState({
      loading: false,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      ...
    });
    const onError = (err) => setState(s => ({ ...s, error: err }));
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    const id = navigator.geolocation.watchPosition(onSuccess, onError);
    return () => navigator.geolocation.clearWatch(id);
  }, []);
  
  return state;
};`}
              >
                <UseGeolocationDemo />
              </HookCard>

              <HookCard 
                number={18} 
                name="useStateWithValidation" 
                description="State with built-in validation feedback"
                useCases={[
                  "Email/password field validation",
                  "Real-time input format checking",
                  "Age/date range validation",
                  "Username availability feedback",
                  "Credit card number validation"
                ]}
                code={`const useStateWithValidation = (validationFunc, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(() => validationFunc(initialValue));
  
  const onChange = useCallback((nextValue) => {
    const newValue = typeof nextValue === 'function' 
      ? nextValue(value) : nextValue;
    setValue(newValue);
    setIsValid(validationFunc(newValue));
  }, [validationFunc, value]);
  
  return [value, onChange, isValid];
};`}
              >
                <UseStateWithValidationDemo />
              </HookCard>

              <HookCard 
                number={19} 
                name="useSize" 
                description="Track element dimensions with ResizeObserver"
                useCases={[
                  "Responsive text truncation",
                  "Dynamic chart/graph sizing",
                  "Sidebar collapse detection",
                  "Tooltip/popover positioning",
                  "Image aspect ratio adjustments"
                ]}
                code={`const useSize = (ref) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  
  return size;
};`}
              >
                <UseSizeDemo />
              </HookCard>

              <HookCard 
                number={20} 
                name="useEffectOnce" 
                description="Run effect only once (StrictMode safe)"
                useCases={[
                  "One-time analytics initialization",
                  "Initial data fetch on mount",
                  "Single welcome modal display",
                  "Socket connection setup",
                  "Third-party library initialization"
                ]}
                code={`const useEffectOnce = (callback) => {
  const hasRun = useRef(false);
  
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    return callback();
  }, []);
};`}
              >
                <div className="text-center py-4 text-gray-500">
                  <Play className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Runs callback only once, even in React StrictMode</p>
                </div>
              </HookCard>
            </div>
          )}
        </div>

        {/* Section 5: Hooks #21-25 */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection(5)}
            className="w-full"
          >
            <SectionHeader title="UI Interactions" range="#21-25" color="from-pink-500 to-rose-500" />
          </button>
          {(expandedSection === 5 || expandedSection === null) && (
            <div className="grid lg:grid-cols-2 gap-6">
              <HookCard 
                number={21} 
                name="useClickOutside" 
                description="Detect clicks outside an element"
                useCases={[
                  "Close dropdown menus",
                  "Dismiss modal dialogs",
                  "Close popover tooltips",
                  "Deselect items in editors",
                  "Cancel inline edit mode"
                ]}
                code={`const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};`}
              >
                <UseClickOutsideDemo />
              </HookCard>

              <HookCard 
                number={22} 
                name="useDarkMode" 
                description="Toggle dark mode with system preference"
                useCases={[
                  "App-wide theme switching",
                  "Respect OS color preference",
                  "Persist user theme choice",
                  "Code editor themes",
                  "UI component theme variants"
                ]}
                code={`const useDarkMode = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useStorage('dark-mode', prefersDark);
  
  const toggle = useCallback(() => setDarkMode(p => !p), [setDarkMode]);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  return [darkMode, toggle, setDarkMode];
};`}
              >
                <UseDarkModeDemo />
              </HookCard>

              <HookCard 
                number={23} 
                name="useCopyToClipboard" 
                description="Copy text to clipboard with feedback"
                useCases={[
                  "Copy code snippets",
                  "Share referral links",
                  "Copy API keys/tokens",
                  "Email address copying",
                  "Copy-to-clipboard buttons"
                ]}
                code={`const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState(null);
  const [error, setError] = useState(null);
  
  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setError(null);
      return true;
    } catch (err) {
      setError(err);
      setCopiedText(null);
      return false;
    }
  }, []);
  
  return { copiedText, copy, error };
};`}
              >
                <UseCopyToClipboardDemo />
              </HookCard>

              <HookCard 
                number={24} 
                name="useCookie" 
                description="Read, write, and delete cookies"
                useCases={[
                  "User preference storage",
                  "Session tracking tokens",
                  "A/B testing flags",
                  "Consent/GDPR management",
                  "Shopping cart persistence"
                ]}
                code={`const useCookie = (name, defaultValue) => {
  const getCookie = useCallback(() => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [n, v] = cookie.split('=').map(c => c.trim());
      if (n === name) return decodeURIComponent(v);
    }
    return defaultValue;
  }, [name, defaultValue]);
  
  const [value, setValue] = useState(getCookie);
  
  const setCookie = useCallback((newValue, { days = 7 } = {}) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = \`\${name}=\${encodeURIComponent(newValue)}; expires=\${expires}\`;
    setValue(newValue);
  }, [name]);
  
  return [value, setCookie, () => { /* delete cookie */ }];
};`}
              >
                <UseCookieDemo />
              </HookCard>

              <HookCard 
                number={25} 
                name="useTranslation" 
                description="Simple i18n translation hook"
                useCases={[
                  "Multi-language website support",
                  "Dynamic content localization",
                  "Language switcher implementation",
                  "Localized date/number formatting",
                  "RTL/LTR layout switching"
                ]}
                code={`const translations = {
  en: { greeting: 'Hello', farewell: 'Goodbye' },
  es: { greeting: 'Hola', farewell: 'Adiós' },
  // ... more languages
};

const useTranslation = (initialLang = 'en') => {
  const [language, setLanguage] = useState(initialLang);
  
  const t = useCallback((key) => {
    return translations[language]?.[key] || key;
  }, [language]);
  
  return { t, language, setLanguage, languages: Object.keys(translations) };
};`}
              >
                <UseTranslationDemo />
              </HookCard>
            </div>
          )}
        </div>

        {/* Section 6: Hooks #26-30 */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection(6)}
            className="w-full"
          >
            <SectionHeader title="Debug & Advanced" range="#26-30" color="from-red-500 to-pink-500" />
          </button>
          {(expandedSection === 6 || expandedSection === null) && (
            <div className="grid lg:grid-cols-2 gap-6">
              <HookCard 
                number={26} 
                name="useOnlineStatus" 
                description="Track browser online/offline status"
                useCases={[
                  "Offline-first app functionality",
                  "Show connection status banner",
                  "Queue actions while offline",
                  "Sync data when back online",
                  "Disable network-dependent features"
                ]}
                code={`const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return online;
};`}
              >
                <UseOnlineStatusDemo />
              </HookCard>

              <HookCard 
                number={27} 
                name="useRenderCount" 
                description="Count component re-renders"
                useCases={[
                  "Performance debugging",
                  "Identify unnecessary renders",
                  "Development-only logging",
                  "Optimize memo usage",
                  "Track state change frequency"
                ]}
                code={`const useRenderCount = () => {
  const count = useRef(0);
  count.current++;
  return count.current;
};`}
              >
                <UseRenderCountDemo />
              </HookCard>

              <HookCard 
                number={28} 
                name="useDebugInformation" 
                description="Debug component props and renders"
                useCases={[
                  "Debug prop changes causing re-renders",
                  "Identify performance bottlenecks",
                  "Development logging and tracing",
                  "Track which props update frequently",
                  "Analyze component lifecycle behavior"
                ]}
                code={`const useDebugInformation = (componentName, props) => {
  const count = useRenderCount();
  const changedProps = useRef({});
  const previousProps = useRef(props);
  
  const propKeys = Object.keys({ ...previousProps.current, ...props });
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] !== previousProps.current[key]) {
      obj[key] = { previous: previousProps.current[key], current: props[key] };
    }
    return obj;
  }, {});
  
  useEffect(() => {
    previousProps.current = props;
    console.log(\`[\${componentName}]\`, { count, changedProps: changedProps.current });
  });
  
  return { count, changedProps: changedProps.current, ... };
};`}
              >
                <UseDebugInformationDemo />
              </HookCard>

              <HookCard 
                number={29} 
                name="useHover" 
                description="Track element hover state"
                useCases={[
                  "Show/hide tooltips",
                  "Hover effect animations",
                  "Preview cards on hover",
                  "Interactive image galleries",
                  "Menu item highlighting"
                ]}
                code={`const useHover = (ref) => {
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);
    
    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mouseleave', handleLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);
  
  return hovered;
};`}
              >
                <UseHoverDemo />
              </HookCard>

              <HookCard 
                number={30} 
                name="useLongPress" 
                description="Detect long press gestures"
                useCases={[
                  "Context menus on mobile",
                  "Delete confirmation actions",
                  "Quick action shortcuts",
                  "Drag initiation trigger",
                  "Multi-select mode toggle"
                ]}
                code={`const useLongPress = (callback, { threshold = 500 } = {}) => {
  const timerRef = useRef(null);
  const isPressed = useRef(false);
  
  const start = useCallback((event) => {
    if (isPressed.current) return;
    isPressed.current = true;
    timerRef.current = setTimeout(() => callback(event), threshold);
  }, [callback, threshold]);
  
  const cancel = useCallback(() => {
    clearTimeout(timerRef.current);
    isPressed.current = false;
  }, []);
  
  return {
    onMouseDown: start, onMouseUp: cancel, onMouseLeave: cancel,
    onTouchStart: start, onTouchEnd: cancel
  };
};`}
              >
                <UseLongPressDemo />
              </HookCard>
            </div>
          )}
        </div>

        {/* Key Takeaways */}
        <div className="bg-linear-to-r from-purple-500 to-indigo-500 text-white rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Key Takeaways
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">When to Create Custom Hooks</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Logic is reused across multiple components</li>
                <li>• Component logic becomes complex</li>
                <li>• You want to share stateful behavior</li>
                <li>• Testing logic in isolation is needed</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Always prefix with "use"</li>
                <li>• Return only what consumers need</li>
                <li>• Document hook parameters and returns</li>
                <li>• Consider edge cases and cleanup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DemoNavigation />
    </div>
  );
}
