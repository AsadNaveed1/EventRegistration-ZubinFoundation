from rest_framework import serializers
from .models import Event, User  # 根據你的實際模組位置進行調整
# from user.serializer import UserSerializer
# from user.serializer import UserSerializer  # 延遲導入



class UserSerializer(serializers.ModelSerializer):

    # registered_events =serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['user_id', 'username', 'email', 'age', 'gender', 'interests', 'residence', 'user_type', 'admin_code', 'ethnicity']


class EventSerializer(serializers.ModelSerializer):
    registered_users = UserSerializer(many=True, read_only=True)  # 使用 UserSerializer 序列化 registered_users
    # registered_users = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['event_id', 'title', 'date', 'time', 'location', 'description', 'interests', 'required_skills', 'gender', 'language', 'registered_users']

    # def get_registered_users(self, obj):
    #     from user.serializer import UserSerializer
    #     users = obj.registered_users.all()
    #     return UserSerializer(users, many=True).data
