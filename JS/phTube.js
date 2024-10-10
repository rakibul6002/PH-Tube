// Set time function

function setTime (time){
    const hour = parseInt(time / 3600);
    let remainingTime = time % 3600;
    const mnt = parseInt(remainingTime / 60);
    remainingTime = parseInt(remainingTime / 60);

    return `${hour}:${mnt}:${remainingTime} `;
};

// Remove Active button function

const removeActiveBtn = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let button of buttons){
        button.classList.remove('bg-red-500');
        button.classList.add('bg-gray-800');
    };
   
};


// Load Category Function
const loadCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        displayCategory(data.categories);
    } catch (error) {
        console.error('Failed to load categories:', error);
    };
};

// Load All Video function
const loadAllVideo = async (searchInpt = "") => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInpt}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        display(data.videos);
    } catch (error) {
        console.error('Failed to load videos:', error);
    }
};
// Load Category Video function
const loadCategoriesVideo = async (id) => {
    const activeBtn = document.getElementById(`btn-${id}`);
    removeActiveBtn()
    activeBtn.classList.remove('bg-gray-800');
    activeBtn.classList.add('bg-red-500');
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        display(data.category);
       
    } catch (error) {
        console.error('Failed to load videos:', error);
    }
}
// Load Video details function
const loadDetails = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        displayDetails(data.video);
        
    } catch (error) {
        console.error('Failed to load videos:', error);
    }
}

// Display details function
const displayDetails = (video) => {
    
    const modal = document.getElementById('modalcontent');
    document.getElementById('customModal').showModal();
    modal.innerHTML=
    `
        <div class="relative">
            <img
                class=" rounded-lg"
                src="${video.thumbnail}"
            />
            ${video.others.posted_date?.length == 0 ? "" :` <span class="absolute right-2 bottom-2 bg-black text-white px-2 rounded">${setTime (video.others.posted_date)}</span>`}
        </div>
        <div class="card-body flex flex-row gap-4 px-2">
                    <div>
                        <img class="rounded-full w-10 h-10 object-cover" src="${video.authors[0].profile_picture}" alt="User Image" />
                    </div>
                    <div>
                        <h1 class="font-bold">${video.title || "Not Available"}</h1>
                        <div class=" flex items-center gap-3 text-gray-500 >
                            <h2 class="text-xs ">${video.authors[0].profile_name || "Not Available"}</h2>
                            ${video.authors[0].verified === true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>`:`<p class="text-xs"></p>`}
                
                        </div>
                        <p class="text-xs text-gray-500">${video.others.views || "Not Available"} views</p>
                        
                    </div>
                    
    </div>
    <hr>
    <h2 class="text-2xl font-bold">Video details</h2>
    <p>${video.description}</p>
    `
}
// Display Category function
const displayCategory = (categories) => {
    const categoryBtn = document.getElementById('Category');
    categories.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class=" category-btn text-xl bg-gray-800 hover:bg-gray-200 hover:text-gray-700 text-gray-200 rounded-xl px-4 py-2">${item.category}</button>
        `;
        categoryBtn.append(div);
    });
};

// Display Video function
const display = (videos) => {
    const displayVideos = document.getElementById('displayVideo');
    displayVideos.innerHTML = "";

    if(videos.length === 0){
        displayVideos.classList.remove('grid');
        displayVideos.innerHTML = 
        `
            <div class=" h-[300px]  flex flex-col gap-5 bg-gray-400 items-center justify-center rounded-lg">
                    <img
                    
                    src="./Images/Icon.png"
                    />
                    <h2 class="text-center text-2xl font-bold">
                        SORRY!
                    </h2>
                    <h2 class="text-center text-xl font-bold">
                        No content in this category.
                    </h2>
            </div>
        `;
        return;
    }else{
        displayVideos.classList.add('grid');
    }

    videos.forEach((videoItem) => {
        
        
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 m-2 md:h-[350px] rounded-lg shadow-lg">
                <figure class="relative">
                    <img class="rounded-lg md:h-[200px] w-full object-cover" src="${videoItem.thumbnail}" alt="Thumbnail Image" />
                    ${videoItem.others.posted_date?.length == 0 ? "" :` <span class="absolute right-2 bottom-2 bg-black text-white px-2 rounded">${setTime (videoItem.others.posted_date)}</span>`}
                   
                </figure>
                <div class="card-body flex flex-row gap-4 px-2">
                    <div>
                        <img class="rounded-full w-10 h-10 object-cover" src="${videoItem.authors[0].profile_picture}" alt="User Image" />
                    </div>
                    <div>
                        <h1 class="font-bold">${videoItem.title || "Not Available"}</h1>
                        <div class=" flex items-center gap-3 text-gray-500 >
                            <h2 class="text-xs ">${videoItem.authors[0].profile_name || "Not Available"}</h2>
                            ${videoItem.authors[0].verified === true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>`:`<p class="text-xs"></p>`}
                
                        </div>
                        <p class="text-xs text-gray-500">${videoItem.others.views || "Not Available"} views</p>
                        
                    </div>
                    
                </div>
                <button onclick="loadDetails('${videoItem.video_id}')" class="text-xl bg-gray-800 hover:bg-gray-200 hover:text-gray-700 text-gray-200 rounded-xl px-4 py-2 w-24 mx-auto mb-4 ">Details</button>
            </div>
            
        `;
        displayVideos.append(div);
    });
}
// Search Function
document.getElementById('searchInpt').addEventListener("keyup", (e)=>{
    loadAllVideo(e.target.value);
    
})
// Globally function call
loadCategory();
loadAllVideo();
