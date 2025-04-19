import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Use the shared in-memory store from register-to-attend/route.ts
declare global {
  var registrations: Map<string, any>;
}

if (!global.registrations) {
  global.registrations = new Map();
}

// Function to generate a unique ID (same as in register-to-attend/route.ts)
function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `NIBF-${timestamp}-${randomStr}`.toUpperCase();
}

// Helper function to create a mock registration
function createMockRegistration(data: any) {
  return {
    id: Math.floor(Math.random() * 10000),
    registrationId: data.registrationId || generateUniqueId(),
    firstName: data.firstName,
    lastName: data.lastName,
    organization: data.organization || null,
    jobTitle: data.jobTitle || null,
    email: data.email,
    phone: data.phone || null,
    country: data.country || null,
    interests: data.interests || [],
    specialRequirements: data.specialRequirements || null,
    ticketType: data.ticketType,
    createdAt: new Date().toISOString(),
  };
}

// GET handler to fetch registration by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get('registrationId');

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Fetch from database
    const connection = await pool.getConnection();
    try {
      const [registrations]: any = await connection.execute(
        `SELECT * FROM Registration WHERE registration_id = ?`,
        [registrationId]
      );

      if (registrations.length === 0) {
        return NextResponse.json(
          { error: "No registration found with this ID" },
          { status: 404 }
        );
      }

      const registration = registrations[0];
      
      // Format the registration data
      const formattedRegistration = {
        id: registration.id,
        registrationId: registration.registration_id,
        firstName: registration.first_name,
        lastName: registration.last_name,
        organization: registration.organization,
        jobTitle: registration.job_title,
        email: registration.email,
        phone: registration.phone,
        country: registration.country,
        interests: registration.interests ? JSON.parse(registration.interests) : null,
        specialRequirements: registration.special_requirements,
        ticketType: registration.ticket_type,
        createdAt: registration.created_at,
        paymentStatus: registration.payment_status
      };
      
      return NextResponse.json({ registration: formattedRegistration });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching registration:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration" },
      { status: 500 }
    );
  }
}

// POST handler to create or update a registration
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Save to database
    const connection = await pool.getConnection();
    try {
      // Check if registration exists
      const [existing]: any = await connection.execute(
        `SELECT * FROM Registration WHERE registration_id = ?`,
        [data.registrationId]
      );

      if (existing.length > 0) {
        // Update existing registration
        await connection.execute(
          `UPDATE Registration 
          SET first_name = ?, last_name = ?, organization = ?, job_title = ?, 
              email = ?, phone = ?, country = ?, interests = ?, 
              special_requirements = ?, ticket_type = ?
          WHERE registration_id = ?`,
          [
            data.firstName,
            data.lastName,
            data.organization || null,
            data.jobTitle || null,
            data.email,
            data.phone || null,
            data.country || null,
            data.interests ? JSON.stringify(data.interests) : null,
            data.specialRequirements || null,
            data.ticketType,
            data.registrationId
          ]
        );
      } else {
        // Create new registration
        await connection.execute(
          `INSERT INTO Registration 
          (first_name, last_name, organization, job_title, email, phone, country, 
          interests, special_requirements, terms_accepted, newsletter_subscribed, ticket_type, registration_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            data.firstName,
            data.lastName,
            data.organization || null,
            data.jobTitle || null,
            data.email,
            data.phone || null,
            data.country || null,
            data.interests ? JSON.stringify(data.interests) : null,
            data.specialRequirements || null,
            data.termsAccepted || false,
            data.newsletterSubscribed || false,
            data.ticketType,
            data.registrationId
          ]
        );
      }

      // Fetch the updated/created registration
      const [registrations]: any = await connection.execute(
        `SELECT * FROM Registration WHERE registration_id = ?`,
        [data.registrationId]
      );

      const registration = registrations[0];
      
      // Format the registration data
      const formattedRegistration = {
        id: registration.id,
        registrationId: registration.registration_id,
        firstName: registration.first_name,
        lastName: registration.last_name,
        organization: registration.organization,
        jobTitle: registration.job_title,
        email: registration.email,
        phone: registration.phone,
        country: registration.country,
        interests: registration.interests ? JSON.parse(registration.interests) : null,
        specialRequirements: registration.special_requirements,
        ticketType: registration.ticket_type,
        createdAt: registration.created_at,
        paymentStatus: registration.payment_status
      };

      return NextResponse.json({ registration: formattedRegistration });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error creating/updating registration:", error);
    return NextResponse.json(
      { error: "Failed to create/update registration" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const registrationId = searchParams.get('registrationId');

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const data = await req.json();
    const {
      firstName,
      lastName,
      organization,
      jobTitle,
      email,
      phone,
      country,
      interests,
      specialRequirements,
      ticketType
    } = data;

    const connection = await pool.getConnection();
    try {
      // Update registration
      await connection.execute(
        `UPDATE Registration 
        SET first_name = ?, last_name = ?, organization = ?, job_title = ?, 
            email = ?, phone = ?, country = ?, interests = ?, 
            special_requirements = ?, ticket_type = ?
        WHERE registration_id = ?`,
        [
          firstName,
          lastName,
          organization || null,
          jobTitle || null,
          email,
          phone || null,
          country || null,
          interests ? JSON.stringify(interests) : null,
          specialRequirements || null,
          ticketType,
          registrationId
        ]
      );

      // Fetch updated registration
      const [registrations]: any = await connection.execute(
        `SELECT * FROM Registration WHERE registration_id = ?`,
        [registrationId]
      );

      if (!registrations.length) {
        return NextResponse.json(
          { error: "Registration not found" },
          { status: 404 }
        );
      }

      const registration = registrations[0];

      return NextResponse.json({
        message: "Registration updated successfully",
        registration: {
          id: registration.id,
          registrationId: registration.registration_id,
          firstName: registration.first_name,
          lastName: registration.last_name,
          organization: registration.organization,
          jobTitle: registration.job_title,
          email: registration.email,
          phone: registration.phone,
          country: registration.country,
          interests: registration.interests ? JSON.parse(registration.interests) : null,
          specialRequirements: registration.special_requirements,
          ticketType: registration.ticket_type,
          createdAt: registration.created_at,
          paymentStatus: registration.payment_status
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Error updating registration" },
      { status: 500 }
    );
  }
} 