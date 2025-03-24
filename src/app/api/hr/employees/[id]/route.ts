import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { Employee } from '@/types/hr'

const hrService = new HRService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await hrService.getEmployee(params.id)
    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(employee)
  } catch (error) {
    console.error('Error fetching employee:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await request.json() as Partial<Employee>
    const updatedEmployee = await hrService.updateEmployee(params.id, employee)
    return NextResponse.json(updatedEmployee)
  } catch (error) {
    console.error('Error updating employee:', error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  }
} 