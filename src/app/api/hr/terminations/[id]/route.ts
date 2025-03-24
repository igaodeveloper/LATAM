import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { Termination } from '@/types/hr'

const hrService = new HRService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const termination = await hrService.getTermination(params.id)
    if (!termination) {
      return NextResponse.json(
        { error: 'Termination not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(termination)
  } catch (error) {
    console.error('Error fetching termination:', error)
    return NextResponse.json(
      { error: 'Failed to fetch termination' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json() as { status: Termination['status'] }
    const updatedTermination = await hrService.updateTerminationStatus(params.id, status)
    return NextResponse.json(updatedTermination)
  } catch (error) {
    console.error('Error updating termination status:', error)
    return NextResponse.json(
      { error: 'Failed to update termination status' },
      { status: 500 }
    )
  }
} 