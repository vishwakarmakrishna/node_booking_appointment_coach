# node_booking_appointment_coach

## Appointment: Exercise Instruction
* Using the dataset mentioned below that contains the active coaches and the weekly schedule of their available hours
    * [Dataset](dataset.csv)
* Create the following API’s
    * I want to see which coaches I can schedule with.
    * I want to see what 30-minute time slots are available to schedule with a particular coach.
    * I want to book an appointment with a coach at one of their available times.

## List Coaches
https://bookingcoach.herokuapp.com/api/coaches

## List Booked Appointment Coaches
https://bookingcoach.herokuapp.com/api/coach/booked

## Get Only Specified Coaches using query parameter
https://bookingcoach.herokuapp.com/api/coaches/:name
Here name is coaches name

## Get Only Specified Coaches & their passing day using query parameter
https://bookingcoach.herokuapp.com/api/coaches/:name/day/:days
Here name is coaches name
Here days is the user selected 

## Get Only Specified Coaches & their passing day & Day appointment using query parameter
https://bookingcoach.herokuapp.com/api/coaches/:name/day/:days/book/:index
Here name is coaches name
Here days is the user selected 
Here index is (0:Sunday, 1:Monday ... , 6:Saturday)
