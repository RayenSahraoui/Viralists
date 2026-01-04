const rateLimits = new Map(); // simple in-memory rate limiter: IP -> array of timestamps

// Internal in-memory counter, starting from 0 as requested
let internalCounter = 0;
function getNextInternalCount() {
  internalCounter += 1;
  console.log('[COUNTER] next internalCounter =>', internalCounter);
  return internalCounter;
}

export async function PUT(req) {
  try {
    console.log('=== track-click API called (internal-counter flow) ===');

    // Get client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequestsPerWindow = 20;
    const timestamps = rateLimits.get(ip) || [];
    const recent = timestamps.filter((t) => t > now - windowMs);
    recent.push(now);
    rateLimits.set(ip, recent);
    if (recent.length > maxRequestsPerWindow) {
      console.warn(`Rate limit exceeded for ${ip}`);
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    const host = 'https://victorious-compassion-98eeb7e727.strapiapp.com';
    const token = process.env.STRAPI_API_TOKEN;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Use the internal counter to determine the new value (start at 0 and increment on each call)
    const nextValue = getNextInternalCount();
    const payload = { data: { Number: String(nextValue) } };

    console.log('[INTERNAL PUT] Sending PUT to', `${host}/api/click`, 'payload:', JSON.stringify(payload));

    try {
      const putRes = await fetch(`${host}/api/click`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });

      const txt = await putRes.text();
      if (!putRes.ok) {
        // Roll back the internal counter so the internal state remains consistent
        internalCounter -= 1;
        console.error('[INTERNAL PUT] Failed to update Strapi:', putRes.status, txt);
        return Response.json({ error: 'Failed to update Strapi', status: putRes.status, body: txt }, { status: 502 });
      }

      let updated;
      try { updated = JSON.parse(txt); } catch (e) { updated = txt; }

      console.log('[INTERNAL PUT] Success, internal counter is', internalCounter);
      return Response.json({ success: true, internalValue: internalCounter, updated }, { status: 200 });
    } catch (err) {
      // Roll back on transport error
      internalCounter -= 1;
      console.error('=== ERROR while PUTting to Strapi ===', err);
      return Response.json({ error: 'Server error while updating Strapi', message: err.message }, { status: 500 });
    }
  } catch (err) {
    console.error('=== ERROR in track-click handler ===', err);
    return Response.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}
