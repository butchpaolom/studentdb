import xlrd 
import os
  

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sc.settings")
import django
from django.db.models import Q
django.setup()

from api.models import *
from users.models import *
# Give the location of the file
files = os.listdir()


def create_student(student_number, last_name, first_name, mi, gender, email, contact_number, address, guardian, image):
    print(f"{student_number}-{first_name}-{last_name}-{mi}-{gender}-{email}-{str(0) + str(int(contact_number))}")
    student = Student()
    student.student_id = student_number
    student.first_name = first_name
    student.last_name = last_name
    student.middle_initial = mi
    student.email = email
    student.gender = gender
    student.address = address
    student.guardian = guardian
    if image == "":
        image = 'default.jpg'
    student.image = image
    student.contact_number = f"0{int(contact_number)}"
    student.save()

    return student

# (row, column)
for each in files:
    if each[-5:] == ".xlsx":
        end = False
        while (end==False):
            loc = (each)
            wb = xlrd.open_workbook(loc) 
            sheet = wb.sheet_by_index(0)
            print(f"For {each}")
            prompt = str(input("Proceed?y/n: "))
            if prompt == "y":
                qyear = str(input("Year: "))
                qsection = str(input("Section: "))
                qschool = str(input("School: "))
                qdegree = str(input("Degree: "))
                qsy_s = str(input("SY Start: "))
                qsy_e = str(input("SY End: "))
                try:
                    batch = YearSectionDegreeSchool.objects.get(
                                                                Q(year__year=qyear)
                                                                &Q(section__section=qsection)
                                                                &Q(Q(school__name__icontains=qschool)|Q(school__name_short__icontains=qschool))
                                                                &Q(Q(degree__title__icontains=qdegree)|Q(degree__short__icontains=qdegree))
                                                                &Q(sy__start=qsy_s)
                                                                &Q(sy__end=qsy_e)
                                                                )
                    print(batch)
                    prompt = str(input("Proceed?y/n: "))
                except:
                    batch = 'Not found!'
                    prompt = "n"
                    print(batch)
                    pass

                if prompt == "y":
                    end = True
                    for row in range(1,sheet.nrows):
                        student_id = sheet.cell_value(row, 0)
                        last_name = sheet.cell_value(row, 1)
                        first_name = sheet.cell_value(row, 2)
                        mi = sheet.cell_value(row, 3)
                        gender = sheet.cell_value(row, 4)
                        email = sheet.cell_value(row, 5)
                        contact_number = sheet.cell_value(row, 6)
                        image = sheet.cell_value(row, 7)
                        address = sheet.cell_value(row, 8)
                        guardian = sheet.cell_value(row, 9)
                        student = create_student(student_id, last_name, first_name, mi, gender, email, contact_number, address, guardian, image)
                        batch.students.add(student)
                        batch.save
                elif prompt == "n":
                    end = True
                    pass
            else:
                end = True
                pass


