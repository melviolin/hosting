export async function onRequest(context) {
  return new Response('¡Hola desde Cloudflare Pages!', {
    headers: { 'Content-Type': 'text/plain' },
  });
}

