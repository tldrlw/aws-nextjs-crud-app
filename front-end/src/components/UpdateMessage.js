import putMessage from "@/services/putMessage";

export default function NewMessage() {
  return (
    <form
      action={putMessage}
      // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
      className="mx-auto mt-2 max-w-lg rounded-lg bg-green-100 p-4 shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="message" className="block font-bold text-gray-700">
          Update a message
        </label>
        <div className="mt-4">
          <input
            type="text"
            name="id"
            id="id"
            className="mb-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Type the existing message's id..."
          />
          <input
            type="text"
            name="message"
            id="message"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Type your updated message..."
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="my-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Update in AWS DynamoDB table
        </button>
      </div>
    </form>
  );
}
