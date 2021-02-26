import _ from "lodash";

const names = [
  "Yamilet Kemp",
  "Hazel Pearson",
  "Cailyn Tucker",
  "Odin Howe",
  "Robert Barry",
  "Ashley Fisher",
  "Desiree Avila",
  "Jayson Bond",
  "Jayden Wilkins",
  "Alondra Chase",
  "Kason Calderon",
  "Wesley Morrison",
  "Haven Brooks",
  "Michael Fox",
  "Braxton Miller",
  "Marcos Whitaker",
  "Noemi Patel",
  "Genevieve Russo",
  "Tyrell Bowen",
  "Shea Byrd",
  "Bradley Acosta",
  "Bria Lloyd",
  "Jason Robinson",
  "Kamden Reid",
  "Sabrina Norman",
  "Cynthia Henry",
  "Malachi Francis",
  "Serena Barton",
  "Trevor Bender",
  "Aleena Chaney",
  "Rayne Horn",
  "Olive Glass",
  "Jaliyah Le",
  "Jessie Wolfe",
  "Leah Rojas",
  "Cooper Richard",
  "Stella Gibbs",
  "Konnor Spencer",
  "Randy Holt",
  "Moriah Collins",
  "Jordan Strickland",
  "Connor Juarez",
  "Joanna Ponce",
  "Carina Pugh",
  "Gideon Thomas",
  "Ellie Lopez",
  "Michael Gonzalez",
  "Tyson Gutierrez",
  "John Randolph",
  "Ian Stephens",
  "Dalia Bond",
  "Alyson Boone",
  "Maxim Chandler",
  "Wayne Owen",
  "Jerimiah Yu",
  "Case Herman",
  "Adeline Mercado",
  "Semaj Golden",
  "Aurora Alexander",
  "Jaylon Lambert",
  "Cade Castillo",
  "Sebastian Garrett",
];

const specialties = [
  "Fibromyalgia",
  "Arthritis",
  "Pain Psychology",
  "Physical Therapy",
  "Occupational Therapy",
];

const organizations = [
  "Anderson Inc Clinic",
  "Hoeger - Blick Hospital",
  "Heidenreich, Hand and Waelchi Clinic",
  "Wiza - Lang Clinic",
  "Heaney, Stracke and Farrell Hospital",
  "Feil Group Clinic",
  "Erdman, Lowe and Zemlak Hospital",
  "Gleason, Ortiz and Schumm Clinic",
];

const greetings = [
  "I care for patients.",
  "Experienced and professional.",
  "Your health is my highest priority.",
];

const addresses = [
  {
    city: "Fremont",
    state: "CA",
    address1: "40000 Paseo Padre Pkwy",
    address2: "",
    zip: "94538",
    _geoloc: { lat: 37.548305301878145, lng: -121.96565297683523 },
  },
  {
    city: "Fremont",
    state: "CA",
    address1: "1000 Pine St",
    address2: "",
    zip: "94539",
    _geoloc: { lat: 37.52270772171007, lng: -121.92472453874225 },
  },
  {
    city: "Mountain View",
    state: "CA",
    address1: "680 Barbara Ave",
    address2: "",
    zip: "94040",
    _geoloc: { lat: 37.38495779213348, lng: -122.0852279681612 },
  },
  {
    city: "Mountain View",
    state: "CA",
    address1: "1500 Charleston Rd",
    address2: "",
    zip: "94043",
    _geoloc: { lat: 37.430228143135366, lng: -122.08385467716393 },
  },
];

const images = [
  "https://cdn.pixabay.com/photo/2016/08/10/20/26/stethoscope-1584223__340.jpg",
  "https://cdn.pixabay.com/photo/2017/03/14/03/20/nurse-2141808__340.jpg",
  "https://cdn.pixabay.com/photo/2016/01/19/15/05/doctor-1149149__340.jpg",
  "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420__340.jpg",
  "https://cdn.pixabay.com/photo/2019/07/30/15/57/dentist-4373290__340.jpg",
  "https://cdn.pixabay.com/photo/2016/02/08/23/36/isolated-1188036__340.png",
  "https://cdn.pixabay.com/photo/2017/09/06/20/36/doctor-2722941__340.jpg",
];

const name2Email = (name) => {
  const splitted = name.toLowerCase().split(" ");
  const email = splitted[0] + "@" + splitted[1] + ".com";
  return email;
};

const generatePhoneNumber = () => {
  return Math.random().toString().slice(2, 11);
};

const descriptionGenerator = (specialty, greeting) => {
  const description = "I specialize in " + specialty + "." + greeting;
  return description;
};

const generateProvider = (name) => {
  const specialty = _.sample(specialties);
  const organization = _.sample(organizations);
  const greeting = _.sample(greetings);
  const address = _.sample(addresses);
  const image = _.sample(images);
  return {
    email: name2Email(name),
    name,
    password: "123456",
    organization,
    description: descriptionGenerator(specialty, greeting),
    phone: generatePhoneNumber(),
    specialty,
    image,
    ...address,
  };
};

export const generateProviders = (test) => {
  const res = [];
  for (let name of names.slice(1, 30)) {
    res.push(generateProvider(name));
  }
  if (test == true) return [res[0]];
  return res;
};
