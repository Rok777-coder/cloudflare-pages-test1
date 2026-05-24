export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/") {
      return new Response(
        `
        <h1>Cloudflare Worker API</h1>
        <p>Uporabi naslednje poti:</p>
        <ul>
          <li><a href="/api/time">/api/time</a> - Trenutni čas</li>
          <li><a href="/api/hello?name=Rok">/api/hello?name=Ana</a> - Pozdrav z imenom</li>
          <li><a href="/api/student">/api/student</a> - Podatki o študentu</li>
          <li><a href="/api/quote">/api/quote</a> - Naključni citat</li>
        </ul>
        `,
        { headers: { "content-type": "text/html; charset=utf-8" } }
      )
    }

    if (url.pathname === "/api/time") {
      return Response.json({
        time: new Date().toISOString()
      })
    }

    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name") || "guest"
      return Response.json({
        message: `Hello ${name}`
      })
    }

    if (url.pathname === "/api/student") {
      return Response.json({
        ime: "Rok",
        priimek: "Marinšek",
        status: "uspešno opravljena dodatna naloga"
      })
    }

    if (url.pathname === "/api/quote") {
      return Response.json({
        quote: "Kdor išče cilj, bo ostal prazen, ko ga bo dosegel, kdor pa najde pot, bo cilj vedno nosil v sebi.",
        author: "Tone Pavček"
      })
    }

    return new Response("Pot ne obstaja (404)", { status: 404 })
  }
}
