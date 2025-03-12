const categories = () => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoier(data.categories));
};
categories();

const displayCategoier = (categories) => {
  console.log(categories);
};
