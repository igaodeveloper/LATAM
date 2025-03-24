import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { Document } from '@/types/hr'

const hrService = new HRService()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const processId = searchParams.get('processId')
    const processType = searchParams.get('processType') as Document['process_type']

    if (!processId || !processType) {
      return NextResponse.json(
        { error: 'Process ID and type are required' },
        { status: 400 }
      )
    }

    const documents = await hrService.getProcessDocuments(processId, processType)
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const document = await request.json() as Omit<Document, 'id' | 'uploaded_at'>
    const createdDocument = await hrService.uploadDocument(document)
    return NextResponse.json(createdDocument)
  } catch (error) {
    console.error('Error uploading document:', error)
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    )
  }
} 