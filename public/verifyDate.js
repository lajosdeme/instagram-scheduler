document.getElementById('postDate').addEventListener('change', event => {
    const dateStr = `${event.target.value}`
    const date = new Date(dateStr)
    const now = new Date()
    if (date <= now) {
        alert('Date must be in the future.')
    }
})

function validateForm() {
    const dateStr = `${document.forms["ig-form"]["postDate"].value}`
    const date = new Date(dateStr)
    const now = new Date()
    // if (date <= now) {
    //    alert('Date must be in the future.') 
    //    return false
    // }
    return true
}
