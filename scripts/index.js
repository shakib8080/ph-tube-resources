const categories = () => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoier(data.categories));
};


const displayCategoier = (categories) => {
//  slect main container
  const categoriesDiv =document.getElementById('button-container')
  // loop oparation on array of Object
  for(cat of categories){
  // create element
   const catdiv = document.createElement('div')
   catdiv.innerHTML = `
    <button id="btn-${cat.category_id}"  onClick="baseOnCategories(${cat.category_id
    })" class="btn btn-sm hover:bg-red-600 hover:text-white ">${cat.category}</button> 
   `
  //  append main container
   categoriesDiv.append(catdiv)
  }
};
categories();

// const api = "https://openapi.programming-hero.com/post" api endpoint
// const api = "https://openapi.programming-hero.com/post?name=shakib" queiry

const loadVideos = (searchText = " ")=>{
  showloader()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(res=>res.json())
  .then(data=>{
    removeActiveclassList()
    const  btnAll = document.getElementById('btn-all').classList.add('active')
    displayVideo(data.videos)
  })
  
}

const displayVideo=(videos)=>{
  const containerSection = document.getElementById('section-container');
  containerSection.innerHTML=""
  if(videos.length === 0){
    containerSection.innerHTML=`
    <div class="col-span-full mx-auto mt-6">
    <img class="mx-auto w-[50%]" src="Icon.png" alt="">
    <h1 class=" text-center text-xl font-bold">Oops!! Sorry, There is no <br>content here</h1>
</div>
    `
    hiddenloader()
    return;
  }
 for(const video of videos){
  // console.log(video)
  // create element 
  const card = document.createElement('div')
  card.innerHTML=`
<div class=" shadow-md   p-2 rounded-lg border-gray-400 ">
      <div><figure class="relative">
        <img class="w-full h-[250px] object-cover rounded-lg" src="${video.thumbnail}" alt="">
        <span class="absolute bottom-1 right-4 text-sm text-white">3hrs 56 min ago</span>
      </figure>
    </div>
      <div class="flex gap-5 items-center space-y-2">
        <div>
            <div class="avatar">
                <div class="w-18 rounded-full">
                  <img  src="${video.authors[0].profile_picture}" />
                </div>
              </div>
        </div>
        <div>
          <h1 class="text-sm font-bold">${video.title}</h1>
          <div class="flex items-center gap-2 >
          <h1 class="text-sm w-full ">${video.authors[0].profile_name}</h1>
          <h1>${video.authors[0].verified === true ? `<img src="Group 3.png" alt=""></`: ``}</h1>
          </div>
          <div><h1>${video.others.views}</h1></div>
        </div>
      </div>
      <button onClick="loadVideoDetails('${video.video_id}')" class="btn btn-block">show details</button>
    </div>
  
  `
  containerSection.append(card)
  hiddenloader()
 }
}



const baseOnCategories=(id)=>{
  showloader()
  const url =`
   https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  //  console.log(url)
   fetch(url)
   .then(res=>res.json())
   .then(data=>{
    displayVideo(data.category)
    removeActiveclassList()
    const onClickbtn = document.getElementById(`btn-${id}`)
    onClickbtn.classList.add('active')
    // console.log(onClickbtn)
   })
}

const removeActiveclassList =()=>{
  const activeClass = document.getElementsByClassName('active')
  for(btn of activeClass){
    btn.classList.remove('active')
  }

}

// set modal 
const loadVideoDetails=(videoDetails)=>{
  const urls = `https://openapi.programming-hero.com/api/phero-tube/video/${videoDetails}`
  fetch(urls)
  .then(res=>res.json())
  .then(data=>displayVideoDetails(data.video))
}


const displayVideoDetails = (video)=>{
document.getElementById('video_details_modal').showModal();
const detailsContainer= document.getElementById('details-container');
console.log(video)
detailsContainer.innerHTML=`
<div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-2xl font-bold">${video.title}</h2>
    <p>${video.description}</p>
    <p class="font-bold text-xl">authors : Shakib</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
`
}

// search
document.getElementById('search-input').addEventListener('keyup',(event)=>{
const input = event.target.value;
loadVideos(input);
 
})

// loader 
const showloader =()=>{
  document.getElementById("loader").classList.remove('hidden');
  document.getElementById('section-container').classList.add('hidden');
}

// hidden loader 
const hiddenloader =()=>{
document.getElementById('loader').classList.add('hidden');
document.getElementById('section-container').classList.remove('hidden');
}