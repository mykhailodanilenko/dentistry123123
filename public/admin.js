// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDPyg2uJEGkz9eNpA6dhH60dhzoXt5yAHM",
  authDomain: "dentistry-7a55b.firebaseapp.com",
  projectId: "dentistry-7a55b",
  storageBucket: "dentistry-7a55b.appspot.com",
  messagingSenderId: "633876959193",
  appId: "1:633876959193:web:f581a97f03424de981d3c8"
};

firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore();
const auth = firebase.auth();

// Build table

const dbRef = db.collection('apptrq');
const table = document.getElementById('table-body');

let unsubscribe = dbRef.onSnapshot(querySnapshot => { 
  const appts = querySnapshot.docs.map(doc => {
    const phone = parseInt(doc.data().phone);
    let insurance = doc.data().ins;
    switch (insurance) {
      case "bcbs":
      insurance = "BCBS";
      break;
      case "aetna":
        insurance = "Aetna";
        break;
        case "uhc":
          insurance = "UHC";
          break;
          case "delta":
            insurance = "Delta";
            break;
            case "guardian":
              insurance = "Guardian";
              break;
              case "none":
                insurance = "None";
                break;
                case "other":
                  insurance = "Other";
                  break;
    }
    let subDate = new Date (doc.data().submittedOn.seconds * 1000);
    subDate = subDate.toLocaleString();
  return (`<tr><td>${doc.data().name}</td>
  <td>${doc.data().date}</td>
  <td><a href="tel:${phone}"><i class="material-icons tiny">phone</i> ${phone}</td>
  <td>${insurance}</td>
  <td>${subDate}</td>
  <td><button data-docID="${doc.id}" class="blue btn-floating btn-small waves-effect waves-light btnDelete"><i style="pointer-events:none;" class="center material-icons">clear</i></button></td>
  </tr>`);
});
table.insertAdjacentHTML("afterbegin", appts.join(''));
unsubscribe();

let deleteButtons = document.querySelectorAll('.btnDelete');
deleteButtons.forEach(element => {
  element.addEventListener('click', deleteEvent);
});
});

function deleteEvent(e){
  const deleted = e.target.parentElement.parentElement;
  dbRef.doc(`${e.target.dataset.docid}`).delete();
  deleted.remove();
}