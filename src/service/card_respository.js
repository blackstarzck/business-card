import { firebaseDatabase } from "./firebase"

class CardRepository {
    syncCard(userId, onUpdate){ // 파이어베이스 문서 -> 실시간 데이터베이스 -> 데이터 읽기 및 쓰기
        const ref = firebaseDatabase.ref(`${userId}/cards`);

        ref.on("value", snapshot => {
            const value = snapshot.val();
            value && onUpdate(value);
        });
        return () => ref.off();
    }

    saveCard(userId, card){
        console.log("%csaveCard", "color: chocolate");
        // console.log("userId: ", userId);
        // console.log("card: ", card);

        firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
    }

    removeCard(userId, card){
        console.log("%cremoveCard", "color: burlywood");
        // console.log("userId: ", userId);
        // console.log("card: ", card);
        
        firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
    }
}

export default CardRepository;