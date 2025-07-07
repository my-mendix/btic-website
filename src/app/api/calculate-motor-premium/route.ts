// app/api/calculate-motor-premium/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { marketValue } = body;

    // Basic validation
    if (!marketValue || isNaN(Number(marketValue))) {
      return NextResponse.json(
        { message: 'Invalid vehicle market value provided.' },
        { status: 400 }
      );
    }
    
    // --- Mock Calculation Logic ---
    // In a real backend, you'd have complex logic here.
    // We'll just take 2.9% of the market value.
    const calculatedPremium = Number(marketValue) * 0.029;

    // Simulate network delay of 1.5 seconds to see the loading state
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return the successful response
    return NextResponse.json({ premium: calculatedPremium });

  } catch {
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}