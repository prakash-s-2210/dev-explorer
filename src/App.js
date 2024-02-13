import { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { Routes, Route, useLocation } from "react-router-dom";

import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";

function App() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.TOKEN,
    });
    const fetchUsers = async () => {
      try {
        const storedUsers = localStorage.getItem("githubUsers");
        if (storedUsers) {
          setUsersList(JSON.parse(storedUsers));
        } else {
          const result = await octokit.request("GET /users", {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          setUsersList(result.data);
          localStorage.setItem("githubUsers", JSON.stringify(result.data));
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);
  const location = useLocation();

  return (
    <>
      <header className={`sticky top-0 left-0 text-center px-[10px] py-5 shadow-white h-[106px] ${location.pathname.startsWith("/users") ? "bg-gray-900": "bg-[#2D2D2D]"}`}>
        <h1 className="m-0 text-[#E0E0E0] text-2xl">Github Explorer</h1>

        <p className="text-[#A9A9A9] text-base mt-[10px]">
          Discover and connect with GitHub users
        </p>
      </header>

      <Routes>
        <Route path="/" element={<UsersList usersList={usersList} />}></Route>

        <Route path="/users/:username" element={<UserDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
