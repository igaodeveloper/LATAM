import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'

const hrService = new HRService()

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedNotification = await hrService.markNotificationAsRead(params.id)
    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark notification as read' },
      { status: 500 }
    )
  }
} 