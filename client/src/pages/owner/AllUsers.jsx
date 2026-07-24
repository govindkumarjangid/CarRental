import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Title as OwnerTitle } from '../../components/owner/Title.jsx';
import { UserTableSkeleton } from '../../components/skeletons';
import { useAuthStore } from '../../store/useAuthStore';
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
} from 'lucide-react';

const AllUsers = () => {
  const {
    allUsers: AllUsers,
    allUsersLoading: loading,
    fetchAllUsers,
    handleBlockToggle,
  } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Filter users based on search and status filter
  const filteredUsers = AllUsers.filter((user) => {
    const nameMatch = (user?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = (user?.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || emailMatch;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !user.isBlocked) ||
      (statusFilter === "Blocked" && user.isBlocked);

    return matchesSearch && matchesStatus;
  });

  const totalUsers = AllUsers.length;
  const activeCount = AllUsers.filter((u) => !u.isBlocked).length;
  const blockedCount = AllUsers.filter((u) => u.isBlocked).length;

  const renderStatusBadge = (isBlocked) =>
    isBlocked ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
        Blocked
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Active
      </span>
    );

  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <OwnerTitle
        title="All Users"
        subTitle="Manage all registered users of CarRental. View account details, status, block or unblock users as necessary."
      />

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Total Users</p>
            <h4 className="text-lg font-black text-gray-900">{totalUsers}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 border border-emerald-100">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Active Users</p>
            <h4 className="text-lg font-black text-emerald-700">{activeCount}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0 border border-rose-100">
            <XCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Blocked Users</p>
            <h4 className="text-lg font-black text-rose-700">{blockedCount}</h4>
          </div>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-primary focus:bg-white transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          {["All", "Active", "Blocked"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-primary text-white shadow-xs"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Listing Content */}
      <div className="w-full">
        {loading ? (
          <UserTableSkeleton />
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center">
              <Users size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No Users Found</h3>
            <p className="text-xs text-gray-500 max-w-sm font-medium">
              {searchTerm ? "No users match your search terms." : "There are currently no users registered in the system."}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="md:hidden space-y-3">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-gray-200 bg-white shadow-xs p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {/* Circular Avatar */}
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg overflow-hidden shrink-0 shadow-xs border border-gray-200">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        user?.name?.charAt(0)?.toUpperCase() || "U"
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs font-semibold text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {renderStatusBadge(user.isBlocked)}

                    <button
                      onClick={() => handleBlockToggle(user._id, !user.isBlocked)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                        user.isBlocked
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200"
                      }`}>
                      {user.isBlocked ? (
                        <>
                          <UserCheck size={14} />
                          <span>Unblock</span>
                        </>
                      ) : (
                        <>
                          <UserX size={14} />
                          <span>Block</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-50/80 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">User Profile</th>
                    <th className="py-4 px-6">Account Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user._id || index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {/* Perfect Circular Avatar */}
                          <div className="w-11 h-11 rounded-full bg-linear-to-br from-primary via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg overflow-hidden shrink-0 shadow-xs border border-gray-200">
                            {user?.image ? (
                              <img
                                src={user.image}
                                alt={user.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              user?.name?.charAt(0)?.toUpperCase() || "U"
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-extrabold text-gray-900">{user.name}</span>
                            <span className="text-xs font-semibold text-gray-500">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {renderStatusBadge(user.isBlocked)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleBlockToggle(user._id, !user.isBlocked)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                            user.isBlocked
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200"
                              : "bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200"
                          }`}>
                          {user.isBlocked ? (
                            <>
                              <UserCheck size={14} />
                              <span>Unblock User</span>
                            </>
                          ) : (
                            <>
                              <UserX size={14} />
                              <span>Block User</span>
                            </>
                          )}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
