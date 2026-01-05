import { useAppContext } from '../../context/AppContext';

const Chats = () => {
  const { OwnerTitle } = useAppContext();
  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <OwnerTitle
        title="All Chats"
        subTitle="Manage all chats with customers in one place. View, respond, and keep track of your communications efficiently."
      />
    </div>
  )
}

export default Chats;