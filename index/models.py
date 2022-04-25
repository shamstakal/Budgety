from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Customer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='customer')
    inc_val = models.IntegerField()
    out_val = models.IntegerField()

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

class Budget(models.Model):
    CHOICES = (
        ('+', 'INCOME'),
        ('-', 'OUTCOME')
    )
    typ = models.CharField(max_length=5, choices=CHOICES)
    value = models.IntegerField()
    desc = models.TextField()
    time = models.DateTimeField(default=timezone.now)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.desc} => {self.value}'


