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
                    <button onclick="showDetails('${item.id}'); see_more_modal.showModal();" class="btn bg-cyan-300">Detail</button>
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
    const detailInfo = document.getElementById(`detail-info`);
    detailInfo.innerHTML = `
    <div class="bg-rose-50 w-fit rounded-lg border-2 border-pink-300">
        <h3 class="text-xl font-bold w-96 px-7 py-7">${details.description}</h3>
        <div class="flex items-center justify-center gap-4 px-5 mb-5">
          <div class="flex flex-col items-center justify-center bg-white rounded-lg text-center px-5 h-28 w-28">
            <span class="text-green-500 font-bold">${details.pricing[0].price}</span><br>
            <span class="text-green-500 font-bold">${details.pricing[0].plan}</span>
          </div>
          <div class="flex flex-col items-center justify-center bg-white rounded-lg text-center px-5 h-28 w-28">
            <span class="text-orange-500 font-bold">${details.pricing[1].price}</span><br>
            <span class="text-orange-500 font-bold">${details.pricing[1].plan}</span>
          </div>
          <div class="flex flex-col items-center justify-center bg-white rounded-lg text-center px-5 h-28 w-28">
            <span class="text-red-500 font-bold">Contact us Enterprise</span>
          </div>
        </div>
        <div class="px-7 flex items-start justify-between gap-8 mb-8">
          <div class="w-max">
            <h3 class="text-xl font-bold">Features</h3>
            <li class="w-max">'${details.features[1].feature_name ? details.features[1].feature_name : 'No data Found'}'</li>
            <li class="w-max">'${details.features[2].feature_name ? details.features[1].feature_name : 'No data Found'}'</li>
            <li class="w-max">'${details.features[3].feature_name ? details.features[1].feature_name : 'No data Found'}'</li>
          </div>
          <div class="w-max">
            <h3 class="text-xl font-bold">Integrations</h3>
            <li class="w-max">${details.integrations[0] ? details.integrations[0] : 'No data Found'}</li>
            <li class="w-max">${details.integrations[1] ? details.integrations[1] : 'No data Found'}</li>
            <li class="w-max">${details.integrations[2] ? details.integrations[2] : 'No data Found'}</li>
          </div>
        </div>
    </div>
    <div class="w-fit rounded-lg border-2">
      <div class="text-center m-6">
        <img class="rounded-lg" src="${details?.image_link[0] || details.image_link[1]}" alt="">
      </div>
      <h3 class="text-center font-bold text-xl">${details.input_output_examples[0].input || details.input_output_examples[1].input}</h3>
      <p class="text-center w-4/5 mx-auto m-5">${details.input_output_examples[0].output || details.input_output_examples[1].output}</p>
    </div>
    `;
}

loadFeatures();