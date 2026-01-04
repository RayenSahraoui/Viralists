(async () => {
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || 'DUMMY';
  const host = 'https://victorious-compassion-98eeb7e727.strapiapp.com';

  try {
    const getRes = await fetch(`${host}/api/click`);
    console.log('GET status:', getRes.status);
    const data = await getRes.json();
    console.log('GET body:', JSON.stringify(data, null, 2));
    const id = data?.data?.id;
    const current = parseInt(data?.data?.Number ?? '0', 10);
    const newNumber = String(current + 1);

    console.log('Attempting authenticated update with token:', STRAPI_TOKEN);
    // Try PUT to /api/click/:id
    let updateRes = await fetch(`${host}/api/click/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { Number: newNumber } }),
    });

    console.log('PUT /api/click/:id status:', updateRes.status);
    console.log('PUT /api/click/:id body:', await updateRes.text());

    // Try PUT to /api/click (single-type update) with token
    updateRes = await fetch(`${host}/api/click`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { Number: newNumber } }),
    });

    console.log('PUT /api/click status:', updateRes.status);
    console.log('PUT /api/click body:', await updateRes.text());

    // Try PATCH to /api/click (single-type) with token
    updateRes = await fetch(`${host}/api/click`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { Number: newNumber } }),
    });

    console.log('PATCH /api/click status:', updateRes.status);
    console.log('PATCH /api/click body:', await updateRes.text());
  } catch (err) {
    console.error('Error:', err);
  }
})();
