export async function getCartItems(req: Request): Promise<[]> {
  try {
    return [];
  } catch (error) {
    console.log("CartService.ts", "getCartItems", error, { req });
  }
}

export async function addItemToCart(req: Request): Promise<[]> {
  try {
    return [];
  } catch (error) {
    console.log("CartService.ts", "addItemToCart", error, { req });
  }
}

export async function updateCartItem(req: Request): Promise<[]> {
  try {
    return [];
  } catch (error) {
    console.log("CartService.ts", "updateCartItem", error, { req });
  }
}

export async function removeCartItem(req: Request): Promise<[]> {
  try {
    return [];
  } catch (error) {
    console.log("CartService.ts", "removeCartItem", error, { req });
  }
}
