import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    if (!format || !['csv', 'excel'].includes(format)) {
      return new NextResponse('Invalid format specified', { status: 400 });
    }

    // Fetch all relevant data
    const [registrations, bookStands] = await Promise.all([
      prisma.registration.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
          organization: true,
          created_at: true,
          ticket_type: true,
        },
      }),
      prisma.bookStand.findMany({
        select: {
          id: true,
          reference_id: true,
          company_name: true,
          contact_name: true,
          email: true,
          phone: true,
          stand_type: true,
          status: true,
          created_at: true,
        },
      }),
    ]);

    if (format === 'csv') {
      // Create CSV for registrations
      const registrationFields = ['id', 'first_name', 'last_name', 'email', 'phone', 'organization', 'created_at', 'ticket_type'];
      const registrationParser = new Parser({ fields: registrationFields });
      const registrationCsv = registrationParser.parse(registrations);

      // Create CSV for book stands
      const standFields = ['id', 'reference_id', 'company_name', 'contact_name', 'email', 'phone', 'stand_type', 'status', 'created_at'];
      const standParser = new Parser({ fields: standFields });
      const standCsv = standParser.parse(bookStands);

      // Combine both CSVs with a separator
      const combinedCsv = `Registrations\n${registrationCsv}\n\nBook Stands\n${standCsv}`;

      return new NextResponse(combinedCsv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=export.csv',
        },
      });
    } else {
      // Create Excel workbook
      const workbook = new ExcelJS.Workbook();
      
      // Add Registrations sheet
      const registrationsSheet = workbook.addWorksheet('Registrations');
      registrationsSheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'First Name', key: 'first_name' },
        { header: 'Last Name', key: 'last_name' },
        { header: 'Email', key: 'email' },
        { header: 'Phone', key: 'phone' },
        { header: 'Organization', key: 'organization' },
        { header: 'Created At', key: 'created_at' },
        { header: 'Ticket Type', key: 'ticket_type' },
      ];
      registrationsSheet.addRows(registrations);

      // Add Book Stands sheet
      const standsSheet = workbook.addWorksheet('Book Stands');
      standsSheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'Reference ID', key: 'reference_id' },
        { header: 'Company Name', key: 'company_name' },
        { header: 'Contact Name', key: 'contact_name' },
        { header: 'Email', key: 'email' },
        { header: 'Phone', key: 'phone' },
        { header: 'Stand Type', key: 'stand_type' },
        { header: 'Status', key: 'status' },
        { header: 'Created At', key: 'created_at' },
      ];
      standsSheet.addRows(bookStands);

      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=export.xlsx',
        },
      });
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 