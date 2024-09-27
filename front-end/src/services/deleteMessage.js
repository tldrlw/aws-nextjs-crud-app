import { revalidateTag } from "next/cache";

export default async function deleteMessage(formData) {
  "use server";

  console.log("front-end/src/services/deleteMessage.js - formData", formData);

  const payload = {
    messageId: formData.get("messageId"),
  };

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const lambdaDeleteFunctionURL =
    "https://b5yxhpejsv77jyymlpodmdouhi0ikayu.lambda-url.us-east-1.on.aws/";

  let data;

  try {
    const response = await fetch(lambdaDeleteFunctionURL, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    console.log(
      "front-end/src/services/deleteMessage.js - API call successful",
      data,
    );
    revalidateTag("messages");
    // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
    // https://www.youtube.com/watch?v=VBlSe8tvg4U
    // ^ using tags to revalidate the cache (i.e., getting the ListMessages component to make a new API call to get messages) is explained around 11:00
  } catch (error) {
    console.error(
      "front-end/src/services/deleteMessage.js - API call failed",
      error,
    );
  }

  return data;
}
