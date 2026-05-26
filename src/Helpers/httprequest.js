import axiosInstance from './axiosInstance';

const baseUrl = import.meta.env.VITE_APP_BASE_URL

async function httpRequest(
  method,
  url,
  data,
  headers,
  params
) {
  try {
    const config = {
      method,
      url: `${baseUrl}${url}`,
      data,
      headers: {
        ...headers,
      },
      params,
    };
// debugger;
    const response = await axiosInstance.request(config);
    return response.data;
    console.log(response.data)
  } catch (error) {
    throw new Error(`HTTP request failed: ${error.message}`);
  }
}
export default httpRequest;