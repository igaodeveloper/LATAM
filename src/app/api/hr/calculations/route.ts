import { NextResponse } from 'next/server'
import { HRService } from '@/services/hrService'
import { CalculationParameters } from '@/types/hr'

const hrService = new HRService()

export async function POST(request: Request) {
  try {
    const params = await request.json() as CalculationParameters
    const amounts = hrService.calculateTerminationAmounts(params)
    return NextResponse.json(amounts)
  } catch (error) {
    console.error('Error calculating amounts:', error)
    return NextResponse.json(
      { error: 'Failed to calculate amounts' },
      { status: 500 }
    )
  }
} 