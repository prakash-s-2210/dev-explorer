import { Link } from "react-router-dom"

const UsersList = ({usersList}) => {
  return (
    <div className="mt-8 px-8 sm:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 h-[calc(100vh - 106px)]">
        {usersList.map((user) => (
          <div
            key={user.login}
            className="flex justify-evenly flex-wrap gap-5 border border-[#333] rounded-lg p-[10px]  shadow-white bg-[#242424]"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width={150}
              height={150}
              className="rounded-full"
            />

            <div className="flex flex-col justify-center items-center gap-5">
              <p className="font-bold text-xl text-white">{user.login}</p>

              <Link to = {`/users/${user.login}`} className="py-2 px-4 bg-[#17a2b8] text-white border-none rounded cursor-pointer text-center text-sm transition-all duration-300 hover:bg-[#138496] focus:outline-none">View Profile</Link>
            </div>
          </div>
        ))}
      </div>
  )
}

export default UsersList