from django.db import models

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    pic_url = models.CharField(max_length=100)
    bin= models.ForeignKey('BinVO', related_names="shoes", on_delete=models.CASCADE)

    def __str__(self):
        return self.manufacturer + " " + self.model_name + " " + self.color + " " + self.pic_url + " " + str(self.bin)

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.closet_name + " " + str(self.bin_number) + " " + str(self.bin_size)
