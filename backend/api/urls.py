from django.urls import path, include
from . import views

urlpatterns = [
    path("products/", views.ProductList.as_view(), name="productlist"),
    path("products/panieraddproduct/", views.PanierAddProduct.as_view(), name="panieraddproduct"), 
    path('panier/increase/<int:pk>/', views.IncreaseQuantityView.as_view(), name='increase_quantity'),
    path('panier/decrease/<int:pk>/', views.DecreaseQuantityView.as_view(), name='decrease_quantity'),
    path('panier/destroy/<int:pk>/', views.DestroyPanierView.as_view(), name='destroypanier'),
    path('panier/clear/', views.ClearPanierView.as_view(), name='clear_panier'),
    path("products/panierdetail/", views.PanierDetail.as_view(), name="panierdetail"),
    path("commandecreate/", views.CommandeCreateView.as_view(), name="commandecreate"),
    path('commandes/list/', views.CommandeListView.as_view(), name='commande_list'), 
    path('partners/List/' , views.PartnersList.as_view(), name='partners_list'),
    path('ProfileDetail/', views.ProfileDetail.as_view(), name='profiledetail'),
    path('ProfileUpdate/', views.ProfileUpdateView.as_view(), name='profileupdate'),
    path('subscription/', views.SubscriptionDetail.as_view(), name='subscription-detail'),
    path('subscription/update/', views.SubscriptionUpdateView.as_view(), name='subscription-update'),

    path('create-payment-intent/', views.create_payment_intent, name='create-payment-intent'),
]