// Handle fetch with async/await
async function getUser() {
    const response = await fetch('https://api.github.com/users/octocat')
    const data = await response.json()

    console.log(data)
}

console.log(getUser())
// Execute async function
// getUser()

getUser().then((response) => console.log(response))
