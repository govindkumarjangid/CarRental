import { useAppContext } from '../../context/AppContext';

const AllUsers = () => {

  const { OwnerTitle } = useAppContext();

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <OwnerTitle
        title="All Users"
        subTitle="Manage all users of the car rental system. View, block or unblock users as necessary to maintain an up-to-date user database."
      />
    </div>
  )
}

export default AllUsers;