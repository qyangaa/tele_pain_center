import { db } from "./Firebase/firebase";
import * as providerActions from "../redux/ProvidersActions";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

export const searchAlgolia = async (query, dispatch) => {
  try {
    const searchResults = await index.search(query);

    searchResults.hits.forEach((hit) => {
      hit._id = hit.uid;
    });
    providerActions.fetchProviders(dispatch, {
      providers: searchResults.hits,
    });
  } catch (err) {
    console.log("provider not retrieved:", err);
  }

  return;
};

export const GetProviders = async (
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
    let index = 1;
    providersSnapShot = await providersRef.get();
    providersSnapShot.forEach((doc) => {
      if (first === null) first = doc;
      last = doc;
      const curObject = doc.data();
      curObject._id = doc.id;
      curObject.index = index;
      index += 1;
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

// export default GetProviders;
