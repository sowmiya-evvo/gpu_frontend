import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnline, setOffline } from "../../app/features/network/networkSlice";

const NetworkListener: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateOnlineStatus = () => {
      navigator.onLine ? dispatch(setOnline()) : dispatch(setOffline());
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [dispatch]);

  return null;
};

export default NetworkListener;
