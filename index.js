const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeModal = document.getElementsByClassName('close')[0];

function displayError(message) {
  errorMessage.textContent = message;
  errorModal.style.display = 'block';
}

closeModal.onclick = function() {
  errorModal.style.display = 'none';
}


async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Маалыматтарды алууда ката кетти');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    displayError(error.message);
  }
}


async function searchProduct(keyword) {
  const url = 'https://dummyjson.com/products?keyword=${keyword}';
  const data = await fetchData(url);
  
  if (data && data.length > 0) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    data.forEach(product => {
      
      name.innerHTML = `${index + 1} ${product.title}`;
      brand.innerHTML = product.brand;
      price.innerHTML = product.price;
      category.innerHTML = product.category;

      const name = document.createElement('div');
      const brand = document.createElement('div');
      const price = document.createElement('div');
      const category = document.createElement('div');

      productList.appendChild(name);
      productList.appendChild(brand);
      productList.appendChild(price);
      productList.appendChild(category);
    });
    
    localStorage.setItem('products', JSON.stringify(data));
  } else {
    displayError('Продукция табылган жок');
  }
}


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const keyword = searchInput.value;
    searchProduct(keyword);
  }
});