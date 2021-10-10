const API_URL = process.env.REACT_APP_HIVE_API_URL;

class HTTP {
  async post(method, params) {
    const resp = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        params,
        method,
      }),
    });

    if (!resp.ok) throw new Error(`Post request failed: ${resp.statusText}`);

    const data = await resp.json();

    if (data.error) throw new Error(data.error.message);

    return data.result;
  }
}

export default new HTTP();
