from django.db import models


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    pic_url = models.CharField(max_length=100)
    bin= models.ForeignKey('BinVO', related_name="shoes", on_delete=models.CASCADE)

    def __str__(self):
        return self.brand_name

    class Meta:
        ordering = ['bin', 'model']
        verbose_name = 'Shoe'
        verbose_name_plural = 'Shoes'

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    href = models.CharField(max_length=100, unique=True, default="#")

    def __str__(self):
        return self.closet_name

    class Meta:
        ordering = ['closet_name', 'bin_number']
        verbose_name = 'Bin'
        verbose_name_plural = 'Bins'
