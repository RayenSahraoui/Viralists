(async () => {
  const host = 'https://victorious-compassion-98eeb7e727.strapiapp.com';
  const testPaths = [
    '/api/click',
    '/api/clicks',
    '/api/click/1',
    '/api/clicks/1',
    '/api/click?filters[id][$eq]=1',
    '/api/clicks?filters[id][$eq]=1'
  ];

  for (const p of testPaths) {
    try {
      const url = host + p;
      console.log('\nGET', url);
      const res = await fetch(url);
      console.log('GET status:', res.status);
      let bodyText;
      try {
        const json = await res.json();
        bodyText = JSON.stringify(json, null, 2);
      } catch (e) {
        bodyText = await res.text();
      }
      console.log('GET body:', bodyText);

      // If resource found, try PATCH (Strapi prefers PATCH/PUT for single records depending on config)
      if (res.status === 200 || res.status === 201) {
        console.log('Attempting PATCH to', url);
        const newNumber = 9999; // test value
        const patchRes = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: { Number: String(newNumber) } }),
        });
        console.log('PATCH status:', patchRes.status);
        console.log('PATCH body:', await patchRes.text());
      }
    } catch (err) {
      console.error('Error for path', p, err.message || err);
    }
  }
})();
