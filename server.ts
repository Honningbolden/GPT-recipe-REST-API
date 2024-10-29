const port = 8000;
console.log(`Server running on http://localhost:${port}`);

Deno.serve(
  {
    onListen: ({ port }) => {
      console.log(`Deno server listening on ${port}`);
    },
  },
  (req: Request, conn: Deno.ServeHandlerInfo) => {
    // Get information about the incoming request
    const method = req.method;
    const ip = (conn.remoteAddr as Deno.NetAddr).hostname;
    console.log(`${ip} just made an HTTP ${method} request.`);

    // Return a web standard Response object
    return new Response('Hello world!');
  },
);
