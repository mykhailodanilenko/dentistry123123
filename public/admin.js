/* eslint-disable default-case */

// Initialize Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBKI_bxndw-had46uu4N_YYe4Zo7rZ348Y',
  authDomain: 'dentistry-7a55b.firebaseapp.com',
  projectId: 'dentistry-7a55b',
  storageBucket: 'dentistry-7a55b.appspot.com',
  messagingSenderId: '633876959193',
  appId: '1:633876959193:web:f581a97f03424de981d3c8',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// Authentication

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginForm.addEventListener('submit', loginAction);

function loginAction(e) {
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      loader.classList.add('hide');
      loginForm.reset();
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

signOutBtn.addEventListener('click', signOutAction);

function signOutAction() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

// Build table

const dbRef = db.collection('apptrq');
const table = document.getElementById('table-body');

const buildTable = function () {
  dbRef.get().then((querySnapshot) => {
    const appts = querySnapshot.docs.map((doc) => {
      const phone = parseInt(doc.data().phone);
      let insurance = doc.data().ins;
      switch (insurance) {
        case 'bcbs':
          insurance = 'BCBS';
          break;
        case 'aetna':
          insurance = 'Aetna';
          break;
        case 'uhc':
          insurance = 'UHC';
          break;
        case 'delta':
          insurance = 'Delta';
          break;
        case 'guardian':
          insurance = 'Guardian';
          break;
        case 'none':
          insurance = 'None';
          break;
        case 'other':
          insurance = 'Other';
          break;
      }
      let subDate = new Date(doc.data().submittedOn.seconds * 1000);
      subDate = subDate.toLocaleString();
      return (`<tr><td>${doc.data().name}</td>
  <td>${doc.data().date}</td>
  <td><a href="tel:${phone}"><i class="material-icons tiny">phone</i> ${phone}</td>
  <td>${insurance}</td>
  <td>${subDate}</td>
  <td><button data-docID="${doc.id}" class="blue btn-floating btn-small waves-effect waves-light btnDelete"><i style="pointer-events:none;" class="center material-icons">clear</i></button></td>
  </tr>`);
    });
    while (table.firstChild) {
      table.firstChild.remove();
    }
    table.insertAdjacentHTML('afterbegin', appts.join(''));
    loader.classList.add('hide');
    const deleteButtons = document.querySelectorAll('.btnDelete');
    deleteButtons.forEach((element) => {
      element.addEventListener('click', deleteEvent);
    });
  });
};

function deleteEvent(e) {
  const deleted = e.target.parentElement.parentElement;
  dbRef.doc(`${e.target.dataset.docid}`).delete();
  deleted.remove();
}

// Render functions

let loader = document.querySelector('#wrapperLoader');

function renderLoggedIn() {
  loader.classList.remove('hide');
  whenSignedOut.classList.add('hide');
  whenSignedIn.classList.remove('hide');
  signOutBtn.classList.remove('hide');
}

function renderLoggedOut() {
  loader.classList.remove('hide');
  whenSignedIn.classList.add('hide');
  whenSignedOut.classList.remove('hide');
  signOutBtn.classList.add('hide');
  loader.classList.add('hide');
}

auth.onAuthStateChanged((user) => {
  if (user) {
    renderLoggedIn();
    buildTable();
  } else {
    renderLoggedOut();
  }
});
