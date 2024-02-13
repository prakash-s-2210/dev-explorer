import { useParams } from "react-router-dom";
import { Octokit } from "octokit";

import { useEffect, useState } from "react";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  let { username } = useParams();

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.TOKEN,
    });
    const fetchUsers = async () => {
      try {
        const result = await octokit.request(`GET /users/${username}`, {
          username: "USERNAME",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        setUserDetails(result.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [username]);

  return (
    <>
      {userDetails && (
        <div className="bg-gray-800 text-white h-[calc(100vh-106px)] overflow-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto p-4 user-details-scrollbar">
            <div className="bg-gray-900 rounded-lg shadow-lg p-5">
              <div className="flex items-center space-x-5">
                <img
                  src={userDetails.avatar_url}
                  alt={userDetails.login}
                  className="w-24 h-24 rounded-full border-2 border-gray-700"
                />
                <div>
                  {userDetails.name && (
                    <h2 className="text-2xl font-bold">
                      {userDetails.name
                        .split(" ")
                        .map(
                          (part) => part.charAt(0).toUpperCase() + part.slice(1)
                        )
                        .join(" ")}
                    </h2>
                  )}
                  <p className="text-gray-400">@{userDetails.login}</p>
                </div>
              </div>
              {userDetails.bio && (
                <div className="mt-5">
                  <h3 className="text-xl font-semibold mb-2">Bio:</h3>
                  <p>{userDetails.bio}</p>
                </div>
              )}
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <span className="font-bold">{userDetails.followers}</span>
                  <p>Followers</p>
                </div>
                <div className="text-center">
                  <span className="font-bold">{userDetails.following}</span>
                  <p>Following</p>
                </div>
                {userDetails.public_repos && (
                  <div className="text-center">
                    <span className="font-bold">
                      {userDetails.public_repos}
                    </span>
                    <p>Public Repos</p>
                  </div>
                )}
                {userDetails.location && (
                  <div className="text-center">
                    <span className="font-bold">{userDetails.location}</span>
                    <p>Location</p>
                  </div>
                )}
              </div>
              {userDetails.company && (
                <div className="mt-5">
                  <h3 className="text-xl font-semibold mb-2">Company:</h3>
                  <p>{userDetails.company}</p>
                </div>
              )}
              {userDetails.twitter_username && (
                <div className="mt-5">
                  <h3 className="text-xl font-semibold mb-2">Twitter:</h3>
                  <a
                    href={`https://twitter.com/${userDetails.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    @{userDetails.twitter_username}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
