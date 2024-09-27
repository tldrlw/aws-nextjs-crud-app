import getMessages from "@/services/getMessages";
import deleteMessage from "@/services/deleteMessage";

export default async function ListMessages() {
  const { data: messages } = await getMessages();
  // ^ getMessages() returns the following, so destructuring out "data" and renaming the array to "messages"
  // {
  //   "message": "Scan successful",
  //   "data": [
  //     {
  //       "PK": {
  //         "S": "3nh4zv269p"
  //       },
  //       "Message": {
  //         "S": "Anjuna Seaglass"
  //       },
  //       "DateTime": {
  //         "S": "2024-09-26T22:36:06.154Z"
  //       }
  //     }
  //   ]
  // }

  console.log(
    "front-end/src/components/ListMessages.js - # of messages - ",
    messages.length,
  );

  // Sort by DateTime in descending order (most recent first)
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.DateTime.S);
    const dateB = new Date(b.DateTime.S);
    return dateB - dateA; // Sort in descending order
  });

  function formatToHumanReadable(isoString) {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long", // Full month name (e.g., September)
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short", // Includes time zone (e.g., GMT)
    };
    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div>
      {sortedMessages.map((message, index) => (
        <div
          key={index}
          className="my-2 flex flex-row rounded-md border-2 border-solid border-green-500 p-2"
        >
          <div className="basis-5/6">
            <p className="font-bold">{message.Message.S}</p>
            <p>
              ID: <span className="italic">{message.PK.S}</span>
            </p>
            <p>{formatToHumanReadable(message.DateTime.S)}</p>
          </div>
          <div className="flex basis-1/6 justify-end pr-2">
            <form
              action={deleteMessage}
              // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
            >
              <input type="hidden" name="messageId" value={message.PK.S} />
              {/* To pass the messageId to your server action (deleteMessage) using a form, you can add a hidden input field inside the form.
              This hidden input will store the messageId value, which can then be accessed via formData.get('messageId') on the server side when the form is submitted. */}
              <button
                type="submit"
                className="my-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
