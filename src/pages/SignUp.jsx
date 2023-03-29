import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/logo.png";
function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { signUp } = UserAuth();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    //validate sign up
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === undefined || !re.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (password === undefined) {
      toast.error("Password is required.");
      return;
    }

    if (password.trim().length < 5) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (confirmPassword === undefined) {
      toast.error("Passwords confirm is required.");
      return;
    }
    if (!re.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // create a account
    const toastId = toast.loading("Creating account...");
    try {
      signUp(email, password)
        .then(() => {
          toast.success("Account created successfully!", {
            id: toastId,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          const errorCode = JSON.stringify(err.code);
          if (errorCode === '"auth/email-already-in-use"') {
            toast.error("Email already in use!!!", {
              id: toastId,
            });
          } else {
            toast.error("Connection to Server Error", {
              id: toastId,
            });
          }
        });
      //
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center bg-black-sidebar">
        <Toaster position="top-right" />
        <div className=" mt-8 flex items-center gap-x-5">
          <img src={logo} alt="Logo" className={` w-32`} />
          <h1
            className={` origin-left font-mono text-5xl font-medium text-white duration-300 `}
          >
            ChillF&S
          </h1>
        </div>
        {/* Register htmlForm */}
        <div className="mx-4 mt-4 rounded-md bg-slate-100 px-8 py-6 text-left w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <form className="" onSubmit={handleSignUp}>
            <div className="mt-4">
              {/* <div>
                <label className="block" htmlFor="Name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div> */}
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                  onKeyDown={handlePasswordKeyDown}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="current-password"
                  onKeyDown={handlePasswordKeyDown}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  onKeyDown={handlePasswordKeyDown}
                  required
                />
              </div>
              {/* <span className="text-xs text-red-400">
                Password must be same!
              </span> */}
              <div className="flex">
                <button
                  className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
              <div className="text-grey-dark mt-6">
                Already have an account?&nbsp;
                <Link className="text-blue-600 hover:underline" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
