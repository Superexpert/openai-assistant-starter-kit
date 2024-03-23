import OpenAIAssistant from "@/app/ui/openai-assistant";


export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-lg text-center">
        <div className="m-4">
          <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">OpenAI Assistant Starter Kit</h1>
          <div className="mb-6 text-lg font-normal text-gray-500">
            This Starter Kit illustrates how you can embed an OpenAI Assistant in 
            a NestJS web application. Feel free to download and modify this code.
          </div>
        </div>
        <OpenAIAssistant />
      </div>
    </main>
  );
}
