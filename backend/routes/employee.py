from fastapi import APIRouter, HTTPException, Body, status
from fastapi.responses import JSONResponse
from typing import List
from models import EmployeeBase, EmployeeCreate, EmployeeUpdate
from database import db

router = APIRouter(
    prefix="/employees",
    tags=["employees"]
)

@router.post("/", response_description="Add new employee", response_model=EmployeeBase)
async def create_employee(employee: EmployeeCreate = Body(...)):
    employee_dict = employee.model_dump()
    
    # Check for duplicate employee_id or email
    existing_employee = await db["employees"].find_one({
        "$or": [
            {"employee_id": employee_dict["employee_id"]},
            {"email": employee_dict["email"]}
        ]
    })
    
    if existing_employee:
        raise HTTPException(
            status_code=400, 
            detail="Employee with this ID or Email already exists"
        )

    new_employee = await db["employees"].insert_one(employee_dict)
    created_employee = await db["employees"].find_one({"_id": new_employee.inserted_id})
    return created_employee

@router.get("/", response_description="List all employees", response_model=List[EmployeeBase])
async def list_employees():
    employees = await db["employees"].find().to_list(1000)
    return employees

@router.delete("/{id}", response_description="Delete an employee")
async def delete_employee(id: str):
    print(f"Attempting to delete employee with ID: {id}")
    delete_result = await db["employees"].delete_one({"employee_id": id})
    print(f"Delete result: {delete_result.deleted_count} documents deleted")

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content=None)

    raise HTTPException(status_code=404, detail=f"Employee {id} not found")
