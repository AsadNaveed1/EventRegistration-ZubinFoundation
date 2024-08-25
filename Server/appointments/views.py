from rest_framework import generics
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from .models import Appointment
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

class AppointmentListCreate(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]

@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))    
def get_data(request):
        if request.method == 'GET':
            appointments = Appointment.objects.all().filter(is_booked=False)
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(('PUT',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def book_appointment(request, pk):
    if request.method == 'PUT':
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if appointment.is_booked:
            return Response({'error': 'Appointment already booked'}, status=status.HTTP_200_OK)

        appointment.is_booked = True
        appointment.save()
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data, status=status.HTTP_200_OK)
