import { api } from "~/utils/api";

export const Users = () => {
  const { data, isLoading } = api.example.getAllUsers.useQuery();

  if (isLoading) return <div className="flex grow">WE ARE CHECKING</div>;

  if (!data) {
    return null;
  }

  const users = data.map((user, index) => {
    return <div key={index}>Hello~ {user.name} </div>;
  });

  return <>{users}</>;
};

export default Users;
