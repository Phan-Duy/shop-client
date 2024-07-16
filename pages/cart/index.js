import {
  deleteCart,
  getCarts,
  updateCart,
} from "../../common-script/services/cart-api.js";
import { $, $$ } from "../../common-script/utils.js";

let carts = [];
let voucher = {};

async function getCartsOnPage() {
  try {
    carts = await getCarts({
      idUser: "abc",
    });
    renderCarts();
  } catch (error) {
    console.log(error);
  }
}

function renderCarts() {
  if (!carts.length) {
    return;
  }

  const cartsHtml = carts.map(
    (cart) => `
    <tr>
      <td><button data-id= '${cart.id}' class = "remove-cart">X</button></td>
      <td><img src="../../images/products/f1.jpg" alt=""></td>
      <td>${cart.title}</td>
      <td>$${cart.price}</td>
      <td><input type="number" data-id="${
        cart.id
      }" class="quantity-input" value="${cart.quantity}" /></td>
      <td>$${cart.price * cart.quantity}</td>
    </tr>
  `
  );

  $("cart-list").innerHTML = cartsHtml.join("");

  $$(".quantity-input").forEach((element) => {
    element.onchange = handleChangeQuantity;
  });

  ($$(".remove-cart") || []).forEach((btn) => (btn.onclick = handleDeleteCart));
}

async function handleDeleteCart(e) {
  const cartId = e.target.getAttribute("data-id");

  try {
    await deleteCart(cartId);
    getCartsOnPage();
  } catch (error) {
    console.log(error);
  }
}

async function handleChangeQuantity() {
  const cartId = this.getAttribute("data-id");

  if (Number(this.value) <= 0) {
    try {
      await deleteCart(cartId);
      getCartsOnPage();
    } catch (error) {
      console.log(error);
    }

    return;
  }

  const cartIndex = carts.findIndex((cart) => cart.id === Number(cartId));

  if (cartIndex !== -1) {
    try {
      await updateCart({
        ...carts[cartIndex],
        quantity: Number(this.value),
      });
      getCartsOnPage();
    } catch (error) {
      console.log(error);
    }
  }
}

async function getVoucherOnPage() {
  const code = $("voucher").value;

  if (code){
    try {
      const voucherData = getVoucher(code);

      if (voucherData.length > 0){
        voucher = voucherData[0];
      }
    } catch (error) {
     console.log(error); 
    }
  } 
}

window.onload = () => {
  getCartsOnPage();

  $("apply-voucher").onclick = getVoucherOnPage;
};
