import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const {user}= use(AuthContext)
  if (user) {
    return (
          <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cover Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-32 relative">
          <div className="absolute  -bottom-12 rounded-full left-1/2 transform -translate-x-1/2">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 bg-gray-500 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.displayName || "Unknown User"}
          </h2>
          <p className="text-gray-500">{user.email}</p>

          <div className="mt-4">
            {user.emailVerified ? (
              <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                Email Verified
              </span>
            ) : (
              <span className="px-3 py-1 text-sm text-red-700 bg-red-100 rounded-full">
                Email Not Verified
              </span>
            )}
          </div>

          {/* metadata */}
          <div className="mt-6 text-left bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(parseInt(user.metadata.createdAt)).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Last Login:</span>{" "}
              {new Date(parseInt(user.metadata.lastLoginAt)).toLocaleString()}
            </p>
          </div>

          {/* Update profile */}
          <div className="mt-6">
            <Link to='/update-profile' className="w-full py-2 btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200">
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
  }


};

export default Profile;
