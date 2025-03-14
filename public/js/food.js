function showSlider(dish) {
    const slider = document.getElementById('slider');
    slider.classList.add('active');

    let title, description, place, reason, imgSrc;

    switch (dish) {
        case 'pakhala':
            title = "Pakhala Bhata";
            description = "A refreshing dish made by fermenting cooked rice in water, often served with fried fish, vegetables, or curd.";
            place = "Across Odisha, especially in rural areas";
            reason = "Known for its cooling properties, it’s a summer staple and celebrated during Pakhala Dibasa.";
            imgSrc = "https://www.culturebook.in/wp-content/uploads/2024/10/Pakhala-Bhata.jpg";
            break;
        case 'chhena':
            title = "Chhena Poda";
            description = "A baked dessert made from cottage cheese (chhena), sugar, and nuts, with a caramelized crust.";
            place = "Nayagarh";
            reason = "Famous for its unique smoky flavor and is considered Odisha’s signature sweet.";
            imgSrc = "https://anotherglobaleater.wordpress.com/wp-content/uploads/2023/04/chhenapoda.jpg?w=1200";
            break;
        case 'dalma':
            title = "Dalma";
            description = "A wholesome lentil and vegetable stew, minimally spiced to highlight natural flavors.";
            place = "Puri and statewide";
            reason = "A staple in Odia households and temple kitchens, symbolizing simplicity and nutrition.";
            imgSrc = "https://img.freepik.com/premium-photo/traditional-odisha-dalma-lentil-vegetable-stew_167857-54465.jpg";
            break;
        case 'macha':
            title = "Macha Ghanta";
            description = "A flavorful fish curry made with freshwater fish, potatoes, and aromatic spices.";
            place = "Coastal Odisha, especially Bhubaneswar";
            reason = "Celebrated for its rich taste and connection to Odisha’s coastal cuisine.";
            imgSrc = "https://www.triphippies.com/wp-content/uploads/2023/06/Macha-ghanta.webp";
            break;
        case 'rasabali':
            title = "Rasabali";
            description = "Deep-fried chhena patties soaked in thickened, sweetened milk flavored with cardamom.";
            place = "Kendrapara, especially Baladevjew Temple";
            reason = "A divine sweet offered as prasad, loved for its melt-in-mouth texture.";
            imgSrc = "https://static.toiimg.com/thumb/imgsize-23456,msid-78277406,width-600,resizemode-4/78277406.jpg";
            break;
        case 'kanika':
            title = "Kanika";
            description = "A sweet pulao made with rice, ghee, sugar, and dry fruits, often flavored with saffron.";
            place = "Puri, Jagannath Temple";
            reason = "Served as part of the temple’s Mahaprasad, symbolizing festivity.";
            imgSrc = "https://www.freeindianrecipes.com/wp-content/uploads/Kanika.jpg";
            break;
        case 'chungdi':
            title = "Chungdi Malai";
            description = "A creamy prawn curry cooked with coconut milk and mild spices.";
            place = "Coastal Odisha, especially Paradip";
            reason = "Famous for its rich, velvety texture and seafood excellence.";
            imgSrc = "https://assets.bonappetit.com/photos/5f8f021c61c21dbbfbb529eb/16:9/w_2288,h_1287,c_limit/_Shrimp-Curry-Lede.jpg";
            break;
        case 'pitha':
            title = "Pitha";
            description = "Steamed or fried dumplings made from rice flour, stuffed with sweet or savory fillings.";
            place = "Across Odisha, especially during festivals";
            reason = "A traditional delicacy tied to celebrations like Raja and Prathamastami.";
            imgSrc = "https://cookishcreation.com/wp-content/uploads/2022/01/Pitha-A-Bengali-Delicay-2.jpg";
            break;
        case 'santula':
            title = "Santula";
            description = "A light vegetable stew made with minimal oil and spices, boiled or stir-fried.";
            place = "Rural Odisha";
            reason = "Known for its health benefits and simplicity, a daily dish in Odia homes.";
            imgSrc = "https://realfood.tesco.com/media/images/1400x919-OrissanSantula-f1f835f4-bfc1-4897-8c9a-770f2a30db53-0-1400x919.jpg";
            break;
        case 'bela':
            title = "Bela Pana";
            description = "A refreshing drink made from wood apple (bela), jaggery, and spices.";
            place = "Across Odisha, especially in summer";
            reason = "Famous as a cooling beverage during Pana Sankranti.";
            imgSrc = "https://img-global.cpcdn.com/recipes/a40ba896f735852f/680x482cq70/bela-pana-recipe-recipe-main-photo.jpg";
            break;
        case 'khicede':
            title = "Khicede";
            description = "A one-pot dish of lentils and rice, mildly spiced and tempered with ghee.";
            place = "Puri, Jagannath Temple";
            reason = "A sacred offering in temples, cherished for its wholesome taste.";
            imgSrc = "https://www.holidify.com/blog/wp-content/uploads/2016/09/Khicede.jpg";
            break;
        case 'machabesar':
            title = "Macha Besar";
            description = "A spicy fish curry made with freshwater fish cooked in a mustard-based gravy with potatoes and local spices.";
            place = "Coastal Odisha, especially Balasore and Bhadrak";
            reason = "Famous for its pungent mustard flavor and rich, aromatic taste.";
            imgSrc = "https://images.squarespace-cdn.com/content/v1/578753d7d482e9c3a909de40/1686566852840-YDF0IBYLOPN6IUNSG1RN/Maacha+besara.jpg?format=2500w";
            break;
        case 'dahi':
            title = "Dahi Bara";
            description = "Soft lentil dumplings soaked in spiced yogurt, often topped with chutney and spices.";
            place = "Cuttack and statewide";
            reason = "A popular street food, loved for its tangy and creamy flavor.";
            imgSrc = "https://rasagola.com/cdn/shop/files/dahibara_2048x.jpg?v=1706696607";
            break;
        case 'ouu':
            title = "Ouu Khatta";
            description = "A sweet-tangy chutney made from elephant apple (ouu) and jaggery.";
            place = "Southern Odisha";
            reason = "Loved for its unique flavor, often paired with meals.";
            imgSrc = "https://i.ytimg.com/vi/nXV5JFAq-kQ/maxresdefault.jpg";
            break;
        case 'makarchula':
            title = "Makarchula Pana";
            description = "A traditional drink made from ripe mangoes, milk, jaggery, and spices, often served chilled.";
            place = "Across Odisha, especially during summer";
            reason = "Famous for its refreshing taste and association with mango season festivities.";
            imgSrc = "https://www.firsttimercook.com/wp-content/uploads/2017/01/Makara2Bchaula2B3.jpg";
            break;
        case 'badichura':
            title = "Badi Chura";
            description = "A crunchy snack or side dish made from crushed dried lentil dumplings (badi), mixed with spices, onions, and sometimes green chilies.";
            place = "Across Odisha, especially in rural households";
            reason = "Famous for its simplicity and as a quick, flavorful accompaniment to meals.";
            imgSrc = "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Sasmita/oriya-badi-chura-recipe-sundried-lentil-dumpling-crumble.jpg";
            break;
        case 'chenajhili':
            title = "Chhena Jhili";
            description = "A sweet delicacy made from chhena (cottage cheese) shaped into small pieces, deep-fried, and soaked in sugar syrup.";
            place = "Nimapada, Puri district";
            reason = "Famous for its juicy, syrupy texture and is a beloved treat during festivals.";
            imgSrc = "https://dianasahu.wordpress.com/wp-content/uploads/2015/07/b2df5-img_6097.jpg";
            break;
        case 'kheeri':
            title = "Kheeri";
            description = "A creamy rice pudding made with milk, sugar, and flavored with cardamom, often garnished with nuts.";
            place = "Puri, Jagannath Temple";
            reason = "A sacred dessert offered as prasad, loved for its divine simplicity.";
            imgSrc = "https://i.ytimg.com/vi/sdsFcQ_GHR4/maxresdefault.jpg";
            break;
        case 'panipuri':
            title = "Panipuri";
            description = "Crispy hollow puris filled with spiced mashed potatoes and tangy tamarind water, often with a local twist using curd or ghuguni.";
            place = "Cuttack, Bhubaneswar, and street stalls statewide";
            reason = "Famous for its burst of flavors and as a beloved street food with an Odia flair.";
            imgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/800px-Pani_Puri1.JPG";
            break;

        case 'khaja':
            title = "Khaja";
            description = "A crispy, layered sweet made from refined flour, deep-fried, and soaked in sugar syrup.";
            place = "Puri, Jagannath Temple";
            reason = "Famous as a prasad offering at the temple and for its flaky, melt-in-mouth texture.";
            imgSrc = "https://i.ytimg.com/vi/bo_x5vxuGuE/maxresdefault.jpg";
            break;
        default:
            title = "Select a Dish";
            description = "Click on a card to see details about the dish.";
            place = "N/A";
            reason = "N/A";
            imgSrc = "";
    }

    document.getElementById('food-title').innerText = title;
    document.getElementById('food-description').innerText = description;
    document.getElementById('famous-place').innerText = place;
    document.getElementById('famous-reason').innerText = reason;
    document.getElementById('slider-img').src = imgSrc;
}

function hideSlider() {
    const slider = document.getElementById('slider');
    slider.classList.remove('active');
}
