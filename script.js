const btn = document.querySelector('.btn')
const comments = document.querySelector('.commentsTable')
const filterComments = document.querySelector('.filterCommentsTable')
const getData = (url) => 
  new Promise ((resolve, reject) => 
    fetch(url)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error))
)

getData('http://localhost:3000/USERS')
  .then(data => console.log(data))
  .catch(error => console.log(error.message))

btn.addEventListener('click', async () => {
    let info = await getData('http://localhost:3000/USERS')
    info.forEach(el => {
        comments.insertAdjacentHTML(`beforeend`, `
        <div class="comment">
            <h3>${el.name}</h3>
            <p>${el.comment}</p>
        </div>`
        )

        if (el.comment.length >= 20){
            let cutComment = el.comment.slice(0, 20) + '...';
            filterComments.insertAdjacentHTML(`beforeend`, `
        <div class="comment">
            <h3>${el.name}</h3>
            <p>${cutComment}</p>
        </div>`
        )}
        else {
            filterComments.insertAdjacentHTML(`beforeend`, `
        <div class="comment">
            <h3>${el.name}</h3>
            <p>${el.comment}</p>
        </div>`
        )}
        
    })
})   
    