
let users = JSON.parse(localStorage.getItem("users")) || []

let signupMode = false



function validateEmail(email){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

}



function validateUsername(username){

return /^[a-zA-Z0-9]{4,}$/.test(username)

}



function validatePassword(password){

return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/.test(password)

}



/* password strength */

function strengthMeter(password){

let bar=document.getElementById("strengthBar")

let strength=0


if(password.length>5) strength++

if(/[A-Z]/.test(password)) strength++

if(/[0-9]/.test(password)) strength++

if(/[@$!%*?&]/.test(password)) strength++


bar.style.width=(strength*25)+"%"

}



/* show password */

function togglePassword(){

let p=document.getElementById("password")

p.type=p.type==="password"?"text":"password"

}



/* switch login/signup */

function switchMode(){

signupMode=!signupMode


document.getElementById("formTitle").innerText=

signupMode?"Signup":"Login"


document.getElementById("confirmDiv").style.display=

signupMode?"block":"none"

}



/* messages */

function showMsg(msg,color="red"){

let m=document.getElementById("loginMsg")

m.innerText=msg

m.style.color=color

}



/* auth logic */

function handleAuth(){

let email=document.getElementById("email").value

let username=document.getElementById("username").value

let password=document.getElementById("password").value

let confirm=document.getElementById("confirmPassword").value

let remember=document.getElementById("remember").checked


strengthMeter(password)


if(!validateEmail(email)){

showMsg("Invalid Email")

return

}


if(!validateUsername(username)){

showMsg("Username must be 4+ letters or numbers")

return

}


if(!validatePassword(password)){

showMsg("Password must contain uppercase, lowercase, number & symbol")

return

}



/* signup */

if(signupMode){


if(password!==confirm){

showMsg("Passwords do not match")

return

}


if(users.find(u=>u.username===username)){

showMsg("Username already exists")

return

}


users.push({email,username,password})

localStorage.setItem("users",JSON.stringify(users))


showMsg("Signup successful","lime")

return

}



/* login */

let user = users.find(

u=>u.username===username && u.password===password

)


if(!user){

showMsg("Invalid login")

return

}


loginSuccess(username,remember)

}



/* login success */

function loginSuccess(username,remember){

if(remember){

localStorage.setItem("sessionUser",username)

}


showMain(username)

}



/* show home */

function showMain(username){

document.getElementById("authPage").style.display="none"

document.getElementById("mainPage").style.display="block"

document.getElementById("welcomeUser").innerText=

"Hello "+username

}


let profiles = JSON.parse(localStorage.getItem("profiles")) || []



function addProfile(){

let name=document.getElementById("name").value

let offer=document.getElementById("offer").value.toLowerCase()

let want=document.getElementById("want").value.toLowerCase()

let category=document.getElementById("category").value

let level=document.getElementById("level").value

let photoInput=document.getElementById("photo")

let bio = document.getElementById("bio").value

let availability = document.getElementById("availability").value

let mode = document.getElementById("mode").value

let portfolio = document.getElementById("portfolio").value


if(name==""||offer==""||want==""){

alert("Fill all fields")

return

}


let reader=new FileReader()


reader.onload=function(){


let profile={

name,

offer,

want,

category,

level,

bio,

availability,

mode,

portfolio,

photo:reader.result

}


profiles.push(profile)

localStorage.setItem("profiles",JSON.stringify(profiles))


showProfiles()

findMatches()

}


if(photoInput.files[0]){

reader.readAsDataURL(photoInput.files[0])

}else{

reader.onload()

}

}



function showProfiles(){

let output=document.getElementById("output")

output.innerHTML=""


profiles.forEach(p=>{


output.innerHTML+=`

<div class="card">

<img src="${p.photo || 'https://via.placeholder.com/70'}">

<h3>${p.name}</h3>

<div class="tag">${p.category}</div>

<div class="tag">${p.level}</div>

<div class="stars">

⭐⭐⭐⭐☆

</div>

<p>Offers: ${p.offer}</p>

<p>Wants: ${p.want}</p>

<p>${p.bio}</p>


<p>Availability: ${p.availability}</p>

<p>Mode: ${p.mode}</p>


<a href="${p.portfolio}" target="_blank">

Portfolio

</a>

<button onclick="viewProfile(${i})">

View

</button>


<button onclick="editProfile(${i})">

Edit

</button>


<button onclick="deleteProfile(${i})">

Delete

</button>

</div>

`

})


}



/* search */

function searchSkill(){

let value=document.getElementById("search").value.toLowerCase()

let cards=document.getElementsByClassName("card")


for(let c of cards){

c.style.display=

c.innerText.toLowerCase().includes(value)

?"block":"none"

}

}



/* filter */

function filterCategory(){

let cat=document.getElementById("filterCategory").value

let cards=document.getElementsByClassName("card")


for(let c of cards){

c.style.display=

cat==""||c.innerText.includes(cat)

?"block":"none"

}

}



/* matching algorithm */

function findMatches(){

let matchesDiv=document.getElementById("matches")

matchesDiv.innerHTML=""


for(let a of profiles){

for(let b of profiles){

if(

a!=b &&

a.offer==b.want &&

a.want==b.offer

){

matchesDiv.innerHTML+=`

<div class="card">

<h3>Perfect Match</h3>

<p>${a.name} ↔ ${b.name}</p>

</div>

`

}

}

}

}



showProfiles()

findMatches()

/* logout */

function logout(){

localStorage.removeItem("sessionUser")

location.reload()

}



/* auto login */

let sessionUser=localStorage.getItem("sessionUser")

if(sessionUser){

showMain(sessionUser)

}



/* live strength */

document.getElementById("password")

.addEventListener("input",(e)=>{

strengthMeter(e.target.value)

})


function addProfile(){

let name=document.getElementById("name").value

let offer=document.getElementById("offer").value

let want=document.getElementById("want").value

let category=document.getElementById("category").value

let level=document.getElementById("level").value


profiles.push({name,offer,want,category,level})

localStorage.setItem("profiles",JSON.stringify(profiles))


showProfiles()

findMatches()

}



function showProfiles(){

let output = document.getElementById("output")

if(!output) return

output.innerHTML = ""


profiles.forEach((p,i)=>{


output.innerHTML += `

<div class="card">

<div class="verified">✔</div>

<h3>${p.name}</h3>

<div class="tag">${p.category}</div>

<div class="tag">${p.level}</div>

<div class="stars">⭐⭐⭐⭐☆</div>

<p><b>Offers:</b> ${p.offer}</p>

<p><b>Wants:</b> ${p.want}</p>

<p>${p.bio || ""}</p>

<button onclick="viewProfile(${i})">View</button>

<button onclick="editProfile(${i})">Edit</button>

<button onclick="deleteProfile(${i})">Delete</button>

</div>

`

})

}



function deleteProfile(i){

profiles.splice(i,1)

localStorage.setItem("profiles",JSON.stringify(profiles))

showProfiles()

}



function searchSkill(){

let v=document.getElementById("search").value.toLowerCase()

let cards=document.getElementsByClassName("card")


for(let c of cards){

c.style.display=c.innerText.toLowerCase().includes(v)?"block":"none"

}

}



function filterCategory(){

let v=document.getElementById("filterCategory").value

let cards=document.getElementsByClassName("card")


for(let c of cards){

c.style.display=v==""||c.innerText.includes(v)?"block":"none"

}

}



function findMatches(){

let matches=document.getElementById("matches")

matches.innerHTML=""


for(let a of profiles){

for(let b of profiles){

if(a!=b && a.offer==b.want){

matches.innerHTML+=`

<div class="card">

${a.name} matches ${b.name}

</div>

`

}

}

}

}



/* chat demo */

function sendMessage(){

let input=document.getElementById("chatInput")

let msg=document.getElementById("chatMessages")


msg.innerHTML+=`<p>${input.value}</p>`


input.value=""

}



showProfiles()

findMatches()

/* scroll reveal FIX */

let sections=document.querySelectorAll("section")

sections.forEach(sec=>{

sec.classList.add("hidden")

})



function reveal(){

sections.forEach(sec=>{

let position=sec.getBoundingClientRect().top

let screenPosition=window.innerHeight/1.2


if(position<screenPosition){

sec.classList.add("show")

}

})

}


window.addEventListener("scroll",reveal)

reveal()


/* counter animation */

let counters=document.querySelectorAll(".counter h2")

counters.forEach(counter=>{

let update=()=>{

let target=+counter.getAttribute("data-target")

let c=+counter.innerText

let inc=target/100


if(c<target){

counter.innerText=Math.ceil(c+inc)

setTimeout(update,20)

}else{

counter.innerText=target

}

}

update()

})



/* 3D tilt */

document.querySelectorAll(".info-card")

.forEach(card=>{

card.addEventListener("mousemove",e=>{

let x=e.offsetX

let y=e.offsetY


let rotateX=(y-100)/10

let rotateY=(x-100)/10


card.style.transform=

`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

})


card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"

})

})

function scrollTopBtn(){

document.documentElement.scrollTo({

top:0,

behavior:"smooth"

})

}


let progressBtn = document.getElementById("progressBtn")

let progressCircle = document.querySelector(".progress-ring circle")

let circumference = 2 * Math.PI * 26

progressCircle.style.strokeDasharray = circumference



window.addEventListener("scroll",()=>{

let scrollTop = document.documentElement.scrollTop

let height = document.documentElement.scrollHeight - document.documentElement.clientHeight

let progress = scrollTop / height


progressCircle.style.strokeDashoffset =

circumference - progress * circumference



if(scrollTop>200){

progressBtn.classList.add("show")

}else{

progressBtn.classList.remove("show")

}

})



progressBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

})

})


function viewProfile(i){

let p = profiles[i]

document.getElementById("profileModal").style.display = "flex"

document.getElementById("modalBody").innerHTML = `

<h2>${p.name}</h2>

<p><b>Offers:</b> ${p.offer}</p>

<p><b>Wants:</b> ${p.want}</p>

<p>${p.bio || ""}</p>

<p>${p.availability || ""}</p>

<p>${p.mode || ""}</p>

<a href="${p.portfolio || "#"}" target="_blank">Portfolio</a>

`

}


function closeModal(){

document.getElementById("profileModal").style.display = "none"

}



function editProfile(i){

let p = profiles[i]

document.getElementById("name").value = p.name

document.getElementById("offer").value = p.offer

document.getElementById("want").value = p.want

document.getElementById("bio").value = p.bio

document.getElementById("availability").value = p.availability

document.getElementById("mode").value = p.mode

document.getElementById("portfolio").value = p.portfolio


profiles.splice(i,1)

localStorage.setItem("profiles", JSON.stringify(profiles))

showProfiles()

}



function closeModal(){

document.getElementById("profileModal")

.style.display="none"

}


function editProfile(i){

let p=profiles[i]


document.getElementById("name").value=p.name

document.getElementById("offer").value=p.offer

document.getElementById("want").value=p.want

document.getElementById("bio").value=p.bio

document.getElementById("availability").value=p.availability

document.getElementById("mode").value=p.mode

document.getElementById("portfolio").value=p.portfolio


profiles.splice(i,1)

}


let sharedPosts = []


function shareSkill(){

let text = document.getElementById("skillPost").value

let link = document.getElementById("meetingLink").value


let post = {

text,

link

}


sharedPosts.push(post)


displayShared()


}



function displayShared(){

let div = document.getElementById("sharedContent")

div.innerHTML=""


sharedPosts.forEach(p=>{


div.innerHTML += `

<div class="shared-card">

<p>${p.text}</p>


<a href="${p.link}" target="_blank">

Join Session

</a>

</div>

`

})


}


/* progress tracker */

function updateProgress(){

let checks = document.querySelectorAll(".lesson-list input")

let checked = document.querySelectorAll(".lesson-list input:checked")


let percent = (checked.length/checks.length)*100


document.getElementById("progressBar").style.width = percent+"%"


document.getElementById("progressText").innerText =

Math.round(percent)+"% completed"

}



/* certificate */

function generateCertificate(){

let percentText = document.getElementById("progressText").innerText


if(percentText !== "100% completed"){

alert("Complete all lessons first")

return

}


document.getElementById("certificateBox").innerHTML =

`

<h2>Certificate</h2>


<p>

Congratulations 🎉

You completed this skill successfully.

</p>


<p>

SkillSwap Learning System

</p>

`

}


function loadVideo(){

let link = document.getElementById("videoLink").value


let embed = link.replace("watch?v=","embed/")


document.getElementById("videoFrame").src = embed

}

document.addEventListener("DOMContentLoaded",()=>{

let counters = document.querySelectorAll(".counter")
let started = false

window.addEventListener("scroll",()=>{

let section = document.querySelector(".stats-advanced")

if(!section) return

if(started) return

let position = section.getBoundingClientRect().top

if(position < window.innerHeight - 100){

started = true

counters.forEach(counter=>{

let target = +counter.getAttribute("data-target")
let count = 0

let update = ()=>{

let increment = target / 100

if(count < target){

count += increment
counter.innerText = Math.ceil(count)

setTimeout(update,20)

}else{

counter.innerText = target + "+"

}

}

update()

})

}

})

})

