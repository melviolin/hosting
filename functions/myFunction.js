export async function onRequest(context) {
  return new Response('¡Hola desde Cloudflare Pages - MelViolin!', {
    headers: { 'Content-Type': 'text/plain' },
  });
}

