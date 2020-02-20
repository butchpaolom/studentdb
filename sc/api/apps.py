from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'
    verbose_name = 'Student Tables'

    def ready(self):
        import api.signals
