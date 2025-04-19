import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { sendRegistrationConfirmationEmail } from "@/lib/email";
import { sendForeignTradeRegistrationConfirmationEmail } from "@/lib/foreignConfirmationEmail";

// Ensure consistent case handling for registration IDs
const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `NIBF-${timestamp}${randomStr}`.toUpperCase();
};

export async function POST(request: NextRequest) {
  try {
    console.log('Starting registration process...');
    const session = await getServerSession(authOptions);
    const data = await request.json();
    console.log('Received registration data:', data); 

    // Check if registrationId exists in the request
    if (data.registrationId) {
      console.log('Checking for existing registration:', data.registrationId);
      const existingRegistration = await prisma.registration.findUnique({
        where: { registration_id: data.registrationId }
      });

      if (existingRegistration) {
        console.log('Found existing registration:', existingRegistration);
        return NextResponse.json({ 
          success: true, 
          registrationId: existingRegistration.registration_id,
          registration: existingRegistration
        });
      }
    }

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "ticketType"];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate a unique registration ID
    const registrationId = generateUniqueId();
    console.log('Generated registration ID:', registrationId);

    // Create registration in database
    console.log('Creating registration in database...');
    const registration = await prisma.registration.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        job_title: data.jobTitle,
        country: data.country,
        interests: data.interests ? JSON.stringify(data.interests) : null,
        special_requirements: data.specialRequirements,
        terms_accepted: data.termsAccepted,
        newsletter_subscribed: data.newsletterSubscribed,
        ticket_type: data.ticketType,
        registration_id: registrationId,
        payment_status: data.paymentStatus || 'pending',
        user_id: session?.user?.id
      }
    });
    console.log('Registration created successfully:', registration);

    // Send confirmation email
    if (data.ticketType === 'foreign_trade') {
      try {
        console.log('Sending foreign trade confirmation email...');
        await sendForeignTradeRegistrationConfirmationEmail({
          registrationId,
          firstName: data.firstName, 
          lastName: data.lastName,
          email: data.email,
          ticketType: data.ticketType,
        });
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue with registration even if email fails
      }
    }else{
  
    try {
      console.log('Sending confirmation email...');
      await sendRegistrationConfirmationEmail({
        registrationId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        ticketType: data.ticketType,
      });
      console.log('Confirmation email sent successfully');

    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue with registration even if email fails
    }

  }
  
    return NextResponse.json({ 
      success: true, 
      registrationId: registration.registration_id,

    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get('registrationId');

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { registration_id: registrationId },
      include: {
        paymentReferences: true
      }
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registration' },
      { status: 500 }
    );
  }
} 