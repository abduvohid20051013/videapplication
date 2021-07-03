const videonameInput = $('.videoNameInput');
const fileName = $('.videoInputText');


let user = window.localStorage.getItem('user')
user = user ? JSON.parse(user) : {}

videoUpload.addEventListener('change', () => {
    let file = videoUpload.files[0].name
    file = file.length > 25 ? file.slice(0, 15) + '...' + file.slice(file.length - 5, file.length) : file
    fileName.textContent = "loaded"
})

send.addEventListener('click', async(e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('title', videonameInput.value)
    formData.append('file', videoUpload.files[0])
    formData.append('time', getTime())
    console.log(formData);
    let response = await fetch('/admin', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    if (response) {
        fileName.textContent = response.message
        setTimeout(() => {
            fileName.textContent = 'Upload a video'
        }, 1000)
        videonameInput.value = null
        fileName.textContent = 'Videod loaded'
        setTimeout(() => {
            location.reload();
        }, 1000)
    }

})

function getTime() {
    let date = new Date()
    return date
}

function $(e) {
    return document.querySelector(e)
}


const videosList = document.querySelector('.videosList'),
    profileImg = document.querySelector('.profile'),
    imageVrap = document.querySelector('.imageVrap'),
    avatarText = document.querySelector('.avatarText'),
    image = document.querySelector('.image')





function videosRenderer(array, username, userImg) {
    let string = ""
    array.map(video => {
        string +=
            ` <li class="video">
            <div class="videoWrapper">
               <video controls  src=${'../upload/uploadedVideo/' + video.video_link} type="video/*">
               </video>
            </div>
            <div class="userTextsWrapper">
               <div class="userTextsWrap">
                   <span class="userNameWrap">
                       <img class="userImg" src=${'../upload/uploadedImages/' + video.user.userImg} alt="img">
                      <p class="videoName" data-id=${video.video_id} contenteditable="true">${video.title}</p>
                   </span>
                   <p class="userName">${video.user.username[0].toUpperCase() + video.user.username.slice(1, video.user.username.length)}</p>
              </div>
              <div class="downloadWrap">
                 <a class="download" href="download?link=${video.video_link}">
                    <img src="../public/img/download.svg" alt="download" class="downlodImg" width="30" height="30">
                 </a>
                 <button class="delete" data-id=${video.video_id}>delete</button>
              </div>
           </div>
         </li>`
    })

    videosList.innerHTML = string
    let deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async() => {
            let response = await request(`/videos/${deleteBtn.dataset.id}`, 'DELETE')
            let currentVideos = response.body.filter(video => video.user_id == user.user_id)
            setTimeout(() => {
                location.reload();
            }, 500)
            videosRenderer(currentVideos)

        })
    })
    let videoNames = document.querySelectorAll('.videoName')
    videoNames.forEach(videoName => {
        videoName.addEventListener('keyup', async(event) => {
            console.log(event.keyCode)
            if (event.keyCode == 13) {
                let response = await request(`/videos/${videoName.dataset.id}`, 'PUT', {
                    title: videoName.textContent
                })
                let currentVideos = response.body.filter(video => video.user_id == user.user_id)
                setTimeout(() => {
                    location.reload();
                }, 500)
                videosRenderer(currentVideos)

            }
        })
    })
}

async function getData() {
    let response = await request('/videos')
    let currentVideos = response.filter(video => video.user_id == user.user_id)
    videosRenderer(currentVideos)
}

getData()


function usersRenderer(array) {
    let string =
        `
     <div class="image"  id=${user.user_id}>
         <span class="imgWrap"><img  src=${'../upload/uploadedImages/' + user.userImg} alt="img" width="60" height="60" class="profile"></span>
         <p class="avatarText">${user.username}</p>
     </div>
    `
    imageVrap.innerHTML = string
    const image = document.querySelector('.image')
    if (image.id) {
        let currentUser = array.find(user => user.user_id == image.id)
        videosRenderer(currentUser.videos, currentUser.username, currentUser.userImg)
    } else getData()
}

async function getUsers() {
    let response = await request('/users')
    usersRenderer(response)
}

getUsers()