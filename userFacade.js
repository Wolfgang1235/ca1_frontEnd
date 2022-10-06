const URL = "https://gaagle.info/ca1_3sem/api/persons"

function getUserById(id) {
    return fetch(`${URL}/${id}`)
        .then(response => response.json())
}

function createUser(user) {
    const options = makeOptions("POST",user)
    return fetch(URL,options)
        .then(response => response.json())
}

function editUser(user,id) {
    const options = makeOptions("PUT",user)
    return fetch(`${URL}/${id}`,options)
        .then(response => response.json())
}

function deleteUser(id) {
    const options = makeOptions("DELETE")
    fetch(`${URL}/${id}`,options)
}

const userFacade = {
    getUserById,
    createUser,
    editUser,
    deleteUser
}

function makeOptions(method, body) {
    const opts = {
        method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    };
    if (body) {
        opts.body = JSON.stringify(body)
    }
    return opts;
}


export default userFacade