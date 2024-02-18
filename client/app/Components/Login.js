import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-500 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login <span className="text-[rgb(237,158,59)]">ChatMate</span>
          </h1>

          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full input input-bordered h-10"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
              />
            </div>

            <a
              href="#"
              className="text-sm  hover:text-[rgb(237,158,59)] mt-2 inline-block"
            >
              Dont't have an account...?
            </a>

            <div className="flex justify-center">
              <button className="btn btn-md mt-2 px-6">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
