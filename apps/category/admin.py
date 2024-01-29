from django.contrib import admin
from .models import Category


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "parent", "name")
    list_display_links = ("id", "parent", "name")
    search_fields = ("name","parent")
    list_per_page = 25

admin.site.register(Category, CategoryAdmin)