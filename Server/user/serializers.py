from rest_framework import serializers
from .models import User
from events.models import Event
# from events.serializers import EventSerializer
# from events.serializers import EventSerializer  # 延遲導入

class EventSerializer(serializers.ModelSerializer):
    # registered_users = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['event_id', 'title', 'date', 'time', 'location', 'description', 'interests', 'required_skills', 'gender', 'language']

        
class UserSerializer(serializers.ModelSerializer):
    registered_events = EventSerializer(many=True, read_only=True)  # 使用 EventSerializer 序列化 registered_events

    # registered_events =serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['user_id', 'username', 'email', 'registered_events', 'age', 'gender', 'interests', 'residence', 'user_type', 'admin_code', 'ethnicity']
    # def get_registered_events(self, obj):
    #     from events.serializers import EventSerializer
    #     events = obj.registered_events.all()
    #     return EventSerializer(events, many=True).data


