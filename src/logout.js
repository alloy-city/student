export function logout(){

    signOut()
    localStorage.clear()
    location.reload(false)
}