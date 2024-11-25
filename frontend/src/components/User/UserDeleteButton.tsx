import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/hooks/user/useUserService";
import { FaTrash } from "react-icons/fa";

interface UserDeleteButtonProps {
  address: string;
}

export const UserDeleteButton = ({ address }: UserDeleteButtonProps) => {
  const { provider } = useAuth();

  const { isLoading, deleteUser } = useUserService(provider);

  const handleDeleteUser = async () => {
    await deleteUser(address);
  };

  return (
    <button
      onClick={handleDeleteUser}
      className="btn btn-sm btn-ghost text-error"
    >
      {isLoading ? (
        <span className="loading loading-spinner w-4 h-4"></span>
      ) : (
        <FaTrash className="w-4 h-4" />
      )}
    </button>
  );
};
