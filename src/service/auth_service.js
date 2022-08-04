import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

class AuthService {
    login(providerName){
        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }
    logout(){
        firebaseAuth.signOut();
    }

    onAuthChange(onUserChanged){
        //  사용자가 바뀌었을떄
        // onUserChanged: 함수
        // onUserChanged 인자로 "user" 정보를 전달한다.

        firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        });
    }

    getProvider(providerName){
        switch(providerName){
            case "Google" :
                return googleProvider;
            case "Github" :
                return githubProvider;
            default :
                throw new Error(`not supported provider: ${providerName}`);
        }
    }
}

export default AuthService