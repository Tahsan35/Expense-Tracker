import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/inputs/Input";
import ProfilePhotSelector from "../../components/inputs/ProfilePhotSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!email.includes("@")) {
      setError("Email must be valid");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-5 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please fill in the details to create your account
        </p>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfilePhotSelector
              image={profilePic}
              setImage={setProfilePic}
            ></ProfilePhotSelector>
            <div>
              <Input
                value={name}
                onChange={({ target }) => setName(target.value)}
                label="Full Name"
                placeholder="Shakil Ahmed"
                type="text"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="shakil@example.com"
                type="text"
              />
            </div>
            <div className=" col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="min 6 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
