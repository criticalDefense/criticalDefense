# -*- encoding: utf-8 -*-
"""
License: MIT
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile



# Register your models here.
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False 
    
class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline]

admin.site.unregister(User)

admin.site.register(User, UserAdmin)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass
