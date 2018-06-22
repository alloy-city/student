import { post } from '../http'

function saveXpEntry(id) {
    /// #if DEBUG
    // console.log(id)
    /// #endif
    
    var body = {
        user: Auth.userData._id,
        resource: id,
        multiplier: 1
    }
    
    post(body, "xp/entry", res => {
        /// #if DEBUG
        // console.log(res)
        /// #endif

        if (res.status == "previous success") {
            /// #if DEBUG
            // console.log('active-resources:22', res.msg);
            /// #endif

            notify(string.activeResources.previousSuccess, 'info', false);
        } else if (res.status == "success") {
            /// #if DEBUG
            // console.log('active-resources:23', res.msg);
            /// #endif
            notify(string.activeResources.success, 'info', false);
            Student.UserDisplay.updateXp(res.value)
        }
    })
}

export { saveXpEntry }