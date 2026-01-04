export async function POST(req) {
  try {
    console.log('=== submit-client API called ===');

    const body = await req.json();

    // Basic validation
    const { firstName, lastName, email, phone, profession, organisation, location, source, motivation } = body;

    if (!firstName || !lastName || !email) {
      return Response.json({ error: 'Missing required fields: firstName, lastName, email' }, { status: 400 });
    }

    const host = 'https://victorious-compassion-98eeb7e727.strapiapp.com';
    const token = process.env.STRAPI_API_TOKEN;

    // Build payload only with fields that exist in your Strapi `clients` content type
    // (Location caused `ValidationError: Invalid key Location` so we omit it)
    const payloadData = {};
    if (lastName) payloadData.Nom = lastName;
    if (firstName) payloadData.Prenom = firstName;
    if (email) payloadData.mail = email;
    if (phone) payloadData.Phone = phone ?? null;
    if (profession) payloadData.Profession = profession ?? null;
    if (organisation) payloadData.Organization = organisation ?? null;
    // Map the "heard about us" SELECT to Strapi's Comment enum field and
    // free-text motivation to More
    if (source) payloadData.Comment = source ?? null;
    if (motivation) payloadData.More = motivation ?? null;

    const payload = { data: payloadData };

    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    console.log('[SUBMIT] Forwarding POST to Strapi /api/clients with sanitized payload:', JSON.stringify(payload));

    const res = await fetch(`${host}/api/clients`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let strapiBody = null;
    try { strapiBody = JSON.parse(text); } catch (e) { strapiBody = text; }

    if (!res.ok) {
      console.error('[SUBMIT] Strapi returned an error:', res.status, strapiBody);

      // Helpful guidance for auth/permissions issues
      if ((res.status === 401 || res.status === 403) && !token) {
        return Response.json({
          error: 'Strapi returned unauthorized/forbidden and no STRAPI_API_TOKEN is configured on the server.',
          status: res.status,
          body: strapiBody,
          guidance: 'Set STRAPI_API_TOKEN in your environment or allow public creation for the `clients` content type in Strapi.'
        }, { status: 502 });
      }

      return Response.json({ error: 'Failed to create client in Strapi', status: res.status, body: strapiBody }, { status: 502 });
    }

    console.log('[SUBMIT] Client created successfully:', strapiBody);
    return Response.json({ success: true, created: strapiBody }, { status: 201 });
  } catch (err) {
    console.error('=== ERROR in submit-client handler ===', err);
    return Response.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}