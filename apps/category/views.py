from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import Category


# Create your views here.
class ListCategoriesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_sub_categories(self, category):
        subcategories = []
        for sub_cat in category.children.all():
            sub_item = {
                "id" : sub_cat.id,
                "name" : sub_cat.name,
                "sub_categories" : self.get_sub_categories(sub_cat)
            }
            subcategories.append(sub_item)
        return subcategories

    def get(self, request, format=None):
        list = Category.objects.all()
        if list.exists():
            categories = list

            result = []

            for category in categories.filter(parent=None):
                item = {
                    "id" : category.id,
                    "name" : category.name,
                    "sub_categories" : self.get_sub_categories(category)
                }
            
                result.append(item)
            return Response({"categories":result}, status=status.HTTP_200_OK)
        else:
            return Response({"error":"No categories found"},status=status.HTTP_404_NOT_FOUND)