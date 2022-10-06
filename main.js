import "./style.css";
import userFacade from "/userFacade.js"
document.getElementById("all-content").style.display = "block";

/*
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

/* JS For Exercise-2 below */

/* JS For Exercise-3 below */

/*
 If you do not understand the code below, don´t worry, it is not necessary for completing the exercises
*/

function checkPrivatePhone() {
  document.getElementById("inputPPrivateUser").checked = true;
}

function unCheckPrivatePhone() {
  document.getElementById("inputPPrivateUser").checked = false;
}

function checkPrivateAddress() {
  document.getElementById("inputAPrivateUser").checked = true;
}

function unCheckPrivateAddress() {
  document.getElementById("inputAPrivateUser").checked = false;
}

function checkStatusPhone(input) {
  if (document.getElementById("inputPPrivateUser").checked === false) {
    input = false;
  } else {
    input = true;
  }
  return input;
}

function checkStatusAddress(input) {
  if (document.getElementById("inputAPrivateUser").checked === false) {
    input = false;
  } else {
    input = true;
  }
  return input;
}

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("ex1_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1":
      hideAllShowOne("ex1_html");
      break;
    case "ex3":
      hideAllShowOne("ex3_html");

      document.querySelector(".findUserById").addEventListener("click", () => {
        let id = document.getElementById("inputFindUserById").value
        console.log(id);
        userFacade.getUserById(id).then(data => {

          document.getElementById("inputEmailUser").value = data.email
          document.getElementById("inputFNameUser").value = data.firstName
          document.getElementById("inputLNameUser").value = data.lastName

          document.getElementById("inputPNumberUser").value = data.phone.number
          document.getElementById("inputPDescriptionUser").value = data.phone.description
          let isPhonePrivate = data.phone.isPrivate
          if (isPhonePrivate === true) {
            checkPrivatePhone()
          } else {
            unCheckPrivatePhone()
          }

          document.getElementById("inputAStreetUser").value = data.address.street
          document.getElementById("inputAAdditionalInfoUser").value = data.address.additionalInfo
          let isAddressPrivate = data.address.isPrivate
          if (isAddressPrivate === true) {
            checkPrivateAddress()
          } else {
            unCheckPrivateAddress()
          }

          document.getElementById("inputZipCodeUser").value = data.address.cityInfo.zipCode

        })
      })

      document.querySelector(".createUser").addEventListener("click",() => {
        let phoneStatus = false
        let addressStatus = false

        phoneStatus = checkStatusPhone(phoneStatus)

        addressStatus = checkStatusAddress(addressStatus)

        const user = {
          email: document.getElementById("inputEmailUser").value,
          firstName: document.getElementById("inputFNameUser").value,
          lastName: document.getElementById("inputLNameUser").value,
          phone: {
            number: document.getElementById("inputPNumberUser").value,
            description: document.getElementById("inputPDescriptionUser").value,
            isPrivate: phoneStatus
          },
          address: {
            street: document.getElementById("inputAStreetUser").value,
            additionalInfo: document.getElementById("inputAAdditionalInfoUser").value,
            isPrivate: addressStatus,
            cityInfo: {
              zipCode: document.getElementById("inputZipCodeUser").value
            }
          }
        }
        userFacade.createUser(user).then(data => {
          document.getElementById("userCreated").innerText = JSON.stringify(data)
        })
      })

      document.querySelector(".editUser").addEventListener("click",() => {
        let phoneStatus = false
        let addressStatus = false

        phoneStatus = checkStatusPhone(phoneStatus)

        addressStatus = checkStatusAddress(addressStatus)

        const user = {
          id: document.getElementById("inputFindUserById").value,
          email: document.getElementById("inputEmailUser").value,
          firstName: document.getElementById("inputFNameUser").value,
          lastName: document.getElementById("inputLNameUser").value,
          phone: {
            number: document.getElementById("inputPNumberUser").value,
            description: document.getElementById("inputPDescriptionUser").value,
            isPrivate: phoneStatus
          },
          address: {
            street: document.getElementById("inputAStreetUser").value,
            additionalInfo: document.getElementById("inputAAdditionalInfoUser").value,
            isPrivate: addressStatus,
            cityInfo: {
              zipCode: document.getElementById("inputZipCodeUser").value
            }
          }
        }
        console.log(user);
        userFacade.editUser(user,user.id).then(data => {
          document.getElementById("userCreated").innerText = JSON.stringify(data)
        })
      })

      document.querySelector(".deleteUser").addEventListener("click",() => {
        const idToDelete = document.getElementById("inputDeleteUser").value
        userFacade.deleteUser(idToDelete)
      })

      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
