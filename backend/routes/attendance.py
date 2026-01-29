from fastapi import APIRouter, HTTPException, Body
from typing import List
from models import AttendanceBase, AttendanceCreate
from database import db

router = APIRouter(
    prefix="/attendance",
    tags=["attendance"]
)

@router.post("/", response_description="Mark attendance", response_model=AttendanceBase)
async def mark_attendance(attendance: AttendanceCreate = Body(...)):
    attendance_dict = attendance.model_dump()
    
    # Check if employee exists
    employee = await db["employees"].find_one({"employee_id": attendance_dict["employee_id"]})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Check if attendance already marked for this date
    existing_attendance = await db["attendance"].find_one({
        "employee_id": attendance_dict["employee_id"],
        "date": attendance_dict["date"]
    })

    if existing_attendance:
        # Update existing record
        await db["attendance"].update_one(
            {"_id": existing_attendance["_id"]},
            {"$set": {"status": attendance_dict["status"]}}
        )
        updated_attendance = await db["attendance"].find_one({"_id": existing_attendance["_id"]})
        return updated_attendance

    new_attendance = await db["attendance"].insert_one(attendance_dict)
    created_attendance = await db["attendance"].find_one({"_id": new_attendance.inserted_id})
    return created_attendance

@router.get("/{employee_id}", response_description="View attendance records", response_model=List[AttendanceBase])
async def view_attendance(employee_id: str):
    # Verify employee exists (optional, but good practice)
    employee = await db["employees"].find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    attendance_records = await db["attendance"].find({"employee_id": employee_id}).to_list(1000)
    return attendance_records
