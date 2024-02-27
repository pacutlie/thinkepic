export async function GET({ endpoint }) {
  try {
    const res = await fetch(process.env.BASE_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        // "API-Key": process.env.DATA_API_KEY,
      },
    });

    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function POST({ endpoint, body }) {
  try {
    const res = await fetch(process.env.BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "API-Key": process.env.DATA_API_KEY,
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function FILE({ endpoint, body }) {
  try {
    const res = await fetch(process.env.BASE_URL + endpoint, {
      method: "POST",
      headers: {
        // "API-Key": process.env.DATA_API_KEY,
      },
      body,
    });

    return await res.json();
  } catch (error) {
    return error;
  }
}
