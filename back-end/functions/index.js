// Agregar admin desde terminal
// firebase functions:config:set accounts.admin="admin@bluuweb.cl"
// firebase functions:config:get -> ver configuración de entorno // https://firebase.google.com/docs/functions/config-env
// firebase functions:config:unset variable -> para eliminar una variable de entorno // https://medium.com/@jobsamuel/variables-de-entorno-en-firebase-functions-ec9b82e76e16


const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');

admin.initializeApp();

const auth = admin.auth();

exports.agregarAdministrador = functions.https.onCall((data, context)=>{

    if(context.auth.token.admin !== true){
        return {error: 'no tienes los permisos'}
    }

    return auth.getUserByEmail(data.email)
        .then(user =>{
            return auth.setCustomUserClaims(user.uid, {admin: true})
        })
        .then(()=>{
            return {
                message: 'se creo el administrador'
            }
        })
        .catch(error => {
            return {error: error}
        })

})

exports.eliminarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: false})
        })
        .then(() => {
            return {message: 'se eliminó con éxito el administrador'}
        })
        .catch(error => error)
})

exports.agregarAutor = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {autor: true})
        })
        .then(() => {
            return {message: 'se creó con éxito el autor'}
        })
        .catch(error => error)
})

exports.eliminarAutor = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {autor: false})
        })
        .then(() => {
            return {message: 'se creó con éxito el autor'}
        })
        .catch(error => error)
})