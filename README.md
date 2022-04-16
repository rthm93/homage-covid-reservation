# Homage Covid-19 Vaccination Reservation System

## Assumptions Made

1. The purpose of this API is to book Covid-19 vaccination appointments; hence the CRUD of Vaccination Centers, Vaccination Slots, IC Verification, and others are not included in the scope of this API.
2. The data of Vaccination Centers, Vaccination Slots, IC Verification, and others are managed by another application or another party.
3. User can make appointments for any vaccination centers.

## Table Design

### Vaccination Centers

| Column Name | Data Type     | Description                        |
| ----------- | ------------- | ---------------------------------- |
| CenterId    | VARHCAR(100)  | Unique ID of vaccination center.   |
| Location    | VARCHAR(1000) | Location of the vaccination center |

### Vaccination Slots table

| Column Name    | Data Type    | Description                                          |
| -------------- | ------------ | ---------------------------------------------------- |
| SlotId         | BIGINT       | ID of the slot                                       |
| CenterId       | VARHCAR(100) | Unique ID of vaccination center.                     |
| SlotsAvailable | INT          | Number of appointments available for this time slot. |
| SlotStartTime  | DATETIME     | Start time of the slot.                              |
| SlotEndTime    | DATETIME     | End time of the slot.                                |

### Vaccination Reservation

| Column Name   | Data Type    | Description                        |
| ------------- | ------------ | ---------------------------------- |
| ReservationId | BIGINT       | ID of the vaccination reservation. |
| SlotId        | BIGINT       | ID of the slot                     |
| IcNumber      | VARHCAR(100) | IC Number of applicant.            |
| FullName      | VARHCAR(255) | Name of applicant.                 |
