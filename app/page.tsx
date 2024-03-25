import OpenAIAssistant from "@/app/ui/openai-assistant";


export default function Home() {
  return (
    <main>
      <div className="mx-auto mb-12 max-w-lg text-center">
        <div className="m-4">
          <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">OpenAI Assistant Starter Kit</h1>
          <div className="mb-6 text-normal font-normal text-gray-500">
            This Starter Kit illustrates how you can create an OpenAI Assistant with ReactJS + NextJS + TypeScript.
            You can <a href="https://github.com/Superexpert/openai-assistant-starter-kit" target="_new" className="underline text-blue-500">download the source code</a> for 
            this Starter Kit from GitHub. 
          </div>
        </div>
        <OpenAIAssistant 
          assistantId="asst_gx3Htc0gLVNlpBQKLoefkXZZ"
          greeting="I am a helpful chat assistant. How can I help you?"
          messageLimit={10}
        />
      </div>
    </main>
  );
}
