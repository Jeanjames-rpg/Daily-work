from django.db import models

# Create your models here.
class Cases(models.Model):
    caseid = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=100)
    officerid = models.ForeignKey('officers',on_delete=models.CASCADE,db_column='officerid')
    firid = models.IntegerField(null=True, blank=True)
    case_date = models.DateField()
    open_date = models.DateField()
    close_date = models.DateField(null=True, blank=True)

    

    class Meta:
        db_table = "cases"
        managed = False
    
    def __str__(self):
        return self.title

class Criminals(models.Model):
    criminalid = models.IntegerField(primary_key=True)
    cr_name = models.CharField(max_length=100)
    age = models.IntegerField()
    crime_type = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    phnum = models.CharField(max_length=100)
    idmark = models.CharField(max_length=100)
    emergency_no = models.CharField(max_length=100)


    class Meta:
        db_table = "criminal"
        managed = False
    
    def __str__(self):
        return self.cr_name
    


class Officers(models.Model):
    officerid = models.IntegerField(primary_key=True)
    pname = models.CharField(max_length=100)
    prank = models.CharField(max_length=100)
    stationid = models.ForeignKey('policestation',on_delete=models.CASCADE,db_column="stationid")
    salary = models.IntegerField()
    location = models.CharField(max_length=100)
    ph = models.IntegerField()
    gender = models.CharField(max_length=100)
    age = models.IntegerField()
    emergency_contact = models.IntegerField()

    class Meta:
        db_table = "officer"
        managed = False
    
    def __str__(self):
        return self.pname



class policestation(models.Model):
    stationid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    phno = models.IntegerField()
    noofficers = models.IntegerField()
    cellcount = models.IntegerField()
    vehicles = models.IntegerField()

    class Meta:
        db_table = "pstation"
        managed = False

    def __str__(self):
        return self.name


class firs(models.Model):
    firid = models.IntegerField(primary_key=True)
    firdate = models.DateField()
    firdiscription = models.TextField()
    officerid = models.ForeignKey('officers',on_delete=models.CASCADE,db_column='officerid')
    stationid = models.ForeignKey('policestation',on_delete=models.CASCADE,db_column='stationid')
    complainant_name = models.CharField(max_length=100)
    complainant_phone = models.IntegerField()

    class Meta:
        db_table = "fir"
        managed = False

    def __str__(self):
        return self.firid
    

class Vehicle(models.Model):
    vehicleid = models.IntegerField(primary_key=True)
    stationid = models.ForeignKey('policestation',on_delete=models.CASCADE,db_column='stationid')
    type = models.CharField(max_length=100)
    vehicle_number = models.IntegerField()

    class Meta:
        db_table='vehicle'
        managed = False

    def __str__(self):
        return self.type
    

class casecriminal(models.Model):
    id = models.IntegerField(primary_key=True)
    caseid = models.ForeignKey('Cases', on_delete=models.CASCADE,db_column='caseid')
    criminalid = models.ForeignKey('Criminals', on_delete=models.CASCADE,db_column='criminalid')

    class Meta:
        db_table = 'case_criminal'
        managed = False
        unique_together = (('caseid','criminalid'))


    def __str__(self):
        return self.caseid