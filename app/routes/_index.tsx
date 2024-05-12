
export async function loader({ request, response }) {
  response.status = 302;
  response.headers.set("Location", "/search");
  throw response;
}

export default function Index() {}


