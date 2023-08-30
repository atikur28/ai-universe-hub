const loadFeatures = async (seeMore) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    const items = data.data.tools;
    // console.log(items);
    displayItems(items, seeMore);
}

const displayItems = (items, seeMore) =>{
    const itemsContainer = document.getElementById(`items-container`);
    itemsContainer.textContent = '';
    const seeMoreContainer = document.getElementById('see-more');
    // console.log('Seeing', seeMore);
    if(!seeMore){
        items = items.slice(0,6);
        seeMoreContainer.classList.remove('hidden');
    }
    else{
        seeMoreContainer.classList.add('hidden');
    }
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
                    <button onclick="showDetails('${item.id}'); see_more_modal.showModal()" class="btn bg-cyan-300">Detail</button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(div);
    });
}

const seeMore = () =>{
    loadFeatures(true);
}

const showDetails = async (id) =>{
    // console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await response.json();
    const details = data.data;
    // console.log(data);
    featureDetails(details);
}

const featureDetails = (details) =>{
    console.log(details);
    
    see_more_modal.showModal();
}

loadFeatures();