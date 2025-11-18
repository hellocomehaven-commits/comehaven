// src/app/api/csp-report/route.ts

import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Laporan CSP dikirim dalam body JSON
    const report = await request.json();

    console.warn("\n--- CSP Violation Detected ---");
    
    // Ambil data kunci dari laporan untuk logging
    const cspReport = report['csp-report'];
    const violatedDirective = cspReport['violated-directive'];
    const blockedUri = cspReport['blocked-uri'];
    const documentUri = cspReport['document-uri'];
    
    console.warn(`[CSP] Policy Violated: ${violatedDirective}`);
    console.warn(`[CSP] Blocked URI: ${blockedUri}`);
    console.warn(`[CSP] Page URI: ${documentUri}`);
    
    console.warn("--- End of Report ---\n");

    // Di Production, Anda akan mengirim ini ke Sentry, database, atau layanan logging.
    
    // Mengembalikan status 204 (No Content) karena browser tidak memerlukan balasan.
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error("Error processing CSP report (Body may not be standard JSON):", error);
    return new NextResponse('Error processing report', { status: 400 });
  }
}

// Blok metode HTTP lainnya
export function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}