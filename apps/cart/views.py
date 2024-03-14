from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Cart, CartItem
from apps.product.serializers import ProductSerializer
from apps.product.models import Product


class GetItemsView(APIView):
    def get(self, request, format=None):
        user = request.user
        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.order_by("product").filter(cart=cart)

            results = []
            for cart_item in cart_items:
                item = {}
                item["id"] = cart_item.id
                item["count"] = cart_item.count
                product = Product.objects.get(id=cart_item.product.id)
                product = ProductSerializer(product)
                item["product"] = product.data

                results.append(item)
            return Response({"cart": results}, status=status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Cart not found"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class AddItemView(APIView):
    def post(self, request, format=None):
        user = request.user
        data = request.data

        try:
            product_id = int(data["product_id"])
        except:
            return Response(
                {"error": "Product ID must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            )

        count = 1

        try:
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)

            if CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {"error": "Item is already in cart"},
                    status=status.HTTP_409_CONFLICT,
                )
            if int(product.quantity) > 0:
                CartItem.objects.create(product=product, cart=cart, count=count)

                if CartItem.objects.filter(cart=cart, product=product).exists():
                    total_items = int(cart.total_items) + 1
                    Cart.objects.filter(user=user).update(total_items=total_items)

                    cart_items = CartItem.objects.order_by("product").filter(cart=cart)

                    result = []

                    for cart_item in cart_items:
                        item = {}
                        item["id"] = cart_item.id
                        item["count"] = cart_item.count
                        product = Product.objects.get(id=cart_item.product.id)
                        product = ProductSerializer(product)

                        item["product"] = product.data

                        result.append(item)
                    return Response({"cart": result}, status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"error": "Not enough of this item in stock"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
            else:
                return Response(
                    {"error": "Product is out of stock"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND
            )
        except:
            return Response(
                {"error": "Something went wrong adding item to cart"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class GetTotalView(APIView):
    def get(self, request, format=None):
        user = request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)

            total_cost = 0.0
            total_cost_compare = 0.0

            for cart_item in cart_items:
                total_cost += float(cart_item.product.price) * float(cart_item.count)

                total_cost_compare += float(cart_item.product.compare_price) * float(
                    cart_item.count
                )

                total_cost = round(total_cost, 2)
                total_cost_compare = round(total_cost_compare, 2)

            return Response(
                {"total_cost": total_cost, "total_cost_compare": total_cost_compare},
                status=status.HTTP_200_OK,
            )

        except CartItem.DoesNotExist:
            return Response(
                {"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class GetItemTotalView(APIView):
    def get(self, request, format=None):
        user = request.user

        try:
            cart = Cart.objects.get(user=user)
            total_item = cart.total_items

            return Response({"total_item": total_item}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateItemView(APIView):
    def put(self, request, format=None):
        user = request.user
        data = request.data

        try:
            product_id = int(data["product_id"])
        except:
            return Response(
                {"error": "Product ID must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            count = int(data["count"])
        except:
            return Response(
                {"error": "Count must be an integer"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)

            quantity = int(product.quantity)

            if count <= quantity:
                if not CartItem.objects.filter(cart=cart, product=product).exists():
                    return Response(
                        {"error": "This product is not in your cart"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

                CartItem.objects.filter(cart=cart, product=product).update(count=count)

                cart_items = CartItem.objects.order_by("product").filter(cart=cart)

                result = []

                for cart_item in cart_items:
                    item = {}
                    item["id"] = cart_item.id
                    item["count"] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    result.append(item)
                return Response({"cart": result}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Not enough of this item in stock"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        except CartItem.DoesNotExist:
            return Response(
                {"error": "This product is not in your cart"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND
            )
        except:
            return Response(
                {"error": "Something went wrong adding item to cart"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RemoveItemView(APIView):
    def delete(self, request, format=None):
        user = request.user
        data = request.data

        try:
            product_id = int(data["product_id"])
        except:
            return Response(
                {"error": "Product ID must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)
            if not CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {"error": "This product is not in your cart"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            CartItem.objects.filter(cart=cart, product=product).delete()

            if not CartItem.objects.filter(cart=cart).exists():
                total_items = int(cart.total_items) - 1
                Cart.objects.filter(user=user).update(total_items=total_items)

            cart_items = CartItem.objects.order_by("product").filter(cart=cart)

            result = []
            for cart_item in cart_items:
                item = {}

                item["id"] = cart_item.id
                item["count"] = cart_item.id
                product = Product.objects.get(id=cart_item.product.id)
                product = ProductSerializer(product)

                item["product"] = product.data
                result.append(item)
            return Response({"cart": result}, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response(
                {"error": "This product is not in your cart"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND
            )
        except:
            return Response(
                {"error": "Something went wrong deleting item to cart"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class EmptyCartView(APIView):
    def delete(self, request, format=None):
        user = request.user

        try:
            cart = Cart.objects.get(user=user)
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {"success": "The cart is already empty"}, status=status.HTTP_200_OK
                )

            CartItem.objects.filter(cart=cart).delete()
            Cart.objects.filter(user=user).update(total_items=0)
            return Response({"success": "The cart is empty"}, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response(
                {"success": "The cart is already empty"}, status=status.HTTP_200_OK
            )
        except:
            return Response(
                {"error": "There was an error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SynchCartView(APIView):
    def put(self, request, format=None):
        user = request.user
        data = request.data

        try:
            cart_items = data["cart_items"]

            cart = Cart.objects.get(user=user)
            for cart_item in cart_items:
                try:
                    product_id = int(cart_item["product_id"])
                except:
                    return Response(
                        {"error": "Proudct ID must be an integer"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                product = Product.objects.get(id=product_id)
                quantity = product.quantity

                try:
                    cart_item_count = int(cart_item["count"])
                except:
                    cart_item_count = 1

                if CartItem.objects.filter(cart=cart, product=product).exists():
                    # actualizamos el item del carrito
                    item = CartItem.objects.get(cart=cart, product=product)
                    count = item.count

                    # chequeo con la base de datos
                    if cart_item_count + int(count) <= int(quantity):
                        updated_count = cart_item_count + int(count)
                        CartItem.objects.filter(cart=cart, product=product).update(
                            count=updated_count
                        )
                else:
                    # agregamos el item al carrito del usuario incluso cuando el usuario no se a logueado
                    if cart_item_count <= quantity:
                        CartItem.objects.create(
                            product=product, cart=cart, count=cart_item_count
                        )

                        total_items = int(cart.total_items) + 1
                        Cart.objects.filter(user=user).update(total_items=total_items)

                return Response(
                    {"success": "cart synchronized"}, status=status.HTTP_200_OK
                )
        except Cart.DoesNotExist:
            return Response(
                {"error": "The cart does not exists"}, status=status.HTTP_404_NOT_FOUND
            )
        except:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
