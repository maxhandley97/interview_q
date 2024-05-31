async function fetchData(endpoint) {
    try { // get call the API with preferred endpoint
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
            headers: { 'Accept': 'application/json'}
        })
        // parse the response
        const data = await response.json()
        // sort by name and return 
        return data.sort((a, b) => a.name - b.name)

    } catch (e) {
        console.error('error fetching data', e.message)
    }
    
}


async function countPosts() {
    try {
       // fetch data from both API's
        const postData = await fetchData('posts')
        const userData = await fetchData('users')

        // initialize map of userId : userName
        const userIdToName = {}
        // create a mapping of userId : userName
        for (let user of userData) {
            userIdToName[user.id] = user.name
        }
        // initialize result map 
        postFrequency = {}

        for (let post of postData) {
            // Get the user's name for the current post's userId
            const userName = userIdToName[post.userId]
            
            if (postFrequency[userName]) { // Increment the count for each post
                postFrequency[userName]++
            } else {
                postFrequency[userName] = 1 //  initialize it to 1 if it doesn't exist
            }
        }
        return postFrequency
        

    } catch (e) {
        console.error('error', e.message)
    }
}

countPosts()
.then(postFrequency => console.log(postFrequency))
.catch(e => console.error('error', e.message))