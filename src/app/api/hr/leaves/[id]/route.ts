import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { Leave } from '@/types/hr'

const hrService = new HRService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const leave = await hrService.getLeave(params.id)
    if (!leave) {
      return NextResponse.json(
        { error: 'Leave not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(leave)
  } catch (error) {
    console.error('Error fetching leave:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leave' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json() as { status: Leave['status'] }
    const updatedLeave = await hrService.updateLeaveStatus(params.id, status)
    return NextResponse.json(updatedLeave)
  } catch (error) {
    console.error('Error updating leave status:', error)
    return NextResponse.json(
      { error: 'Failed to update leave status' },
      { status: 500 }
    )
  }
} 