from django.contrib.auth.models import User #type:ignore
from .models import Commande, Panier, Product ,Partners ,Profile,Subscription
from rest_framework import serializers #type:ignore


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','email','password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description', 'img_url', 'categorie')

class PanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Panier
        fields = ('id', 'user', 'product' , 'quantity','state')
        depth = 1 

class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commande
        fields = ('id', 'commande_number', 'total_price', 'name','date','location','phone_number','product','quantity')
        depth = 1

class PartnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partners
        fields = ('id', 'name', 'city', 'Location_url')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'phone_number', 'location', 'firstname', 'lastname', 'age', 'job', 'avatar')
        depth = 1

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('id', 'user', 'date', 'subscription_type', 'subscription_price')
        depth = 1