import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupWithEmail } from '../firebase/auth';
import { useAuth } from '../context/AuthProvider'; // import your context
import bgimg from "../assets/images/images/about_bg.jpg"
// RxJS imports
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Preloader from '../components/Preloader';
import API_BASE_URL from '../config';
const Signup = () => {

  const navigate = useNavigate();
  const { setUser } = useAuth(); // 👈 Get setUser from context

  // Refs for form fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const locationRef = useRef(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // RxJS Subjects
  const emailSubject = new Subject();
  const passwordSubject = new Subject();
  const phoneSubject = new Subject();

  // Validators
  const emailValidator = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const passwordValidator = (value) => {
    const errors = [];
    if (value.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('Password must include at least one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      errors.push('Password must include at least one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      errors.push('Password must include at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('Password must include at least one special character');
    }
    return errors;
  };

  const phoneValidator = (value) => /^[0-9]{10}$/.test(value);

  useEffect(() => {
    const emailSubscription = emailSubject.pipe(debounceTime(300)).subscribe((value) => {
      if (!emailValidator(value)) {
        setError('Invalid email format');
      } else {
        setError('');
      }
    });

    const passwordSubscription = passwordSubject.pipe(debounceTime(300)).subscribe((value) => {
      const errors = passwordValidator(value);
      if (errors.length > 0) {
        setError(errors[0]);
      } else {
        setError('');
      }
    });

    const phoneSubscription = phoneSubject.pipe(debounceTime(300)).subscribe((value) => {
      if (!phoneValidator(value)) {
        setError('Phone number must be 10 digits');
      } else {
        setError('');
      }
    });

    return () => {
      emailSubscription.unsubscribe();
      passwordSubscription.unsubscribe();
      phoneSubscription.unsubscribe();
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const middleName = middleNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const phoneNumber = phoneNumberRef.current.value.trim();
    const location = locationRef.current.value.trim();

    // ✅ Frontend validations before submission
    if (!emailValidator(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    const passwordErrors = passwordValidator(password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors[0]);
      setLoading(false);
      return;
    }

    if (!middleName) {
      setError('Middle name is required');
      setLoading(false);
      return;
    }

    if (!phoneValidator(phoneNumber)) {
      setError('Phone number must be 10 digits');
      setLoading(false);
      return;
    }

    if (!location) {
      setError('Location is required');
      setLoading(false);
      return;
    }

    try {
      let displayName = middleName;
      if (firstName) displayName = `${firstName} ${displayName}`;
      if (lastName) displayName = `${displayName} ${lastName}`;

      const role = 'client';

      // ✅ Firebase signup
      const userCredential = await signupWithEmail(email, password, role);
      const { user } = userCredential;

      const idToken = await user.getIdToken();

      // ✅ Send info to backend (via axios wrapper or directly)
      const res = await fetch(`${API_BASE_URL}/signup/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // send http-only cookies
        body: JSON.stringify({
          role,
          phone_number: phoneNumber,
          display_name: displayName,
          email,
          uid: user.uid,
          location,

        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Signup failed');
      }

      const backendUser = await res.json();
      console.log(backendUser)
      // ✅ Set user in context (replace Redux)
      setUser({
        uid: user.uid,
        email: user.email,
        role: backendUser.role,
      });

      navigate('/login');
    } catch (err) {
      console.error('❌ Signup Error:', err);
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Preloader />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 relative"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-2xl bg-opacity-80">
          <h2 className="text-2xl mb-4 text-center font-bold">Sign Up</h2>

          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

          {/* Email & Password */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email *</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                className="w-full border p-2 rounded"
                placeholder="Enter email"
                autoComplete="email"
                onChange={(e) => emailSubject.next(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Password *</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="w-full border p-2 rounded"
                placeholder="Enter password"
                autoComplete="new-password"
                minLength={6}
                onChange={(e) => passwordSubject.next(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm font-medium">First Name *</label>
              <input
                ref={firstNameRef}
                type="text"
                id="firstName"
                className="w-full border p-2 rounded"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="middleName" className="block mb-1 text-sm font-medium">Middle Name (Optional)</label>
              <input
                ref={middleNameRef}
                type="text"
                id="middleName"
                className="w-full border p-2 rounded"
                placeholder="Middle name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-medium">Last Name *</label>
              <input
                ref={lastNameRef}
                type="text"
                id="lastName"
                className="w-full border p-2 rounded"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Phone Number & Location */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium">Phone Number *</label>
              <input
                ref={phoneNumberRef}
                type="tel"
                id="phoneNumber"
                className="w-full border p-2 rounded"
                placeholder="Phone number"
                pattern="^\d{10}$"
                title="Enter a valid 10-digit phone number"
                onChange={(e) => phoneSubject.next(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block mb-1 text-sm font-medium">Location *</label>
              <input
                ref={locationRef}
                type="text"
                id="location"
                className="w-full border p-2 rounded"
                placeholder="Enter location"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200 disabled:opacity-50 ${loading ? "cursor-wait" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );


};

export default Signup;
