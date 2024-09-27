import { revalidateTag } from "next/cache";

export default async function putMessage(formData) {
  "use server";

  console.log("front-end/src/services/putMessage.js - formData", formData);

  const payload = {
    newMessage: formData.get("message"),
    messageId: formData.get("id"),
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const lambdaPutFunctionURL =
    "https://fm4cuk7nbag4qdvmuxkzdeytge0vvrte.lambda-url.us-east-1.on.aws/";

  let data;

  try {
    const response = await fetch(lambdaPutFunctionURL, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    console.log(
      "front-end/src/services/putMessage.js - API call successful",
      data,
    );
    revalidateTag("messages");
    // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
    // https://www.youtube.com/watch?v=VBlSe8tvg4U
    // ^ using tags to revalidate the cache (i.e., getting the ListMessages component to make a new API call to get messages) is explained around 11:00
  } catch (error) {
    console.error(
      "front-end/src/services/putMessage.js - API call failed",
      error,
    );
  }

  return data;
}
