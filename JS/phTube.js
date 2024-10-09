// Set time function

function setTime (time){
    const hour = parseInt(time / 3600);
    let remainingTime = time % 3600;
    const mnt = parseInt(remainingTime / 60)
    remainingTime = parseInt(remainingTime / 60)

    return `${hour} h ${mnt} m ${remainingTime} s `;
}



// Load Category Function
const loadCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        displayCategory(data.categories);
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}


// Load All Video function
const loadAllVideo = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        display(data.videos);
    } catch (error) {
        console.error('Failed to load videos:', error);
    }
}
// Load Category Video function
const loadCategoriesVideo = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        display(data.category);
       
    } catch (error) {
        console.error('Failed to load videos:', error);
    }
}

// Display Category function
const displayCategory = (categories) => {
    const categoryBtn = document.getElementById('Category');
    categories.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="loadCategoriesVideo(${item.category_id})" class="text-xl bg-blue-500 text-gray-200 rounded-xl px-4 py-2">${item.category}</button>
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
            <div class="card bg-base-100 m-2 rounded-lg shadow-lg">
                <figure class="relative">
                    <img class="rounded-lg h-[200px] w-full object-cover" src="${videoItem.thumbnail}" alt="Thumbnail Image" />
                    ${videoItem.others.posted_date?.length == 0 ? "" :` <span class="absolute right-2 bottom-2 bg-black text-white px-2 rounded">${setTime (videoItem.others.posted_date)}</span>`}
                   
                </figure>
                <div class="card-body flex flex-row gap-4">
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
            </div>
            
        `;
        displayVideos.append(div);
    });
}

// Globally function call
loadCategory();
loadAllVideo();
