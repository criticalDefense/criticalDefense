

import os
from decouple import config
from unipath import Path
import dj_database_url

from tenant_schemas.middleware import DefaultTenantMiddleware

class MyDefaultTenantMiddleware(DefaultTenantMiddleware):
    DEFAULT_SCHEMA_NAME = 'default'

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DIR = Path(__file__).parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='S#perS3crEt_1122')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False)

# load production server from .env
ALLOWED_HOSTS = ['*']

# Application definition


SHARED_APPS = (
    'tenant_schemas',  # mandatory, should always be before any django app
    'customer', # you must list the app where your tenant model resides in
    'app',
    'authentication',


    'django.contrib.contenttypes',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tenant_users.permissions', # Defined in both shared apps and tenant apps
    'tenant_users.tenants', # defined only in shared apps
    'customer', # Custom defined app that contains the TenantModel. Must NOT exist in TENANT_APPS
    'users', # Custom app that contains the new User Model (see below). Must NOT exist in TENANT_APPS

    
)

TENANT_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'tenant_users.permissions'
    

    # your tenant-specific apps


)

TENANT_MODEL = "customer.Client" # app.Model
 AUTH_USER_MODEL = 'authentication.TenantUser'
 TENANT_USERS_DOMAIN = "localhost"


INSTALLED_APPS = (
    'tenant_schemas',  # mandatory, should always be before any django app
    'app',  # Enable the inner app
    'customer',
    'core',
    'authentication',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tenant_users.permissions'
     
)
SITE_ID = 1

MIDDLEWARE = [
    
    'tenant_schemas.middleware.TenantMiddleware',    
    'tenant_schemas.middleware.SuspiciousTenantMiddleware',
    'tenant_schemas.middleware.DefaultTenantMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

AUTHENTICATION_BACKENDS = (
    'tenant_users.permissions.backend.UserBackend',
)

ROOT_URLCONF = 'core.urls'
LOGIN_REDIRECT_URL = "home"   # Route defined in app/urls.py
LOGOUT_REDIRECT_URL = "home"  # Route defined in app/urls.py
TEMPLATE_DIR = os.path.join(BASE_DIR, "core/templates")  # ROOT dir for templates
DEFAULT_FILE_STORAGE = 'tenant_schemas.storage.TenantFileSystemStorage'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.request',
    
)

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'tenant_schemas.postgresql_backend',
        'NAME': 'Clients',                     
        'USER': 'postgres',
        'PASSWORD': 'Twocaper1',
        'HOST': 'localhost', # Or something like this
        'PORT': '5432',
        
    }
}

DATABASE_ROUTERS = (
    'tenant_schemas.routers.TenantSyncRouter',
)

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#############################################################
# SRC: https://devcenter.heroku.com/articles/django-assets

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'core/static'),
)
#############################################################
#############################################################
