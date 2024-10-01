export default async function getMessages() {
  "use server";

  console.log("front-end/src/services/getMessages.js");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const lambdaGetFunctionURL =
    "https://epixe36kvjo3pvtncrhafcak7y0tqsfx.lambda-url.us-east-1.on.aws/";

  let data;

  try {
    const response = await fetch(
      lambdaGetFunctionURL,
      { next: { tags: ["messages"] } },
      // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
      // { tags: ["messages"] },
      // ^ also works, but not in docs above
      { cache: "no-store" },
      // ^ for NO caching
      // https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
      // you can see differences between cached and non-cached API calls by configuring special logging in `next.config.mjs`, comment out ^ and it'll log 'cache-hit'
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    // console.log(
    //   "front-end/src/services/getMessage.js - API call successful",
    //   JSON.stringify(data, null, 2),
    // );
  } catch (error) {
    console.error(
      "front-end/src/services/getMessage.js - API call failed",
      error,
    );
  }

  return data;
}
