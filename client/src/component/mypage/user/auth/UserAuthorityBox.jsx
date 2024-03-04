import { useEffect, useState } from "react";
import UserAuthority from "./UserAuthority";

export default function UserAuthorityBox(props) {
  const [userauthority, setuserauthority] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setuserauthority([{ Userauthority: props.data.role }]);
  }, [props]);

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          userauthority.map((userauthority, index) => {
            return (
              <UserAuthority
                key={index}
                UserAuthorityName={userauthority.Userauthority}
              />
            );
          })
        )}
      </div>
    </div>
  );
}