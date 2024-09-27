import { ListMessages } from "@/components/ListMessages";
import { NewMessage } from "@/components/NewMessage";
import { Suspense } from "react";

export default function App() {
  const buildTime =
    process.env.NEXT_PUBLIC_BUILD_TIME || "build time placeholder";
  const image =
    process.env.NEXT_PUBLIC_IMAGE || "image path and tag placeholder";

  return (
    <main>
      <p>
        Docker image build time: <span className="italic">{buildTime}</span>
      </p>
      <p>
        ECR image path: <span className="italic">{image}</span>
      </p>
      <div className="my-6 flex items-center justify-center">
        <div className="container mx-auto grid grid-cols-2 gap-8">
          <div className="bg-gray-200 p-6 text-center">
            <Suspense fallback={<p>Loading messages...</p>}>
              <ListMessages></ListMessages>
            </Suspense>
          </div>
          <div className="bg-gray-200 p-6 text-center">
            <NewMessage></NewMessage>
          </div>
        </div>
      </div>
    </main>
  );
}

// Suspense - https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense
// ^ works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.

// lambda_delete_function_url = "https://b5yxhpejsv77jyymlpodmdouhi0ikayu.lambda-url.us-east-1.on.aws/"
// lambda_get_function_url = "https://epixe36kvjo3pvtncrhafcak7y0tqsfx.lambda-url.us-east-1.on.aws/"
// lambda_put_function_url = "https://fm4cuk7nbag4qdvmuxkzdeytge0vvrte.lambda-url.us-east-1.on.aws/"
