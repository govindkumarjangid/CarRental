import { useAppContext } from '../../context/AppContext';

const AllUsers = () => {

  const { OwnerTitle, motion, useState, useEffect, axios, toast } = useAppContext();
  const [AllUsers, setAllUsers] = useState([]);


  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      console.log(userId, isBlocked)
      const { data } = await axios.post("/api/owner/block-unblock", {
        userId,
        isBlocked,
      });
      if (data.success) {
        toast.success(data.message);
        fetchAllUsers();
      } else {
        toast.error("Failed to update user status");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get('/api/owner/allusers');
      if (data.success) {
        toast.success("Users fetched successfully");
        setAllUsers(data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <OwnerTitle
        title="All Users"
        subTitle="Manage all users of the car rental system. View, block or unblock users as necessary to maintain an up-to-date user database."
      />
      <div className="max-w-4xl w-full rounded-md overflow-hidden mt-6 border border-gray-400">
        <motion.table
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden shadow-md bg-white"
        >

          <thead className="bg-gray-50 text-gray-500">
            <tr className='text-left'>
              <th className="py-3 px-4 font-semibold">User</th>
              <th className="py-3 px-4 font-semibold max-md:hidden">Status</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {AllUsers.map((user, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="hover:bg-gray-100 transition-all duration-300 text-left"
              >

                {/* USER COLUMN */}
                <td className="flex flex-col px-4 py-1">
                  <span className="text-xl font-semibold">{user.name}</span>
                  <span className="text-base">{user.email}</span>
                </td>

                {/* DESKTOP STATUS */}
                <td className="max-md:hidden px-4 py-1">
                  {user.isBlocked ? (
                    <span className="text-red-600 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-1">
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