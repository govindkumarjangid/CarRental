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

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) return <UserTableSkeleton />;

  return (
    <div className="px-4 pt-10 md:px-10 flex-1 pb-10">
      <OwnerTitle
        title="All Users"
        subTitle="Manage all users of the car rental system. View, block or unblock users as necessary to maintain an up-to-date user database."
      />
      <div className="max-w-[1000px] w-full bg-white dark:bg-second-bg shadow-sm rounded-xl overflow-hidden mt-6 border border-gray-200 dark:border-dark-border">
        <motion.table
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full border-collapse border-spacing-0"
        >

          {/* All Users Table */}
          <thead className="bg-gray-50 dark:bg-card-bg text-gray-500 dark:text-dark-muted border-b border-gray-200 dark:border-dark-border">
            <tr className="text-left">
              <th className="py-3 px-4 font-semibold">
                <div className="flex items-center justify-between">
                  <span>User</span>
                  <span className="hidden max-sm:inline">Actions</span>
                </div>
              </th>
              <th className="py-3 px-4 font-semibold max-md:hidden">Status</th>
              <th className="py-3 px-4 font-semibold max-sm:hidden">Actions</th>
            </tr>
          </thead>


          <tbody className="text-sm text-gray-600 dark:text-dark-text">
            {AllUsers.map((user, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="hover:bg-gray-50/80 transition-colors duration-200 text-left border-b last:border-b-0 border-gray-100 dark:border-dark-border dark:hover:bg-surface/50"
              >

                {/* USER COLUMN */}
                <td className="flex flex-col px-4 py-1">

                  <span className="text-base md:text-xl font-semibold dark:text-dark-text">{user.name}</span>

                  <span className="text-base dark:text-dark-muted">{user.email}</span>

                  {/* status  */}
                  <div className="md:hidden mt-1">
                    {user.isBlocked ? (
                      <span className="flex items-center gap-2 text-red-600 font-semibold">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-700"></span>
                        </span>
                        Blocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-green-600 font-semibold">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600"></span>
                        </span>
                        Active
                      </span>
                    )}
                  </div>

                  {/* block & unblock for mobile  */}
                  <div className="mx-1 sm:hidden flex items-center justify-end ">
                    <select
                      name="userStatus"
                      value={user.isBlocked ? "block" : "unblock"}
                      onChange={(e) => handleBlockToggle(user._id, e.target.value === "block" ? true : false)}
                      className={`outline-none px-2 py-1 rounded-md cursor-pointer ${user.isBlocked ? "bg-red-300/30 text-red-500" : "bg-green-300/30 text-green-500"}`}
                    >
                      <option value="block">Block</option>
                      <option value="unblock">Unblock</option>
                    </select>
                  </div>

                </td>

                {/* DESKTOP STATUS */}
                <td className="max-md:hidden px-4 py-1">
                  {user.isBlocked ? (
                    <span className="flex items-center gap-2 text-red-600 font-semibold">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-700"></span>
                      </span>
                      Blocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600"></span>
                      </span>
                      Active
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-1 max-sm:hidden">
                  <select
                    name="userStatus"
                    value={user.isBlocked ? "block" : "unblock"}
                    onChange={(e) => handleBlockToggle(user._id, e.target.value === "block" ? true : false)}
                    className={`outline-none px-2 py-1 rounded-md cursor-pointer ${user.isBlocked ? "bg-red-300/30 text-red-500" : "bg-green-300/30 text-green-500"}`}
                  >
                    <option value="block">Block</option>
                    <option value="unblock">Unblock</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div >
  )
}

export default AllUsers;
