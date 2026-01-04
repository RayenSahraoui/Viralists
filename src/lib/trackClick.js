// Client-side tracker that POSTs to an internal API route which performs the authenticated update server-side.
// This avoids CORS and authentication issues when updating Strapi.

export async function trackOrderClick(e, redirectUrl = 'https://management-datascience.org/order-books/') {
  // Prevent default navigation
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const url = '/api/track-click';

  // eslint-disable-next-line no-console
  console.log('🔵 [CLIENT] trackOrderClick called at:', new Date().toISOString());
  // eslint-disable-next-line no-console
  console.log('🔵 [CLIENT] Event target:', e?.target);

  // Use fetch with keepalive to ensure it completes even if page navigates
  try {
    const startTime = Date.now();
    const response = await fetch(url, { 
      method: 'PUT', 
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    
    const duration = Date.now() - startTime;
    // eslint-disable-next-line no-console
    console.log(`🔵 [CLIENT] Response received in ${duration}ms, status:`, response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { raw: errorText };
      }
      // eslint-disable-next-line no-console
      console.error('❌ [CLIENT] trackOrderClick failed:', response.status);
      // eslint-disable-next-line no-console
      console.error('❌ [CLIENT] Error details:', errorData);
      // eslint-disable-next-line no-console
      console.error('❌ [CLIENT] Full error response:', errorText);
      // Show alert to user for debugging
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.error('❌ [CLIENT] Full error object:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          errorText
        });
      }
    } else {
      const result = await response.json();
      // eslint-disable-next-line no-console
      console.log('✅ [CLIENT] trackOrderClick success:', result);
      // eslint-disable-next-line no-console
      console.log('✅ [CLIENT] Previous value:', result.previousValue, '→ New value:', result.newValue);
      
      // If verification failed, show warning
      if (result.error || (result.verified === false)) {
        // eslint-disable-next-line no-console
        console.warn('⚠️ [CLIENT] Update may have failed verification:', result);
      }
    }

    // Redirect after successful API call (or even if it failed, still redirect)
    // Use a small delay to ensure the request is fully processed
    setTimeout(() => {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }, 100);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('❌ [CLIENT] trackOrderClick error:', err);
    
    // Fallback: try sendBeacon
    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const formData = new FormData();
        formData.append('data', JSON.stringify({}));
        const sent = navigator.sendBeacon(url, formData);
        if (sent) {
          // eslint-disable-next-line no-console
          console.log('📡 [CLIENT] trackOrderClick sent via sendBeacon fallback');
        }
      }
    } catch (beaconErr) {
      // eslint-disable-next-line no-console
      console.error('❌ [CLIENT] trackOrderClick failed completely', err, beaconErr);
    }

    // Still redirect even if tracking failed
    setTimeout(() => {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }, 100);
  }
}
