import { db } from "./Firebase/firebase";
import providerActions from "../redux/ProvidersActions";

const GetProviders = async (
  dispatch,
  filterGroups,
  chunkSize,
  action,
  terminalItems,
  searchQuery
) => {
  let providersRef = db.collection("providers");

  // TODO: how to get total number of items for pagination [not possible in firebase unless fetch all]
  // Or change to continuous scroll [not ideal for current layout (will lose menubar/ filters when scrolled down)]
  // Current solution: Hard code number of total pages to fetch each time for now (*5)
  let data = [];
  let providersSnapShot;
  let last;
  let first = null;

  for (let filter in filterGroups) {
    if (filterGroups[filter]) {
      providersRef = providersRef.where(filter, "==", filterGroups[filter]);
    }
  }
  console.log({ action, terminalItems });

  if (action === "next") {
    providersRef = providersRef
      .orderBy("uid")
      .startAfter(terminalItems.last)
      .limit(chunkSize);
  } else if (action === "prev") {
    providersRef = providersRef
      .orderBy("uid")
      .endBefore(terminalItems.first)
      .limit(chunkSize);
  } else {
    providersRef = providersRef.orderBy("uid").limit(chunkSize);
  }

  try {
    providersSnapShot = await providersRef.get();
    providersSnapShot.forEach((doc) => {
      if (first === null) first = doc;
      last = doc;
      const curObject = doc.data();
      curObject._id = doc.id;
      data.push(curObject);
    });
    first = providersSnapShot.docs[providersSnapShot.docs.length - 1];
    last = providersSnapShot.docs[0];
    providerActions.fetchProviders(dispatch, {
      providers: data,
      terminals: { first, last },
    });
  } catch (err) {
    console.log("provider not retrieved:", err);
  }

  return;
};

export default GetProviders;
