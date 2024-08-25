from django.core.management.base import BaseCommand
from django_seed import Seed
from appointments.models import Appointment

class Command(BaseCommand):
    help = 'Seed the database with dummy data'

    def handle(self, *args, **kwargs):
        seeder = Seed.seeder()
        custom_data = [
            {"type": "Consultation", "time": "10:00 AM", "details": "General health consultation", "is_booked": "False"},
            {"type": "Dental Checkup", "time": "11:00 AM", "details": "Routine dental examination", "is_booked": "False"},
            {"type": "Therapy Session", "time": "1:00 PM", "details": "Mental health therapy session", "is_booked": "False"},
            {"type": "Eye Examination", "time": "2:30 PM", "details": "Comprehensive eye exam", "is_booked": "False"},
            {"type": "Physical Therapy", "time": "4:00 PM", "details": "Physical therapy for back pain", "is_booked": "True"}
        ]

        for data in custom_data:
            seeder.add_entity(Appointment, 1, data)

        inserted_pks = seeder.execute()
        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))

