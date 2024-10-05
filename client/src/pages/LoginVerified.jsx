import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const LoginVerified = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const idFromUrl = searchParams.get("id");
  const emailFromUrl = searchParams.get("email");

  const handleVerify = useCallback(() => {
    const verifyUrl = `${BASE_URL}/auth/verify-login?id=${idFromUrl}&email=${emailFromUrl}`;
    axios
      .get(verifyUrl)
      .then((res) => {
        if (res.status === 200) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        setIsVerified(false);
      });
  }, [idFromUrl, emailFromUrl, setIsVerified]);

  useEffect(() => {
    // Automatically trigger handleVerify if both id and email are present in the URL
    if (idFromUrl && emailFromUrl) {
      handleVerify();
    }
  }, [idFromUrl, emailFromUrl, handleVerify]);

  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="max-w-md w-full px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Verification Pending
            </h2>
            <p className="text-gray-300">
              You may not have been verified yet. Please check your email for a link
              to verify your account. If you have already verified your account,
              please try{" "}
              <Link className="text-blue-400 font-bold" to="/signin">
                logging in
              </Link>{" "}
              again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="max-w-md w-full px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Congratulations!
          </h2>
          <p className="text-gray-300">
            You have been verified and can now login.
          </p>
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default LoginVerified;
