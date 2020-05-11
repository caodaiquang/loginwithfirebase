import firebaseApp from 'firebase'

const infoUser = firebaseApp.auth().currentUser

export default infoUser
