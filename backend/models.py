from pydantic import BaseModel, EmailStr, Field, BeforeValidator
from typing import Optional, List
from datetime import date
from typing_extensions import Annotated

# Helper to convert Mongo ObjectId to string
PyObjectId = Annotated[str, BeforeValidator(str)]

class EmployeeBase(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    employee_id: str = Field(..., min_length=1, description="Unique Employee ID assigned by Admin")
    full_name: str = Field(..., min_length=1)
    email: EmailStr
    department: str = Field(..., min_length=1)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_schema_extra = {
            "example": {
                "employee_id": "E001",
                "full_name": "John Doe",
                "email": "john@example.com",
                "department": "Engineering"
            }
        }

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None

class AttendanceBase(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    employee_id: str
    date: str # storing as YYYY-MM-DD string for simplicity in Mongo
    status: str = Field(..., pattern="^(Present|Absent)$")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_schema_extra = {
            "example": {
                "employee_id": "E001",
                "date": "2023-10-27",
                "status": "Present"
            }
        }

class AttendanceCreate(BaseModel):
    employee_id: str
    date: str
    status: str
