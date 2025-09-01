import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ConnectivityBanner: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const isOnline = useSelector(
    (state: any) => state.persistedReducer.network?.isOnline
  );

  useEffect(() => {
    if (isOnline) {
      setIsConnected(true);
      const timeout = setTimeout(() => {
        setIsConnected(false);
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setIsConnected(false);
    }
  }, [isOnline]);

  return (
    <div>
      {!isOnline ? (
        <div
          style={{
            background: "#fd4e51",
            color: "white",
            padding: "10px",
            textAlign: "center",
          }}
        >
          Please check your network connection and try again.
        </div>
      ) : (
        isConnected && (
          <div
            style={{
              background: "#40b76e",
              color: "white",
              padding: "10px",
              textAlign: "center",
            }}
          >
            Connected! You are back online.
          </div>
        )
      )}
    </div>
  );
};

export default ConnectivityBanner;
