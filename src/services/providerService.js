import { db } from "./Firebase/firebase";
import providerActions from "../redux/ProvidersActions";

const GetProviders = async (
  dispatch,
  filterGroups,
  currentChunk,
  pageSize,
  searchQuery
) => {
  let providersRef = db.collection("providers");

  for (let filter in filterGroups) {
    if (filterGroups[filter]) {
      providersRef = providersRef.where(filter, "==", filterGroups[filter]);
    }
  }
  const chunkSize = 5 * pageSize;
  const startIndex = (currentChunk - 1) * chunkSize;
  console.log({ startIndex });
  providersRef = providersRef
    .orderBy("uid")
    .startAt(startIndex)
    .limit(chunkSize);

  // TODO: how to get total number of items for pagination [not possible in firebase unless fetch all]
  // Or change to continuous scroll [not ideal for current layout (will lose menubar/ filters when scrolled down)]
  // Current solution: Hard code number of total pages to fetch each time for now (*5)
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
