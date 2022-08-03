import firebase from "firebase";
import firebaseApp from "./firebase";

class AuthService {
    login(providerName){
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }
    logout(){
        firebase.auth().signOut();
    }

    onAuthChange(onUserChanged){
        //  사용자가 바뀌었을떄
        // onUserChanged: 함수
        // onUserChanged 인자로 "user" 정보를 전달한다.

        firebase.auth().onAuthStateChanged(user => {
            onUserChanged(user);
        });
    }
}

export default AuthService