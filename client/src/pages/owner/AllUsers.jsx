import Loader from '../../components/UI/Loader';
import { useAppContext } from '../../context/AppContext';

const AllUsers = () => {

  const {
    OwnerTitle,
    motion,
    useState,
    useEffect,
    axios,
    toast,
    setLoading,
    loading } = useAppContext();
  const [AllUsers, setAllUsers] = useState([]);


  const handleBlockToggle = async (userId, isBlocked) => {
    try {
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
    setLoading(true);
    try {
      const { data } = await axios.get('/api/owner/allusers');
      if (data.success) {
        setAllUsers(data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  if (loading) return <Loader />;

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <OwnerTitle
        title="All Users"
        subTitle="Manage all users of the car rental system. View, block or unblock users as necessary to maintain an up-to-date user database."
      />
      <div className="max-w-2xl w-full rounded-md overflow-hidden mt-6 border border-gray-400">
        <motion.table
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full border-collapse border-spacing-0 rounded-md overflow-hidden shadow-md bg-white"
        >

          {/* All Users Table */}
          <thead className="text-gray-500">
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


          <tbody className="text-sm text-gray-600">
            {AllUsers.map((user, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="hover:bg-gray-100 transition-all duration-300 text-left border-t border-gray-400"
              >

                {/* USER COLUMN */}
                <td className="flex flex-col px-4 py-1">

                  <span className="text-base md:text-xl font-semibold">{user.name}</span>

                  <span className="text-base">{user.email}</span>

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