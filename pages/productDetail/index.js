import { PER_PAGE } from "../../common-script/constants.js";
import {
  getProduct,
  getProducts,
} from "../../common-script/services/product-api.js";
import { $, $$, getQueryString } from "../../common-script/utils.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let data1;

let params2 = {
  _limit: PER_PAGE,
  _page: 1,
  _totalRows: 0,
};
let products = [];

async function init() {
  try {
    data1 = await getProduct(id);
    const { data } = await getProducts(getQueryString(params2));
    products = data;
    //cut
    products = products.slice(0, 4);

    render();
  } catch (error) {
    console.log(error);
  }
}

function render() {
  if (Object.keys(data1).length === 0) {
    window.location.replace(
      "https://stackoverflow.com/questions/19635188/why-is-body-scrolltop-deprecated"
    );
    return;
  }

  if (products.length === 0) {
    return;
  }

  $("productdetails").innerHTML = `<div class="single-pro-image">
        <img
          src="${data1.images[0]}"
          width="100%"
          id="MainImg"
          alt=""
        />
        <div class="small-image-group">
          <div class="small-img-col">
            <img
              src="images/products/f1.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="images/products/f2.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="images/products/f3.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="images/products/f4.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="single-pro-details">
        <h6>Home / T-Shirt</h6>
        <h4>${data1.title}</h4>
        <h2>$${data1.price}</h2>
        <select>
          <option>Select Size</option>
          <option>XL</option>
          <option>XXL</option>
          <option>Small</option>
          <option>Large</option>
        </select>
        <input type="number" value="1" />
        <button class="normal">Add to Cart</button>
        <h4>Product Details</h4>
        <span
          >${data1.description}
        </span>
      </div>`;

  const featuredProductsHtml = products.map(
    (
      product
    ) => `<div class="pro" onclick="window.location.href='../productDetail/index.html?id=${product.id}';">
          <img src="${product.images[0]}" alt="" />
          <div class="des">
            <span>${product.category.name}</span>
            <h5>${product.title}</h5>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <h4>$${product.price}</h4>
          </div>
          <a href="#"><i class="fas fa-shopping-cart cart"></i></a>
        </div>
        `
  );

  $("product-render").innerHTML = featuredProductsHtml.join("");
}

init();
