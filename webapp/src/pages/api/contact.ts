import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  
  try {
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const message = data.get("message")?.toString();

    if (!name || !email || !message) {
      throw new Error("Faltan campos requeridos");
    }

    // Aquí iría la lógica para enviar el correo
    // Ejemplo con SendGrid o Nodemailer

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};