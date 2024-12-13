import { useEffect } from "react";
import ProfileSidebar from "../components/ProfileSidebar"
import ProfileTopbar from "../components/ProfileTopbar"
import ProfileUser from "../components/ProfileUser"
import { useLocation } from "react-router";
import { useState } from "react";
import UserFollowers from "../components/ProfileFollowers";
import UserFollowing from "../components/ProfileFollowing";
import ProfileSavedPosts from "../components/ProfileSavedPosts";
import ProfilePosts from "../components/ProfilePosts";


export default function Profile() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryFromUrl = query.get("tab");
    if (queryFromUrl) {
      setTab(queryFromUrl);
    }
  }, [location.search]);
  

  return (
    <div>
      <ProfileTopbar />
    
    <div key="1" className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <ProfileSidebar />
      <div className="flex flex-col pt-9">
        {(tab==='profile' || !tab) && <ProfileUser />}
        {tab==='followers'&&<UserFollowers />}
        {tab==='following'&&<UserFollowing />}
        {tab==='saved'&&<ProfileSavedPosts />}
        {tab==='posts'&&<ProfilePosts />}
      </div>
    </div></div>
  );
}

