let elBox = document.querySelector(".lists")
let elUser = document.querySelector(".user")
let userTemp = document.querySelector(".user__template")
let elPost = document.querySelector(".post")
let postTemp = document.querySelector(".post__template")
let elComment = document.querySelector(".comment")
let commentTemp = document.querySelector(".comment__template")
let elItem =document.querySelector(".user__item")

let countUserId = []


function renUser(arr,node) {
	let elFragmentUser = document.createDocumentFragment()
	
	arr.forEach(elUser =>{
		let userTempl = userTemp.content.cloneNode(true)
		countUserId.push(elUser.id)
		
		userTempl.querySelector(".user__username").textContent = elUser.username
		userTempl.querySelector(".info__name").textContent = elUser.name
		userTempl.querySelector(".info__id").textContent = elUser.id
		userTempl.querySelector(".user__street").textContent = elUser.address.street
		userTempl.querySelector(".user__suite").textContent = elUser.address.suite
		userTempl.querySelector(".user__city").textContent = elUser.address.city
		userTempl.querySelector(".user__zipcode").textContent = elUser.address.zipcode
		userTempl.querySelector(".user__company-name").textContent = elUser.company.name
		userTempl.querySelector(".user__company-catchPhrase").textContent = elUser.company.catchPhrase
		userTempl.querySelector(".user__company-bs").textContent = elUser.company.bs
		userTempl.querySelector(".user__phone").textContent = elUser.phone
		userTempl.querySelector(".user__phone").href = `tel:${elUser.phone}`
		userTempl.querySelector(".user__geo").textContent = "geo"
		userTempl.querySelector(".user__geo").href = `https://www.google.com/maps/place/${elUser.address.geo.lat},${elUser.address.geo.lng}`
		userTempl.querySelector(".user__website").textContent = "website"
		userTempl.querySelector(".user__website").href = `https://${elUser.website}`
		userTempl.querySelector(".user__email").textContent = elUser.email
		userTempl.querySelector(".user__email").href = `mailto:${elUser.email}`
		userTempl.querySelector(".user__item").dataset.id = elUser.id
		
		elFragmentUser.appendChild(userTempl)
	})
	node.appendChild(elFragmentUser)
}

async function getUser(){
	let resUser = await fetch(`https://jsonplaceholder.typicode.com/users`)
	let dataUser = await resUser.json()
	renUser(dataUser,elUser)
}
getUser()



let countPostId = []


// console.log(countPostId);

let renPost = function(arrP,node) {
	node.innerHTML = ""
	
	let elFragmentPost = document.createDocumentFragment()
	
	arrP.forEach(elPost => {
		
		countPostId.push(elPost.id)
		let postTempl = postTemp.content.cloneNode(true)
		// console.log(postTempl);
		postTempl.querySelector(".post__title").textContent = elPost.title;
		postTempl.querySelector(".post__body").textContent = elPost.body;
		postTempl.querySelector(".post__item").dataset.id = elPost.id
		elFragmentPost.appendChild(postTempl)
	})
	node.appendChild(elFragmentPost)
	// console.log(node);
}


async function getPost(userId) {
	let resPost = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
	let dataPost = await resPost.json()
	renPost(dataPost, elPost)
}



elUser.addEventListener("click", function(evt){
	elComment.innerHTML = ""
	if(evt.target.matches(".user__item")) {
		let userItemId = evt.target.dataset.id - 0 
		countUserId.forEach((userId) => {
			if (userItemId === userId){
				getPost(userId)
			}
		})
	} 
})



let renComment = function(arrCom, node) {
// console.log(arrCom);
	let elFragmentCom = document.createDocumentFragment()
	node.innerHTML = ""
	arrCom.forEach(elCom => {

		// console.log(elCom);
		let comTempl = commentTemp.content.cloneNode(true)
		console.log(elCom.name);
		comTempl.querySelector(".comment__name").textContent = elCom.name
		comTempl.querySelector(".comment__email").textContent = elCom.email
		comTempl.querySelector(".comment__body").textContent = elCom.body
		elFragmentCom.appendChild(comTempl)
	})
	node.appendChild(elFragmentCom)
}

async function getCommit(postId) {
	let resCom = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
	let dataCom = await resCom.json()
	console.log(dataCom);
	renComment(dataCom, elComment)
}

elPost.addEventListener("click", function(evt) {
	if(evt.target.matches(".post__item")) {
		let userPostId = evt.target.dataset.id - 0
		countPostId.forEach(postIdCom => {
			if (userPostId === postIdCom) {
				getCommit(postIdCom)
			}
		})
	}
})