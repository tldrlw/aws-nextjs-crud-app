import { getMessages } from "@/services/getMessages";

export async function ListMessages() {
  const { data: messages } = await getMessages();
  // ^ getMessages() returns the following, so destructuring out `data` and renaming the array to `messages`
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
    messages.length
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
          className="border-solid border-2 border-green-500 p-2 my-2 rounded-md"
        >
          <p className="font-bold">{message.Message.S}</p>
          <p>
            ID: <span className="italic">{message.PK.S}</span>
          </p>
          <p>{formatToHumanReadable(message.DateTime.S)}</p>
        </div>
      ))}
    </div>
  );
}
