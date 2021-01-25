import { db } from "./Firebase/firebase";
import providerActions from "../redux/ProvidersActions";

const GetProviders = async (dispatch) => {
  var providersRef = db.collection("providers");
  let data = [];
  try {
    const providersSnapShot = await providersRef.get();
    providersSnapShot.forEach((doc) => {
      const curObject = doc.data();
      curObject._id = doc.id;
      data.push(curObject);
    });
    providerActions.fetchProviders(dispatch, data);
  } catch (err) {
    console.log("provider not retrieved");
  }
  return data;
};

export default GetProviders;
