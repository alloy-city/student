import { get, post } from '../http';
import { getCourses } from './index';

export default (_id, price, title) => {
    if (Auth.userData.messages && Auth.userData.messages.length > 0){
        for (let i = 0; i < Auth.userData.messages.length; i++){
            if (Auth.userData.messages[i].type == "product_suggestion"){
                if (Auth.userData.messages[i].message == _id){
                    post({
                        message_id: Auth.userData.messages[i]._id,
                        timestamp: new Date()
                    }, "message/consume", res => {
                        /// #if DEBUG
                        console.log(res)
                        /// #endif

                        if (res.message == "Message acknowledged."){
                            console.log(res.message_id)
                            document.getElementById(res.message_id).remove()
                        }
                    })
                    Auth.userData.messages.splice(i, 1)
                    break
                }
            }
        }
    }

    let agreements = document.getElementById("agreements-accepted")

    if (agreements.checked){
        Payment.cart.add(_id, price, title);
        let courses = getCourses();
        if (courses.length) {
            for (let i=0; i<courses.length; i++) {
                get(`cslc/sign/${courses[i]._id}`, res => {console.log(res)});
            }
        }
    } else {
        alert(string.productDetail.termsNotAccespted)
    }
}
