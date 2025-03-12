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
    console.log(cat)
  // create element
   const catdiv = document.createElement('div')
   catdiv.innerHTML = `
    <button  onClick="baseOnCategories(${cat.category_id
    })" class="btn btn-sm hover:bg-red-600 hover:text-white ">${cat.category}</button> 
   `
  //  append main container
   categoriesDiv.append(catdiv)
  }
};
categories();



const loadVideos = ()=>{
  fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res=>res.json())
  .then(data=>displayVideo(data.videos))
  
}

const displayVideo=(videos)=>{
  const containerSection = document.getElementById('section-container');
  containerSection.innerHTML=""
 for(const video of videos){
  // console.log(video)
  // create element 
  const card = document.createElement('div')
  card.innerHTML=`
<div class=" shadow-md   p-2 rounded-lg border-gray-400 space-y-4">
      <div><figure class="relative">
        <img class="w-full h-[200px] object-cover rounded-lg" src="${video.thumbnail}" alt="">
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
          <h1 class="text-xl font-bold">${video.title}</h1>
          <div class="flex gap-2"><h1 class="text-sm">${video.authors[0].profile_name}</h1><img src="Group 3.png" alt=""></div>
          <div><h1>${video.others.views}</h1></div>
        </div>
      </div>
    </div>
  
  `
  containerSection.append(card)
 }
}



const baseOnCategories=(id)=>{
  const url =`
   https://openapi.programming-hero.com/api/phero-tube/category/${id}`
   console.log(url)
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayVideo(data.category))
}
