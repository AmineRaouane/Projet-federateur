from collections import defaultdict
from .models import Product, Panier, Commande , Partners ,Profile,Subscription
from .serializers import ProductSerializer, PanierSerializer, CommandeSerializer, UserSerializer,PartnersSerializer ,ProfileSerializer,SubscriptionSerializer 
from rest_framework import generics,permissions #type:ignore
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

#! USER
class CreateUserView(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)#type:ignore
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        Profile.objects.create(user=user)
        Subscription.objects.create(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

#! Product
class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

#! Profile
class ProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    def update(self, request, *args, **kwargs):
        profile_instance = self.get_object()
        user_instance = profile_instance.user
        profile_data = request.data
        user_data = profile_data.pop('user', {})
        user_serializer = UserSerializer(user_instance, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        profile_serializer = self.get_serializer(profile_instance, data=profile_data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data)
        else:
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ProfileDetail(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    

#! Panier
class PanierAddProduct(generics.CreateAPIView):
    serializer_class = PanierSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        product_id = self.request.data.get('product') #type:ignore
        quantity = self.request.data.get('quantity') #type:ignore
        if not product_id or not quantity:
            raise ValidationError("Product ID and quantity are required")
        try: 
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            raise ValidationError("Product does not exist")
        panier_item, created = Panier.objects.get_or_create(user=self.request.user, product=product)
        if created:
            panier_item.quantity = quantity
        else:
            panier_item.quantity += quantity
        panier_item.save()

class IncreaseQuantityView(APIView):
    def post(self, request, pk):
        try:
            panier = Panier.objects.get(pk=pk)
            panier.quantity += 1 # type: ignore
            panier.save()
            serializer = PanierSerializer(panier)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Panier.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class DecreaseQuantityView(APIView):
    def post(self, request, pk):
        try:
            panier = Panier.objects.get(pk=pk)
            if panier.quantity > 1: # type: ignore
                panier.quantity -= 1 # type: ignore
                panier.save()
                serializer = PanierSerializer(panier)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Quantity cannot be less than 1."}, status=status.HTTP_400_BAD_REQUEST)
        except Panier.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class DestroyPanierView(APIView):
    def delete(self, request, pk):
        try:
            panier = Panier.objects.get(pk=pk)
            panier.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Panier.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class ClearPanierView(APIView):
    def delete(self, request):
        user = request.user
        panieres = Panier.objects.filter(user=user)
        count, _ = panieres.delete()
        return Response({"detail": f"{count} items deleted."}, status=status.HTTP_204_NO_CONTENT)


class PanierDetail(generics.ListAPIView):
    serializer_class = PanierSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Panier.objects.filter(user=self.request.user)


#! Commande
class CommandeCreateView(generics.CreateAPIView):
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        commande_number = self.request.data.get('commande_number') #type:ignore 
        total_price = self.request.data.get('total_price') #type:ignore
        name = self.request.data.get('name') #type:ignore
        location = self.request.data.get('location') #type:ignore
        phone_number = self.request.data.get('phone_number') #type:ignore
        product_id = self.request.data.get('product_id') #type:ignore
        quantity = self.request.data.get('quantity') #type:ignore
        try: 
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            raise ValidationError("Product does not exist")
        if not any([commande_number, total_price, name, location, phone_number, product, quantity]):
            raise ValidationError("Data missing")
        Commande_item, created = Commande.objects.get_or_create(user=self.request.user, product=product, 
                                                                quantity=quantity, commande_number=commande_number, 
                                                                total_price=total_price, name=name, location=location, 
                                                                phone_number=phone_number)
        if created:
            Commande_item.save()
        return Response(status=status.HTTP_201_CREATED)

class CommandeListView(generics.ListAPIView):
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Commande.objects.filter(user=self.request.user)
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        Cache = defaultdict(list) # type: ignore
        Result = []
        for item in queryset:
            serialized_item = self.serializer_class(item).data
            Cache[item.commande_number].append(serialized_item)
        for key, value in Cache.items():
            Result.append({"commande_number": key, "items": value})
        return Response(Result)


#!GymPartners
class PartnersList(generics.ListCreateAPIView):
    serializer_class = PartnersSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        return Partners.objects.all()
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        Cache = defaultdict(list) # type: ignore
        Result = []
        for item in queryset:
            serialized_item = self.serializer_class(item).data
            Cache[item.city].append(serialized_item)
        for key, value in Cache.items():
            Result.append({"city": key, "items": value})
        return Response(Result)

#!Subscription
class SubscriptionDetail(generics.RetrieveAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return Subscription.objects.get(user=self.request.user)

class SubscriptionUpdateView(generics.UpdateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return Subscription.objects.get(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        subscription_instance = self.get_object()
        subscription_data = request.data
        subscription_serializer = self.get_serializer(subscription_instance, data=subscription_data, partial=True)
        
        if subscription_serializer.is_valid():
            subscription_serializer.save()
            return Response(subscription_serializer.data)
        else:
            return Response(subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST) #type:ignore


#!Stripe paiment
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import json

stripe.api_key = "STRIPE_SECRET_KEY"

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            amount = data['amount']

            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd'
            )
            return JsonResponse({
                'clientSecret': intent['client_secret']
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


