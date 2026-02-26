import { useState } from 'react';
import { Link } from 'react-router-dom';
import DemoNavigation from '../../components/DemoNavigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from 'yup';
import { z } from 'zod';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  ArrowLeft,
  FileText,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Zap,
  Shield,
  Settings,
  FileCheck,
  FileX,
  Send,
  RefreshCw,
  Check,
  X,
  RotateCcw,
  Loader2,
  Package,
  Scale,
  ExternalLink,
  User,
} from 'lucide-react';

// NPM Links for reference:
// react-hook-form: https://www.npmjs.com/package/react-hook-form
// yup: https://www.npmjs.com/package/yup
// zod: https://www.npmjs.com/package/zod
// formik: https://www.npmjs.com/package/formik

// Header component
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
          {Icon && <Icon className="w-6 h-6 text-blue-500" />}
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Manual Validation Demo
// ========================================
function ManualValidationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (data) => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);

    if (touched[name]) {
      setErrors(validate(newData));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true, confirmPassword: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">
          Form Submitted!
        </h3>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 mx-auto text-blue-600 hover:underline"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Mail className="w-4 h-4 text-gray-400" />
          Email
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-colors ${
            errors.email && touched.email
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && touched.email && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Lock className="w-4 h-4 text-gray-400" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-colors ${
              errors.password && touched.password
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Shield className="w-4 h-4 text-gray-400" />
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-colors ${
            errors.confirmPassword && touched.confirmPassword
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <Send className="w-4 h-4" />
        Submit
      </button>
    </form>
  );
}

// ========================================
// React Hook Form + Yup Demo
// ========================================
const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain uppercase letter')
      .matches(/[0-9]/, 'Must contain a number')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm password'),
    acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms'),
  })
  .required();

function ReactHookFormDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const password = watch('password', '');

  const getPasswordStrength = (pwd) => {
    if (!pwd)
      return {
        score: 0,
        label: 'None',
        color: 'bg-gray-200',
        textColor: 'text-gray-400',
      };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2)
      return {
        score,
        label: 'Weak',
        color: 'bg-red-500',
        textColor: 'text-red-500',
      };
    if (score <= 4)
      return {
        score,
        label: 'Medium',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-500',
      };
    return {
      score,
      label: 'Strong',
      color: 'bg-green-500',
      textColor: 'text-green-500',
    };
  };

  const strength = getPasswordStrength(password);

  const requirements = [
    { met: password.length >= 8, text: '8+ characters' },
    { met: /[A-Z]/.test(password), text: 'Uppercase letter' },
    { met: /[a-z]/.test(password), text: 'Lowercase letter' },
    { met: /[0-9]/.test(password), text: 'Number' },
    { met: /[^A-Za-z0-9]/.test(password), text: 'Special character' },
  ];

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API
    console.log('Form submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">
          Form Submitted!
        </h3>
        <button
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
          className="flex items-center gap-2 mx-auto text-green-600 hover:underline"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Mail className="w-4 h-4 text-gray-400" />
          Email
        </label>
        <input
          {...register('email')}
          type="text"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-300 transition-colors ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Lock className="w-4 h-4 text-gray-400" />
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-green-300 transition-colors ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {password && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${(strength.score / 6) * 100}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${strength.textColor}`}>
                {strength.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {requirements.map((req, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    req.met
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {req.met ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                  {req.text}
                </span>
              ))}
            </div>
          </div>
        )}
        {errors.password && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Shield className="w-4 h-4 text-gray-400" />
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-300 transition-colors ${
            errors.confirmPassword
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register('acceptTerms')}
          type="checkbox"
          id="acceptTerms"
          className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-300"
        />
        <label htmlFor="acceptTerms" className="text-sm text-gray-700">
          I accept the terms and conditions
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="flex items-center gap-1 text-red-500 text-sm">
          <XCircle className="w-3 h-3" />
          {errors.acceptTerms.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit
          </>
        )}
      </button>
    </form>
  );
}

// ========================================
// Zod + React Hook Form Demo
// ========================================

// Zod schema definition (type-safe & smaller bundle)
const zodSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Max 20 characters'),
  email: z.string().email('Invalid email format'),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .min(18, 'Must be 18+')
    .max(100, 'Max 100'),
});

function ZodFormDemo() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Zod form submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-purple-600 mb-2">
          Form Submitted!
        </h3>
        <button
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
          className="flex items-center gap-2 mx-auto text-purple-600 hover:underline"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <User className="w-4 h-4 text-gray-400" />
          Username
        </label>
        <input
          {...register('username')}
          type="text"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-300 transition-colors ${
            errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="johndoe"
        />
        {errors.username && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Mail className="w-4 h-4 text-gray-400" />
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-300 transition-colors ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <User className="w-4 h-4 text-gray-400" />
          Age
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-300 transition-colors ${
            errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="25"
        />
        {errors.age && (
          <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
            <XCircle className="w-3 h-3" />
            {errors.age.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit
          </>
        )}
      </button>
    </form>
  );
}

// ========================================
// Formik Demo
// ========================================

const formikValidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.message) {
    errors.message = 'Message is required';
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
};

function FormikDemo() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold text-orange-600 mb-2">
          Form Submitted!
        </h3>
        <button
          onClick={() => setSubmitted(false)}
          className="flex items-center gap-2 mx-auto text-orange-600 hover:underline"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validate={formikValidate}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log('Formik form submitted:', values);
        setSubmitting(false);
        resetForm();
        setSubmitted(true);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 text-gray-400" />
              Name
            </label>
            <Field
              name="name"
              type="text"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-300 transition-colors ${
                errors.name && touched.name
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="flex items-center gap-1 text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 text-gray-400" />
              Email
            </label>
            <Field
              name="email"
              type="email"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-300 transition-colors ${
                errors.email && touched.email
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="flex items-center gap-1 text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 text-gray-400" />
              Message
            </label>
            <Field
              as="textarea"
              name="message"
              rows={3}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-300 transition-colors ${
                errors.message && touched.message
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="Your message here..."
            />
            <ErrorMessage
              name="message"
              component="p"
              className="flex items-center gap-1 text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

// ========================================
// KEY TAKEAWAYS
// ========================================

function KeyTakeaways() {
  const takeaways = [
    {
      icon: Settings,
      text: 'Manual validation gives full control but requires more code',
      color: 'text-blue-500',
    },
    {
      icon: Zap,
      text: 'React Hook Form minimizes re-renders for better performance',
      color: 'text-green-500',
    },
    {
      icon: Shield,
      text: 'Yup/Zod provide type-safe schema validation',
      color: 'text-purple-500',
    },
    {
      icon: AlertTriangle,
      text: 'Formik is great for forms that require complex state management',
      color: 'text-orange-500',
    },
    {
      icon: CheckCircle,
      text: 'Show errors on blur, not while typing (better UX)',
      color: 'text-teal-500',
    },
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
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FormValidationScreen() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScreenHeader title="Form Validation Patterns" icon={FileText} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-green-500 to-teal-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <FileCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Form Validation Approaches
              </h2>
              <p className="text-green-100 leading-relaxed">
                Compare different validation approaches: Manual, React Hook Form
                + Yup/Zod, and Formik. Each has its strengths depending on your
                use case and form complexity.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Settings className="w-6 h-6 mx-auto mb-1 text-blue-200" />
              <div className="text-sm font-medium">Manual</div>
              <div className="text-xs text-green-200">Full control</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-200" />
              <div className="text-sm font-medium">Hook Form</div>
              <div className="text-xs text-green-200">Performance</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-purple-200" />
              <div className="text-sm font-medium">Yup/Zod</div>
              <div className="text-xs text-green-200">Schema based</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <FileText className="w-6 h-6 mx-auto mb-1 text-orange-200" />
              <div className="text-sm font-medium">Formik</div>
              <div className="text-xs text-green-200">Form state</div>
            </div>
          </div>
        </div>

        {/* NPM Links Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-800">NPM Packages Used</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                name: 'react-hook-form',
                url: 'https://www.npmjs.com/package/react-hook-form',
                color: 'bg-green-100 text-green-700',
              },
              {
                name: 'yup',
                url: 'https://www.npmjs.com/package/yup',
                color: 'bg-yellow-100 text-yellow-700',
              },
              {
                name: 'zod',
                url: 'https://www.npmjs.com/package/zod',
                color: 'bg-purple-100 text-purple-700',
              },
              {
                name: 'formik',
                url: 'https://www.npmjs.com/package/formik',
                color: 'bg-orange-100 text-orange-700',
              },
            ].map((pkg) => (
              <a
                key={pkg.name}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${pkg.color} hover:opacity-80 transition-opacity`}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium text-sm">{pkg.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Row 1: Manual + React Hook Form + Yup */}
        <div className="space-y-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">
                  Manual Validation
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-blue-800 text-sm">
                    <p>
                      <strong>Pros:</strong> Full control, no dependencies
                    </p>
                    <p>
                      <strong>Cons:</strong> More boilerplate, error-prone
                    </p>
                  </div>
                </div>
              </div>
              <ManualValidationForm />

              {/* Code snippet */}
              <div className="mt-6 bg-gray-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <p className="text-gray-500 mb-2">{'// 1. State setup'}</p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-gray-300">[</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">setErrors</span>
                  <span className="text-gray-300">] = </span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">({'{}'});</span>
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-gray-300">[</span>
                  <span className="text-orange-300">touched</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">setTouched</span>
                  <span className="text-gray-300">] = </span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">({'{}'});</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 2. Validate function'}
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-yellow-300">validate</span>
                  <span className="text-gray-300"> = (</span>
                  <span className="text-orange-300">data</span>
                  <span className="text-gray-300">) =&gt; {'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">const </span>
                  <span className="text-orange-300">errs</span>
                  <span className="text-gray-300"> = {};</span>
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">if </span>
                  <span className="text-gray-300">(!</span>
                  <span className="text-orange-300">data</span>
                  <span className="text-gray-300">.email) </span>
                  <span className="text-orange-300">errs</span>
                  <span className="text-gray-300">.email = </span>
                  <span className="text-green-400">'Required'</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">return </span>
                  <span className="text-orange-300">errs</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'};</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 3. Validate on blur, show error'}
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-yellow-300">handleBlur</span>
                  <span className="text-gray-300"> = (</span>
                  <span className="text-orange-300">e</span>
                  <span className="text-gray-300">) =&gt; {'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-yellow-300">setTouched</span>
                  <span className="text-gray-300">({'{'} ...</span>
                  <span className="text-orange-300">touched</span>
                  <span className="text-gray-300">, [</span>
                  <span className="text-orange-300">e</span>
                  <span className="text-gray-300">.target.name]: </span>
                  <span className="text-blue-400">true</span>
                  <span className="text-gray-300"> {'}'});</span>
                </p>
                <p className="pl-4">
                  <span className="text-yellow-300">setErrors</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-yellow-300">validate</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-orange-300">formData</span>
                  <span className="text-gray-300">));</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'};</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 4. Show error in JSX'}
                </p>
                <p>
                  <span className="text-gray-300">{'{'}</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">.email &amp;&amp; </span>
                  <span className="text-orange-300">touched</span>
                  <span className="text-gray-300">.email &amp;&amp; (</span>
                </p>
                <p className="pl-4">
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">p</span>
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-gray-300">{'{'}</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">.email{'}'}</span>
                  <span className="text-gray-500">&lt;/</span>
                  <span className="text-yellow-300">p</span>
                  <span className="text-gray-500">&gt;</span>
                </p>
                <p>
                  <span className="text-gray-300">){'}'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">
                    React Hook Form + Yup
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-green-800 text-sm">
                    <p>
                      <strong>Pros:</strong> Less code, better performance,
                      schema validation
                    </p>
                    <p>
                      <strong>Cons:</strong> Extra dependencies
                    </p>
                  </div>
                </div>
              </div>
              <ReactHookFormDemo />

              {/* Code snippet */}
              <div className="mt-6 bg-gray-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <p className="text-gray-500 mb-2">
                  {'// 1. Define Yup schema'}
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-yellow-300">schema</span>
                  <span className="text-gray-300"> = </span>
                  <span className="text-yellow-300">yup</span>
                  <span className="text-gray-300">.object({'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">email</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">yup</span>
                  <span className="text-gray-300">.string().</span>
                  <span className="text-yellow-300">email</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-400">'Invalid'</span>
                  <span className="text-gray-300">).</span>
                  <span className="text-yellow-300">required</span>
                  <span className="text-gray-300">(),</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">password</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">yup</span>
                  <span className="text-gray-300">.string().</span>
                  <span className="text-yellow-300">min</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-400">8</span>
                  <span className="text-gray-300">).</span>
                  <span className="text-yellow-300">matches</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-red-400">/[A-Z]/</span>
                  <span className="text-gray-300">).</span>
                  <span className="text-yellow-300">required</span>
                  <span className="text-gray-300">(),</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'});</span>
                </p>

                <p className="mt-3 text-gray-500">{'// 2. Wire up useForm'}</p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-gray-300">{'{ '}</span>
                  <span className="text-orange-300">register</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">handleSubmit</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">formState</span>
                  <span className="text-gray-300">: {'{ '}</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">
                    {' }'} {'}'} ={' '}
                  </span>
                  <span className="text-yellow-300">useForm</span>
                  <span className="text-gray-300">({'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">resolver</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">yupResolver</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-orange-300">schema</span>
                  <span className="text-gray-300">),</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">mode</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">'onBlur'</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'});</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 3. Register fields (no onChange needed!)'}
                </p>
                <p>
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">input</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-gray-300">{'{'}</span>
                  <span className="text-gray-300">...</span>
                  <span className="text-yellow-300">register</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-400">'email'</span>
                  <span className="text-gray-300">){'}'} /&gt;</span>
                </p>
                <p>
                  <span className="text-gray-300">{'{'}</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">.email &amp;&amp; </span>
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">p</span>
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-gray-300">{'{'}</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">.email.message{'}'}</span>
                  <span className="text-gray-500">&lt;/</span>
                  <span className="text-yellow-300">p</span>
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-gray-300">{'}'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Zod + Formik */}
        <div className="space-y-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-purple-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">
                    React Hook Form + Zod
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div className="text-purple-800 text-sm">
                    <p>
                      <strong>Pros:</strong> TypeScript-first, smaller bundle,
                      type inference
                    </p>
                    <p>
                      <strong>Cons:</strong> Less ecosystem than Yup
                    </p>
                  </div>
                </div>
              </div>
              <ZodFormDemo />

              {/* Code snippet */}
              <div className="mt-6 bg-gray-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <p className="text-gray-500 mb-2">
                  {'// 1. Define Zod schema (TypeScript-first)'}
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-yellow-300">schema</span>
                  <span className="text-gray-300"> = </span>
                  <span className="text-yellow-300">z</span>
                  <span className="text-gray-300">.object({'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">username</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">z</span>
                  <span className="text-gray-300">.string().</span>
                  <span className="text-yellow-300">min</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-400">3</span>
                  <span className="text-gray-300">).</span>
                  <span className="text-yellow-300">max</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-400">20</span>
                  <span className="text-gray-300">),</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">email</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">z</span>
                  <span className="text-gray-300">.string().</span>
                  <span className="text-yellow-300">email</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-400">'Invalid email'</span>
                  <span className="text-gray-300">),</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">age</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">z</span>
                  <span className="text-gray-300">.number().</span>
                  <span className="text-yellow-300">min</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-400">18</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-green-400">'Must be 18+'</span>
                  <span className="text-gray-300">),</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'});</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 2. Infer type from schema (TypeScript bonus)'}
                </p>
                <p>
                  <span className="text-purple-400">type </span>
                  <span className="text-yellow-300">FormData</span>
                  <span className="text-gray-300"> = </span>
                  <span className="text-yellow-300">z</span>
                  <span className="text-gray-300">.infer&lt;</span>
                  <span className="text-purple-400">typeof </span>
                  <span className="text-orange-300">schema</span>
                  <span className="text-gray-300">&gt;;</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 3. Wire up with zodResolver'}
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-gray-300">{'{ '}</span>
                  <span className="text-orange-300">register</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">handleSubmit</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">formState</span>
                  <span className="text-gray-300">: {'{ '}</span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">
                    {' }'} {'}'} ={' '}
                  </span>
                  <span className="text-yellow-300">useForm</span>
                  <span className="text-gray-300">({'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">resolver</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-yellow-300">zodResolver</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-orange-300">schema</span>
                  <span className="text-gray-300">)</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'});</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 4. valueAsNumber for number fields'}
                </p>
                <p>
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">input</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-gray-300">{'{'}</span>
                  <span className="text-gray-300">...</span>
                  <span className="text-yellow-300">register</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-400">'age'</span>
                  <span className="text-gray-300">, {'{ '}</span>
                  <span className="text-orange-300">valueAsNumber</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-blue-400">true</span>
                  <span className="text-gray-300">
                    {' }'}){'}'} /&gt;
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-orange-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Formik</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="text-orange-800 text-sm">
                    <p>
                      <strong>Pros:</strong> Full form state management,
                      built-in validation
                    </p>
                    <p>
                      <strong>Cons:</strong> More re-renders than Hook Form
                    </p>
                  </div>
                </div>
              </div>
              <FormikDemo />

              {/* Code snippet */}
              <div className="mt-6 bg-gray-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <p className="text-gray-500 mb-2">
                  {'// 1. Validate function (returns error object)'}
                </p>
                <p>
                  <span className="text-purple-400">const </span>
                  <span className="text-yellow-300">validate</span>
                  <span className="text-gray-300"> = (</span>
                  <span className="text-orange-300">values</span>
                  <span className="text-gray-300">) =&gt; {'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">const </span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300"> = {};</span>
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">if </span>
                  <span className="text-gray-300">(!</span>
                  <span className="text-orange-300">values</span>
                  <span className="text-gray-300">.email) </span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">.email = </span>
                  <span className="text-green-400">'Required'</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">return </span>
                  <span className="text-orange-300">errors</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p>
                  <span className="text-gray-300">{'}'};</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 2. Formik component wraps the whole form'}
                </p>
                <p>
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">Formik</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">initialValues</span>
                  <span className="text-gray-300">
                    ={'{'}
                    {'{'}{' '}
                  </span>
                  <span className="text-blue-300">email</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">''</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-blue-300">name</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">''</span>
                  <span className="text-gray-300">
                    {' '}
                    {'}'}
                    {'}'}
                  </span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">validate</span>
                  <span className="text-gray-300">={'{'}</span>
                  <span className="text-orange-300">validate</span>
                  <span className="text-gray-300">{'}'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-300">onSubmit</span>
                  <span className="text-gray-300">={'{'}</span>
                  <span className="text-orange-300">handleSubmit</span>
                  <span className="text-gray-300">{'}'}</span>
                </p>
                <p>
                  <span className="text-gray-500">&gt;</span>
                </p>

                <p className="mt-3 text-gray-500">
                  {'// 3. Field & ErrorMessage — no register() needed'}
                </p>
                <p>
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">Field</span>
                  <span className="text-orange-300"> name</span>
                  <span className="text-gray-300">=</span>
                  <span className="text-green-400">'email'</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-orange-300">type</span>
                  <span className="text-gray-300">=</span>
                  <span className="text-green-400">'email'</span>
                  <span className="text-gray-500"> /&gt;</span>
                </p>
                <p>
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-yellow-300">ErrorMessage</span>
                  <span className="text-orange-300"> name</span>
                  <span className="text-gray-300">=</span>
                  <span className="text-green-400">'email'</span>
                  <span className="text-orange-300"> component</span>
                  <span className="text-gray-300">=</span>
                  <span className="text-green-400">'p'</span>
                  <span className="text-gray-500"> /&gt;</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">
                When to Use What?
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-blue-700 text-sm">Manual</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Simple 1-3 field forms</li>
                  <li>• No dependencies needed</li>
                  <li>• Learning purposes</li>
                </ul>
              </div>
              <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-green-700 text-sm">
                    Hook Form + Yup
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Complex forms</li>
                  <li>• Performance critical</li>
                  <li>• Rich ecosystem</li>
                </ul>
              </div>
              <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-purple-700 text-sm">
                    Hook Form + Zod
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• TypeScript projects</li>
                  <li>• Type inference needed</li>
                  <li>• Smaller bundle</li>
                </ul>
              </div>
              <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <h4 className="font-bold text-orange-700 text-sm">Formik</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Form state management</li>
                  <li>• Field-level validation</li>
                  <li>• Easier mental model</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <KeyTakeaways />
      </div>

      <DemoNavigation />
    </div>
  );
}
