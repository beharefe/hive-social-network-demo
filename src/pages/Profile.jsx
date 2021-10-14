import { useGetAccount, useGetFollowing } from "../hooks/data";
import { useAlert } from "../hooks/alert";
import { unfollow } from "../services/account";
import { useMutation, useQueryClient } from "react-query";

const Profile = () => {
  const { showAlert } = useAlert();
  const { account, loading } = useGetAccount();
  const { following, loading: followersLoading } = useGetFollowing(
    account?.name
  );

  const queryClient = useQueryClient();

  // unfollow account and update followers list with mutation and invalidateQueries
  const mutation = useMutation(
    async ({ myAccountName, accountToUnfollow }) => {
      await unfollow(myAccountName, accountToUnfollow);
    },
    {
      onSuccess: (_, variables) => {
        // After 5 seconds we refetch following list to refresh
        showAlert(
          "Unfollow successfull",
          `Successfully unfollowed account ${variables.accountToUnfollow}, after 10 seconds list will be updated`
        );
        setTimeout(() => {
          queryClient
            .invalidateQueries({
              queryKey: "following-list",
              exact: true,
              refetchActive: true,
              refetchInactive: true,
            })
            .then(() => {
              showAlert("Refreshed follower list");
            });
        }, 10000);
      },
      onError: (error, variables) => {
        showAlert(
          `Couldn't unfollow: ${variables.accountToUnfollow}`,
          error.message
        );
      },
    }
  );

  if (loading) {
    return <span className="text-green-400">Loading account info</span>;
  }

  const { name } = account;
  return (
    <div>
      <label className="flex text-lg mb-4 font-semibold text-gray-500">
        Account name:
        <span className="font-normal text-gray-800 dark:text-white">
          {name}
        </span>
      </label>
      <h3 className="text-2xl">Followers </h3>
      {followersLoading ? (
        <span className="text-green-400">Loading followers</span>
      ) : (
        <ul className="w-96">
          {following.map((follow) => (
            <li key={follow.following} className="flex justify-between">
              {follow.following}
              <button
                onClick={() => {
                  mutation.mutate({
                    myAccountName: name,
                    accountToUnfollow: follow.following,
                  });
                }}
              >
                Unfollow
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
