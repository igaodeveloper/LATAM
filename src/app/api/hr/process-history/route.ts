import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { ProcessHistory } from '@/types/hr'

const hrService = new HRService()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const processId = searchParams.get('processId')
    const processType = searchParams.get('processType') as ProcessHistory['process_type']

    if (!processId || !processType) {
      return NextResponse.json(
        { error: 'Process ID and type are required' },
        { status: 400 }
      )
    }

    const history = await hrService.getProcessHistory(processId, processType)
    return NextResponse.json(history)
  } catch (error) {
    console.error('Error fetching process history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch process history' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const history = await request.json() as Omit<ProcessHistory, 'id' | 'created_at'>
    const createdHistory = await hrService.createProcessHistory(history)
    return NextResponse.json(createdHistory)
  } catch (error) {
    console.error('Error creating process history:', error)
    return NextResponse.json(
      { error: 'Failed to create process history' },
      { status: 500 }
    )
  }
} 