import React from "react";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { app } from "initializeApp";

function FirebaseStorageWrapper({ children }: any) {
  const storage1 = getStorage(app);

  return <div>{children}</div>;
}

export default FirebaseStorageWrapper;
