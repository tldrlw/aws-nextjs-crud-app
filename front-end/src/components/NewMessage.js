import { postMessage } from "@/services/postMessage";

export function NewMessage() {
  return (
    <form
      action={postMessage}
      // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
      className="max-w-lg mx-auto p-4 bg-green-100 shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="message"
            id="message"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Type your message..."
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add to AWS DynamoDB table
        </button>
      </div>
    </form>
  );
}
