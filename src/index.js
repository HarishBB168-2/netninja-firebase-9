import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHWJ6NlyaL2tEUXrJEbHr5-_WYBVeZU40",
  authDomain: "fir-9-test-f66a8.firebaseapp.com",
  projectId: "fir-9-test-f66a8",
  storageBucket: "fir-9-test-f66a8.appspot.com",
  messagingSenderId: "672721307152",
  appId: "1:672721307152:web:9d773d6a5e5f978d55ec95",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "books");

async function getData() {
  try {
    const snapshot = await getDocs(colRef);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  } catch (err) {
    console.log(err.message);
  }
}

getData();

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  });

  addBookForm.reset();
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  await deleteDoc(docRef);
  deleteBookForm.reset();
});
