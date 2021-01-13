import React, { useEffect, useState } from "react";
import { db } from "./Firebase/firebase";

const GetProviders = async (setProviders) => {
  var providersRef = db.collection("providers");
  let data = [];
  try {
    var providersSnapShot = await providersRef.get();
    providersSnapShot.forEach((doc) => {
      const curObject = doc.data();
      curObject._id = doc.id;
      data.push(curObject);
      setProviders(data);
    });
  } catch (err) {
    console.log("provider not retrieved");
  }
};

export default GetProviders;
