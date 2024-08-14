import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function UserFollowing() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [followings, setFollowings] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");

  useEffect(() => {
    const getFollowingsInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/user/${currentUser._id}/connections?connection=followings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message);
        } else {
          console.log("data.users ", data.users);
          setFollowings(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (tab === "following") {
      getFollowingsInfo();
    }
  }, [location.search, currentUser._id, tab]); 

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            Followings
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6 xl:grid-cols-4">
          {followings.map((user) => (
            <div key={user._id} className="flex flex-col items-center gap-2">
              <Avatar className="w-16 h-16 border">
                <AvatarImage src={user.profilePicture || "/placeholder-user.jpg"} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium text-muted-foreground">
                {user.username}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
