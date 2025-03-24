import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { Termination } from '@/types/hr'

const hrService = new HRService()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')

    if (!employeeId) {
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      )
    }

    const terminations = await hrService.getEmployeeTerminations(employeeId)
    return NextResponse.json(terminations)
  } catch (error) {
    console.error('Error fetching terminations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch terminations' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const termination = await request.json() as Omit<Termination, 'id' | 'created_at' | 'updated_at'>
    const createdTermination = await hrService.createTermination(termination)
    return NextResponse.json(createdTermination)
  } catch (error) {
    console.error('Error creating termination:', error)
    return NextResponse.json(
      { error: 'Failed to create termination' },
      { status: 500 }
    )
  }
} 