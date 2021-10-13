import { useGetAccount, useGetFollowing } from "../hooks/data";
import { useAlert } from "../hooks/alert";
import { unfollow } from "../services/account";

const Profile = () => {
  const { showAlert } = useAlert();
  const { account, loading } = useGetAccount();
  const { following, loading: followersLoading } = useGetFollowing(
    account?.name
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
                  unfollow(name, follow.following)
                    .then(() => {
                      showAlert(
                        "Unfollow successfull",
                        `Successfully unfollowed account ${follow.following}`
                      );
                    })
                    .catch((err) => {
                      showAlert(
                        `Couldn't unfollow: ${follow.following}`,
                        err.message
                      );
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
