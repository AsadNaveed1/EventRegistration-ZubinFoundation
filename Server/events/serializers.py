from rest_framework import serializers
from .models import Event, User  # 根據你的實際模組位置進行調整
# from user.serializer import UserSerializer
# from user.serializer import UserSerializer  # 延遲導入



class UserSerializer(serializers.ModelSerializer):

    # registered_events =serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    registered_users = UserSerializer(many=True, read_only=True)  # 使用 UserSerializer 序列化 registered_users
    # registered_users = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = '__all__'

    # def get_registered_users(self, obj):
    #     from user.serializer import UserSerializer
    #     users = obj.registered_users.all()
    #     return UserSerializer(users, many=True).data
