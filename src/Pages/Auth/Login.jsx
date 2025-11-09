import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { signIn, setUser, setLoading, googleSignIn } = use(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const handleForgetPassword = () => {
    localStorage.setItem("forgetEmail", email); // email save
    navigate("/forgetPassword");
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setEmailError("");
    } else {
      setEmailError(
        " Please enter a valid email address (e.g., user@example.com)"
      );
      return;
    }
    const password = e.target.password.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (regex.test(password)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must include uppercase, lowercase and be at least 6 characters long!"
      );

      return;
    }
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`"user sign in" ${user.displayName}`);
        setUser(user)
        navigate(location?.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.code
          ? error.code.replace("auth/", "")
          : error.message;
        setLoading(false);
        setError(`Login failed: ${errorMessage}`);
        toast.error(`Login failed: ${errorMessage}`);
      });
  };
  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then((result) => {
        const userGoogle = result.user;

        toast.success(`User Sign In ${userGoogle.displayName} `);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="flex bg-white   justify-center items-center min-h-screen">
      <title>Login</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="font-semibold text-3xl text-center mt-5">
          Login your account
        </h1>
        <form onSubmit={handleLogIn} className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <p className="text-sm text-secondary text-center">{emailError}</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
                required
              />
              <button
                onClick={handleTogglePasswordShow}
                className="absolute right-7 btn-xs top-2 btn"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-secondary text-center">
                {passwordError}
              </p>
            )}

            <div>
              <Link
                onClick={handleForgetPassword}
                className=" hover:underline text-[12px] hover:text-pink-500 text-green-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-neutral mt-5">
              Login
            </button>
          </fieldset>
          <p className="font-semibold text-center">
            Dont’t Have An Account ?{" "}
            <Link
              to="/register"
              className="text-green-500 font-semibold  hover:underline hover:text-pink-500"
            >
              Register
            </Link>
          </p>
          {error && (
            <p className="text-center text-red-500 font-semibold mt-2">
              {error}
            </p>
          )}
        </form>
        <div className="flex justify-center pb-5">
          {/* Google */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn hover:bg-black hover:text-white bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
