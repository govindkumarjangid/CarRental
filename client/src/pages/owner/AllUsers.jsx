import UserTableSkeleton from '../../components/UI/UserTableSkeleton';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Title as OwnerTitle } from '../../components/owner/Title.jsx';

const AllUsers = () => {

  const {
    allUsers: AllUsers,
    allUsersLoading: loading,
    fetchAllUsers,
    handleBlockToggle,
  } = useAuthStore();

  const renderStatus = (isBlocked) =>
    isBlocked ? (
      <span className="inline-flex items-center gap-2 text-red-600 font-semibold">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-700"></span>
        </span>
        Blocked
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600"></span>
        </span>
        Active
      </span>
    );

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) return <UserTableSkeleton />;

  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
      <OwnerTitle
        title="All Users"
        subTitle="Manage all users of the car rental system. View, block or unblock users as necessary to maintain an up-to-date user database."
      />
      <div className="w-full mt-6">
        <div className="md:hidden space-y-3">
          {AllUsers.map((user, index) => (
            <motion.div
              layout
              key={user._id || index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white shadow-sm p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-xl shrink-0 overflow-hidden">
                  {user?.image ? (
                    <img
                      src={user?.image}
                      alt={user?.name}
                      className="h-12 w-12 aspect-square rounded-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    {renderStatus(user.isBlocked)}

                    <select
                      name="userStatus"
                      value={user.isBlocked ? "block" : "unblock"}
                      onChange={(e) => handleBlockToggle(user._id, e.target.value === "block")}
                      className={`outline-none px-3 py-1.5 rounded-md cursor-pointer text-sm border ${user.isBlocked ? "bg-red-300/30 text-red-500 border-red-200" : "bg-green-300/30 text-green-500 border-green-200"}`}
                    >
                      <option value="block">Block</option>
                      <option value="unblock">Unblock</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <table
          className="hidden md:table w-full border-collapse border-spacing-0 bg-white shadow-md transition-all duration-300 rounded-xl overflow-hidden border border-gray-200"
        >

          {/* All Users Table */}
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
            <tr className="text-left">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4 font-semibold">
                <div className="flex items-center justify-between">
                  <span>User</span>
                </div>
              </th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>


          <tbody className="text-sm text-gray-600">
            {AllUsers.map((user, index) => (
              <motion.tr
                layout
                key={user._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
                className="hover:bg-gray-50/80 transition-colors duration-200 text-left border-b last:border-b-0 border-gray-100"
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-xl overflow-hidden shrink-0">
                      {user?.image ? (
                        <img
                          src={user?.image}
                          alt={user?.name}
                          className="h-11 w-11 aspect-square rounded-full object-cover"
                        />
                      ) : (
                        user?.name?.charAt(0)?.toUpperCase() || "U"
                      )}
                    </div>
                  </div>
                </td>

                {/* USER COLUMN */}
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-base md:text-xl font-semibold">{user.name}</span>
                    <span className="text-base">{user.email}</span>
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-4 py-2">
                  {renderStatus(user.isBlocked)}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-2">
                  <select
                    name="userStatus"
                    value={user.isBlocked ? "block" : "unblock"}
                    onChange={(e) => handleBlockToggle(user._id, e.target.value === "block")}
                    className={`outline-none px-2 py-1 rounded-xl cursor-pointer ${user.isBlocked ? "bg-red-300/30 text-red-500" : "bg-green-300/30 text-green-500"}`}
                  >
                    <option value="block">Block</option>
                    <option value="unblock">Unblock</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default AllUsers;

