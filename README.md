# Homage Covid-19 Vaccination Reservation System

## How to run the app

1. Install the latest version of Node.js, npm and Visual Studio Code.
2. Open terminal/command prompt in the root of the project and run the follow command to install dependencies.

```
npm install
```

3. Open the project with Visual Studio Code.
4. Start the project by click F5 on keyboard.

## Assumptions Made

1. As no specific framework or library was specified, I have chosen to use NestJS and MySQL for this code challenge.
2. The data of Vaccination Centers, Vaccination Slots, IC Verification, and others are assumed to be managed by another application or another party, this API will read the above data only.
3. User can make appointments for any vaccination centers.
4. User are making appointment for their first vaccination jab only, subsequent vaccination jabs are not handled in this API; hence user can only make 1 appointment. 1 IC number can only make 1 appointment.
5. Authentication and authorization is ignored as it is not specified in the requirements.

### Business Logic

A vaccination center will have different time slots available for people to come and get their vaccination jabs.  
Each vaccination centre has a different number of nurses that work on different days; the amount of patients each centre can handle per time slots will differ.  
Upon successful vaccination appointment, an Appointment Id will be assgined to the user.

---

## Database Table Design

### Vaccination Centers - Information of vaccination centers.

| Column Name | Data Type     | Description                        |
| ----------- | ------------- | ---------------------------------- |
| CenterId    | VARHCAR(50)   | Unique ID of vaccination center.   |
| Location    | VARCHAR(1000) | Location of the vaccination center |

### Vaccination Slots - Vaccination time slots of each vaccination centers.

| Column Name    | Data Type    | Description                                          |
| -------------- | ------------ | ---------------------------------------------------- |
| SlotId         | VARCHAR(100) | ID of the slot                                       |
| CenterId       | VARHCAR(50)  | Unique ID of vaccination center.                     |
| SlotsAvailable | INT          | Number of appointments available for this time slot. |
| Start          | DATETIME     | Start time of the slot.                              |
| End            | DATETIME     | End time of the slot.                                |

### Vaccination Appointment - Vaccination appointments of each vaccination time slots.

| Column Name   | Data Type    | Description                        |
| ------------- | ------------ | ---------------------------------- |
| AppointmentId | VARCHAR(150) | ID of the vaccination reservation. |
| SlotId        | VARCHAR(100) | ID of the slot                     |
| IcNumber      | VARHCAR(100) | IC Number of applicant.            |
| FullName      | VARHCAR(255) | Name of applicant.                 |

---
