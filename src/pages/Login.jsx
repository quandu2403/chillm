import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/logo.png";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let re =
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';

    if (email === undefined) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (password === undefined) {
      toast.error("Password is required.");
      return;
    }
    try {
      logIn(email, password)
        .then(() => {
          // Successful login
          toast.success("Login successfully!", {});
          setTimeout(() => {
            navigate("/");
          }, 500);
        })
        .catch((error) => {
          // Handle login error
          const errorCode = JSON.stringify(error.code);
          console.log(errorCode);
          if (errorCode === '"auth/user-not-found"') {
            toast.error("Email not found");
          } else if (errorCode === '"auth/wrong-password"') {
            toast.error("Wrong password");
          } else {
            toast.error("Connection to Server Error");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div class="flex h-screen flex-col items-center justify-center bg-black-sidebar">
      <Toaster position="top-right" />
      <div class="mt-8 flex items-center gap-x-5">
        <img src={logo} alt="Logo" class="w-32" />
        <h1 class="origin-left font-mono text-5xl font-medium text-white duration-300">
          ChillM
        </h1>
      </div>
      <form
        onSubmit={handleLogIn}
        class="mx-4 mt-4 w-full md:w-3/4 lg:w-1/4 rounded-md bg-slate-100 px-8 py-6 text-left"
      >
        <div class="form">
          <div class="mt-4">
            <div class="mt-4">
              <label class="block" for="email">
                Email
              </label>
              <input
                class="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                type="email"
                placeholder="Email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={handlePasswordKeyDown}
                autoComplete="email"
              />
            </div>
            <div class="mt-4">
              <label class="block">Password</label>
              <input
                class="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handlePasswordKeyDown}
                autoComplete="current-password"
              />
            </div>
            <div class="flex">
              <button
                class="mt-4 w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900"
                type="submit"
              >
                Login
              </button>
            </div>
            <div class="text-grey-dark mt-6">
              New to ChillF&S? &nbsp;
              <Link class="text-blue-600 hover:underline" to="/signup">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
