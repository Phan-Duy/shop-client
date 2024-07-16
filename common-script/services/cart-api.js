import restApi from "./index.js";

export async function getCarts(query) {
  try {
    return await restApi({
      endpoint: `carts?${query}`,
      method: "GET",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createCart(data) {
  try {
    return await restApi({
      endpoint: "carts",
      method: "POST",
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateCart(data) {
  try {
    return await restApi({
      endpoint: `carts/${data.id}`,
      method: "PUT",
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCart(id) {
  try {
    return await restApi({
      endpoint: `carts/${id}`,
      method: "delete",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getVoucher(code) {
  try {
    return await restApi({
      endpoint: `voucher?code=${code}`,
      method: "delete",
    });
  } catch (error) {
    console.log(error);
  }
}
