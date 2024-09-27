import { revalidateTag } from "next/cache";

export async function postMessage(formData) {
  "use server";

  console.log("front-end/src/services/postMessage.js - formData", formData);

  const payload = {
    message: formData.get("message"),
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const lambdaPostFunctionURL =
    "https://rxiuty62qde6dlua3jrcr2lfou0zhszp.lambda-url.us-east-1.on.aws/";

  let data;

  try {
    const response = await fetch(lambdaPostFunctionURL, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    console.log(
      "front-end/src/services/postMessage.js - API call successful",
      data
    );
    revalidateTag("messages");
    // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
  } catch (error) {
    console.error(
      "front-end/src/services/postMessage.js - API call failed",
      error
    );
  }

  return data;
}
