const loadFeatures = async () =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    const items = data.data.tools;
    // console.log(items);
    displayItems(items);
}

const displayItems = (items) =>{
    const itemsContainer = document.getElementById(`items-container`);
    itemsContainer.textContent = '';
    items = items.slice(0,6);
    items.forEach(item =>{
        // console.log(item);
        const div = document.createElement(`div`);
        div.classList = `card card-compact w-fit xl:w-96 xl:mx-auto bg-base-100 shadow-xl`;
        div.innerHTML = `
            <figure><img src="${item.image ? item.image:''}"/></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ul>
                  <li>1. ${item.features[0]}</li>
                  <li>2. ${item.features[1]}</li>
                  <li>3. ${item.features[2]}</li> 
                </ul>
                <div class="border-t-2 pt-5">
                <h2 class="card-title">${item.name}</h2>
                <p class="flex items-center justify-start gap-2"><img src="./images/frame.svg" /> ${item.published_in}
                </div>
                <div class="card-actions justify-end">
                    <button class="btn bg-cyan-300">Detail</button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(div);
    });
}

const seeMore = () =>{
    
}



loadFeatures();