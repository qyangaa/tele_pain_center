import React, { useEffect, useState } from "react";
import { db } from "./Firebase/firebase";
import { useDispatch } from "react-redux";
import * as ActionTypes from "../redux/ActionTypes";

const GetProviders = async () => {
  var providersRef = db.collection("providers");
  let data = [];
  try {
    var providersSnapShot = await providersRef.get();
    providersSnapShot.forEach((doc) => {
      const curObject = doc.data();
      curObject._id = doc.id;
      data.push(curObject);
    });
  } catch (err) {
    console.log("provider not retrieved");
  }
  return data;
};

export default GetProviders;
