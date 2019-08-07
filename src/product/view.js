import { get } from '../http';
import formatProductDetail from './format-product-detail';

function view (_id) {
    get(`product/${_id}`, res => {
        /// #if DEBUG
        console.log(res);
        /// #endif

        if (res && res.courses && res.courses.length) {
            for (let i=0; i<res.courses.length; i++) {
                get(`cslc/interest/${res.courses[i]._id}`);
            }
        } else if (res && res.hangouts) {
            get(`cslc/interest/${res._id}`);
        }

        formatProductDetail(res);
    });
}

export { view }
