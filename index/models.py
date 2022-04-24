from django.db import models

from django.utils import timezone


class Budget(models.Model):
    CHOICES = (
        ('+', 'INCOME'),
        ('-', 'OUTCOME')
    )
    typ = models.CharField(max_length=5, choices=CHOICES)
    value = models.IntegerField()
    desc = models.TextField()
    time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.desc} => {self.value}'
