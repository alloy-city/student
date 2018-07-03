import { get } from '../http'
import formatProductDetail from './format-product-detail'

function view (_id) {
    get(`product/${_id}`, res => {
        formatProductDetail(res)
    })
}

export { view }