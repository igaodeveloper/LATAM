import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { Leave } from '@/types/hr'

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

    const leaves = await hrService.getEmployeeLeaves(employeeId)
    return NextResponse.json(leaves)
  } catch (error) {
    console.error('Error fetching leaves:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaves' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const leave = await request.json() as Omit<Leave, 'id' | 'created_at' | 'updated_at'>
    const createdLeave = await hrService.createLeave(leave)
    return NextResponse.json(createdLeave)
  } catch (error) {
    console.error('Error creating leave:', error)
    return NextResponse.json(
      { error: 'Failed to create leave' },
      { status: 500 }
    )
  }
} 