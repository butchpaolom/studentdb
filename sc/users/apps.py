from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'users'
    verbose_name = 'Management Tables'

    def ready(self):
        import users.signals
