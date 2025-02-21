document.getElementById('searchBox').addEventListener('input', function () {
    const query = this.value.trim();
    const suggestions = document.getElementById('suggestions');

    if (query === '') {
        suggestions.innerHTML = '';
        return;
    }

    fetch(`/search?q=${query}`)

        .then(response => response.json())
        .then(data => {
            suggestions.innerHTML = data
                .map(item => `
                    <li class="suggestion-item">
                        <img src="${item.image}" alt="${item.name}" class="suggestion-image">
                        <span class="suggestion-text">${item.name}</span>
                    </li>
                `)
                .join('');

            // Add click event to suggestions
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function () {
                    document.getElementById('searchBox').value = this.querySelector('.suggestion-text').textContent;
                    suggestions.innerHTML = '';
                });
            });
        })
        .catch(error => console.error('Error:', error));
});

let sea=document.getElementsByClassName("sea");
let searchbox=document.getElementById("searchBox");

document.addEventListener("DOMContentLoaded", () => {
for(se of sea){
    
    se.addEventListener("click",()=>{
        searchbox.style.display="block";
    })
}
});