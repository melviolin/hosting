export async function onRequest(context) {
  return new Response('¡Hola desde Cloudflare Pages - MelViolin1!', {
    headers: { 'Content-Type': 'text/plain' },
  });
}

